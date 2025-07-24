import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  AlertTriangle,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { Job, User as UserType } from "@shared/types";
import { useAuth } from "@/contexts/AuthContext";

interface UserManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType | null;
  jobs: Job[];
  onUserUpdated: () => void;
}

export function UserManagementModal({
  open,
  onOpenChange,
  user: selectedUser,
  jobs,
  onUserUpdated,
}: UserManagementModalProps) {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("view");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
  });
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  
  const isAdmin = currentUser?.role === "admin";
  const userJobs = jobs.filter((j) => j.assignedTo === selectedUser?.id);
  const completedJobs = userJobs.filter((j) => j.status === "completed");
  const pendingJobs = userJobs.filter((j) => j.status === "pending");
  const inProgressJobs = userJobs.filter((j) => j.status === "in_progress");

  useEffect(() => {
    if (selectedUser) {
      setEditForm({
        name: selectedUser.name,
        email: selectedUser.email,
        username: selectedUser.username,
        role: selectedUser.role,
      });
    }
    setError(null);
    setSuccess(null);
    setActiveTab("view");
    setShowDeleteConfirm(false);
    setDeleteConfirmText("");
  }, [selectedUser, open]);

  const handleUpdateUser = async () => {
    if (!selectedUser || !isAdmin) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/auth/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      setSuccess("User updated successfully!");
      setActiveTab("view");
      onUserUpdated();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser || !isAdmin || deleteConfirmText !== selectedUser.username) return;
    
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`/api/auth/users/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Manage User: {selectedUser.name}</span>
            {isAdmin && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Shield className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {isAdmin 
              ? "View, edit, and manage user account details and permissions."
              : "View user details and activity."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="view" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View</span>
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="edit" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </TabsTrigger>
            )}
            {isAdmin && (
              <TabsTrigger value="delete" className="flex items-center space-x-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* View Tab */}
          <TabsContent value="view" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>User Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Name</Label>
                    <p className="text-lg font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="text-sm">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Username</Label>
                    <p className="text-sm">@{selectedUser.username}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Role</Label>
                    <Badge variant={selectedUser.role === "admin" ? "default" : "secondary"}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Created</Label>
                    <p className="text-sm">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Job Statistics Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Job Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{userJobs.length}</p>
                      <p className="text-sm text-blue-800">Total Jobs</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{completedJobs.length}</p>
                      <p className="text-sm text-green-800">Completed</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{pendingJobs.length}</p>
                      <p className="text-sm text-yellow-800">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{inProgressJobs.length}</p>
                      <p className="text-sm text-purple-800">In Progress</p>
                    </div>
                  </div>
                  {userJobs.length > 0 && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-600">Completion Rate</Label>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${(completedJobs.length / userJobs.length) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round((completedJobs.length / userJobs.length) * 100)}% completion rate
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Location Info */}
            {selectedUser.location && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Location Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">City</Label>
                      <p className="text-sm">{selectedUser.location.city}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Address</Label>
                      <p className="text-sm">{selectedUser.location.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Jobs */}
            {userJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userJobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={job.status === "completed" ? "default" : "secondary"}>
                          {job.status.replace("_", " ")}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Edit Tab */}
          {isAdmin && (
            <TabsContent value="edit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Edit User Details</CardTitle>
                  <CardDescription>
                    Update user information. Changes will be applied immediately.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-name">Name</Label>
                      <Input
                        id="edit-name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-username">Username</Label>
                      <Input
                        id="edit-username"
                        value={editForm.username}
                        onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Enter username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-role">Role</Label>
                      <Select value={editForm.role} onValueChange={(value) => setEditForm(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger id="edit-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="apollo">Apollo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button
                      onClick={handleUpdateUser}
                      disabled={loading}
                      className="flex items-center space-x-2"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      <span>{loading ? "Saving..." : "Save Changes"}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditForm({
                          name: selectedUser.name,
                          email: selectedUser.email,
                          username: selectedUser.username,
                          role: selectedUser.role,
                        });
                        setError(null);
                        setSuccess(null);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Delete Tab */}
          {isAdmin && (
            <TabsContent value="delete" className="space-y-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Delete User Account</span>
                  </CardTitle>
                  <CardDescription>
                    Permanently delete this user account. This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Warning:</strong> Deleting this user will:
                      <ul className="list-disc ml-6 mt-2">
                        <li>Permanently remove their account</li>
                        <li>Unassign them from all jobs</li>
                        <li>Remove their access to the system</li>
                        <li>This action cannot be undone</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  {userJobs.length > 0 && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        This user has {userJobs.length} active job(s). Deleting them will unassign these jobs.
                      </AlertDescription>
                    </Alert>
                  )}

                  {!showDeleteConfirm ? (
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Initiate Delete Process
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="delete-confirm">
                          Type the username "{selectedUser.username}" to confirm deletion:
                        </Label>
                        <Input
                          id="delete-confirm"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder={`Type "${selectedUser.username}" to confirm`}
                          className="border-red-300 focus:border-red-500"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="destructive"
                          onClick={handleDeleteUser}
                          disabled={loading || deleteConfirmText !== selectedUser.username}
                          className="flex-1"
                        >
                          {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                          )}
                          {loading ? "Deleting..." : "Permanently Delete User"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteConfirmText("");
                          }}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
