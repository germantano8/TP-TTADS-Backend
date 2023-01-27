import * as multer from "multer";
import { mkdirSync } from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ): void => {
    const path = "./tmp/uploads";
    mkdirSync(path, { recursive: true });
    callback(null, path);
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error, filename: string) => void
  ) {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = file.mimetype.split("/")[1];
    callback(null, `${file.fieldname}-${suffix}.${ext}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
): void => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    callback(null, true);
  } else {
    const err = new Error("File mimetype not supported");
    callback(err);
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});

export {uploads};
