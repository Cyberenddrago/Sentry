import { RequestHandler } from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dkw9qeb5y",
  api_key: "979278621338858",
  api_secret: "HXRGD7H24fxLiuaFuP4vNtXt_2g",
});

// In-memory storage for job photos (in production, use proper database)
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

let jobPhotos: JobPhoto[] = [];

// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export const handleUploadJobPhoto: RequestHandler = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { label, uploadedBy, uploadedByName } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!jobId || !uploadedBy || !uploadedByName) {
      return res.status(400).json({ 
        error: "Missing required fields: jobId, uploadedBy, uploadedByName" 
      });
    }

    // Check if job already has 13 photos
    const existingPhotos = jobPhotos.filter(photo => photo.jobId === jobId);
    if (existingPhotos.length >= 13) {
      return res.status(400).json({ 
        error: "Maximum of 13 photos allowed per job" 
      });
    }

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `bbp-jobs/${jobId}`,
          resource_type: "image",
          transformation: [
            { width: 1200, height: 1200, crop: "limit" },
            { quality: "auto:good" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file!.buffer);
    });

    // Create photo record
    const photo: JobPhoto = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      jobId,
      url: result.secure_url,
      publicId: result.public_id,
      label: label || `Photo ${existingPhotos.length + 1}`,
      uploadedBy,
      uploadedByName,
      uploadedAt: new Date().toISOString(),
    };

    jobPhotos.push(photo);

    // Notify through socket.io about image upload
    const io = (req as any).app.get('io');
    if (io) {
      io.emit('image_uploaded', {
        jobId,
        jobTitle: `Job ${jobId}`, // You might want to pass actual job title
        uploaderName: uploadedByName,
        uploaderRole: req.body.uploaderRole || 'staff',
        photoCount: jobPhotos.filter(p => p.jobId === jobId).length
      });
    }

    console.log(`Photo uploaded for job ${jobId} by ${uploadedByName}`);
    res.json({
      success: true,
      photo,
      message: "Photo uploaded successfully"
    });

  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ 
      error: "Failed to upload photo",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const handleGetJobPhotos: RequestHandler = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const photos = jobPhotos.filter(photo => photo.jobId === jobId);
    
    res.json({ 
      success: true, 
      photos: photos.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
    });

  } catch (error) {
    console.error("Error fetching job photos:", error);
    res.status(500).json({ 
      error: "Failed to fetch photos",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const handleDeleteJobPhoto: RequestHandler = async (req, res) => {
  try {
    const { photoId } = req.params;
    
    if (!photoId) {
      return res.status(400).json({ error: "Photo ID is required" });
    }

    const photoIndex = jobPhotos.findIndex(photo => photo.id === photoId);
    
    if (photoIndex === -1) {
      return res.status(404).json({ error: "Photo not found" });
    }

    const photo = jobPhotos[photoIndex];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(photo.publicId);

    // Remove from our storage
    jobPhotos.splice(photoIndex, 1);

    console.log(`Photo ${photoId} deleted from job ${photo.jobId}`);
    res.json({ 
      success: true, 
      message: "Photo deleted successfully" 
    });

  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ 
      error: "Failed to delete photo",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const handleUpdatePhotoLabel: RequestHandler = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { label } = req.body;
    
    if (!photoId || !label) {
      return res.status(400).json({ error: "Photo ID and label are required" });
    }

    const photo = jobPhotos.find(photo => photo.id === photoId);
    
    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    photo.label = label;

    res.json({ 
      success: true, 
      photo,
      message: "Photo label updated successfully" 
    });

  } catch (error) {
    console.error("Error updating photo label:", error);
    res.status(500).json({ 
      error: "Failed to update photo label",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Export multer middleware
export const photoUploadMiddleware = upload.single('photo');
