import { Injectable } from "@nestjs/common";

import * as sharp from "sharp";
import { extname, join } from "path";
import { ensureDir, writeFile, statSync, readdirSync } from "fs-extra";
import { format } from "date-fns";

import { FileElementResponse } from "./dto/file-element.dto";

import { MFile } from "./mfile.class";

@Injectable()
export class FileService {
  async findFiles(dir: string, files: { id: number; name: string; download: string }[] = []) {
    const fileList = readdirSync(join(process.cwd(), dir));

    for (const file of fileList) {
      const name = `${dir}/${file}`;

      if (statSync(name).isDirectory()) {
        this.findFiles(name, files);
      } else {
        files.push({ id: files.length, name: `/${name}`, download: process.env.HOST + `/${name}` });
      }
    }

    return { data: files, total: files.length };
  }

  async saveFile(file: MFile): Promise<FileElementResponse> {
    const dateFolder = format(new Date(), "yyyy-MM-dd");
    const uploadFolder = join(process.cwd(), "uploads", dateFolder);
    await ensureDir(uploadFolder);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${file.originalname}-${uniqueSuffix}${ext}`;

    await writeFile(join(uploadFolder, filename), file.buffer);
    return { url: `/uploads/${dateFolder}/${filename}`, name: file.originalname };
  }

  async convertToWebp(file: Buffer): Promise<Buffer> {
    try {
      const image = sharp(file);
      const metadata = await image.metadata();
      const originalWidth = metadata.width;

      if (originalWidth > 3000) {
        return image.resize({ width: 3000, fit: "contain" }).webp().toBuffer();
      } else {
        return image.webp().toBuffer();
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }
}
