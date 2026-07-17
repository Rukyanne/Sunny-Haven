import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${uuidv4()}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image uploads are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export const uploadPropertyImages = upload.array('images', 8);
export const uploadAgentPhoto = upload.single('photo');
export const uploadAvatar = upload.single('avatar');

export const processImages = async (files) => {
  const results = [];

  for (const file of files) {
    const filename = path.basename(file.path);
    const thumbnailPath = `server/uploads/thumb-${filename}`;

    await sharp(file.path)
      .resize(1200)
      .jpeg({ quality: 80 })
      .toFile(file.path);

    await sharp(file.path)
      .resize(360)
      .jpeg({ quality: 70 })
      .toFile(thumbnailPath);

    results.push({
      url: `/uploads/${filename}`,
      thumbnailUrl: `/uploads/thumb-${filename}`,
      publicId: filename
    });
  }

  return results;
};
