import { Injectable } from "@nestjs/common";

import { extname, join } from "path";
import { ensureDir, writeFile } from "fs-extra";
import { format } from "date-fns";

import { FileElementResponse } from "./dto/file-element.dto";

import { MFile } from "./mfile.class";

@Injectable()
export class FileService {
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
}
