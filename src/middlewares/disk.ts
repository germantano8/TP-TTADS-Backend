import * as multer from "multer";
import { mkdir } from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ): void => {
    const dir = process.cwd() + "/tmp/uploads";
    mkdir(dir, (err: NodeJS.ErrnoException) => {
      callback(err, dir);
    });
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
): void => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
