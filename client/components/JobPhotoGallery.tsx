import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Camera,
  Upload,
  X,
  Edit,
  Save,
  Loader2,
  Eye,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { Job } from "@shared/types";
import { useAuth } from "@/contexts/AuthContext";

interface JobPhoto {
  id: string;
  jobId: string;
  url: string;
  publicId: string;
  label: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
}

interface JobPhotoGalleryProps {
  job: Job;
  onPhotoUploaded?: () => void;
}

export function JobPhotoGallery({ job, onPhotoUploaded }: JobPhotoGalleryProps) {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<JobPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photoLabel, setPhotoLabel] = useState("");
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [viewingPhoto, setViewingPhoto] = useState<JobPhoto | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, [job.id]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/jobs/${job.id}/photos`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos || []);
      } else {
        setError("Failed to fetch photos");
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setError("Error fetching photos");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("File size must be less than 10MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError("Only image files are allowed");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    if (photos.length >= 13) {
      setError("Maximum of 13 photos allowed per job");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('label', photoLabel || `Photo ${photos.length + 1}`);
      formData.append('uploadedBy', user.id);
      formData.append('uploadedByName', user.name);

      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/jobs/${job.id}/photos`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPhotos(prev => [...prev, data.photo]);
        setSelectedFile(null);
        setPhotoLabel("");
        setShowUploadDialog(false);
        onPhotoUploaded?.();
        
        // Clear file input
        const fileInput = document.getElementById('photo-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to upload photo");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError("Error uploading photo");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
      } else {
        setError("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      setError("Error deleting photo");
    }
  };

  const handleUpdateLabel = async (photoId: string, label: string) => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/photos/${photoId}/label`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ label }),
      });

      if (response.ok) {
        setPhotos(prev => prev.map(photo => 
          photo.id === photoId ? { ...photo, label } : photo
        ));
        setEditingLabel(null);
        setNewLabel("");
      } else {
        setError("Failed to update photo label");
      }
    } catch (error) {
      console.error("Error updating photo label:", error);
      setError("Error updating photo label");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Job Photos</h3>
          <Badge variant="outline">
            {photos.length}/13
          </Badge>
        </div>
        
        {photos.length < 13 && (
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Add Photo</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Job Photo</DialogTitle>
                <DialogDescription>
                  Add a photo for this job. Maximum 13 photos allowed.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo-file-input">Select Photo</Label>
                  <Input
                    id="photo-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="photo-label">Photo Label</Label>
                  <Input
                    id="photo-label"
                    value={photoLabel}
                    onChange={(e) => setPhotoLabel(e.target.value)}
                    placeholder={`Photo ${photos.length + 1}`}
                    className="mt-1"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    className="flex-1"
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {uploading ? "Uploading..." : "Upload Photo"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUploadDialog(false);
                      setSelectedFile(null);
                      setPhotoLabel("");
                      setError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading photos...</span>
        </div>
      )}

      {!loading && photos.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Photos Yet</h3>
            <p className="text-gray-600 text-center">
              Upload photos to document the work progress and completion.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setViewingPhoto(photo)}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setViewingPhoto(photo)}
                    className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="h-8 w-8 p-0 bg-black/50 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {editingLabel === photo.id ? (
                    <div className="flex space-x-1">
                      <Input
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateLabel(photo.id, newLabel);
                          }
                        }}
                        className="text-sm"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleUpdateLabel(photo.id, newLabel)}
                        className="px-2"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingLabel(null);
                          setNewLabel("");
                        }}
                        className="px-2"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{photo.label}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingLabel(photo.id);
                          setNewLabel(photo.label);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    <p>By: {photo.uploadedByName}</p>
                    <p>{new Date(photo.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Photo Viewer Dialog */}
      {viewingPhoto && (
        <Dialog open={!!viewingPhoto} onOpenChange={() => setViewingPhoto(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{viewingPhoto.label}</DialogTitle>
              <DialogDescription>
                Uploaded by {viewingPhoto.uploadedByName} on{" "}
                {new Date(viewingPhoto.uploadedAt).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-auto">
              <img
                src={viewingPhoto.url}
                alt={viewingPhoto.label}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
