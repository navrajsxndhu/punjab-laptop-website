import { Router, Response } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';
import { uploadToCloudinary } from '../utils/cloudinary';
import { AuthRequest, ApiResponse } from '../types';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed.'));
  },
});

router.post('/', authenticate, upload.single('file'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file uploaded.' } as ApiResponse);
      return;
    }

    const folder =
      (req.body.folder as string) ||
      process.env.CLOUDINARY_UPLOAD_FOLDER ||
      'punjab-laptop-sirsa';
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      },
      message: 'Image uploaded successfully.',
    } as ApiResponse);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Upload failed.',
    } as ApiResponse);
  }
});

export default router;
