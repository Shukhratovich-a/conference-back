import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  ParseFilePipe,
  Get,
  Query,
  Res,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { Response } from "express";
import { join, parse } from "path";
import { createReadStream, existsSync } from "fs-extra";

import { FileService } from "./file.service";

import { FileElementResponse } from "./dto/file-element.dto";

import { MFile } from "./mfile.class";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get("get-files-list")
  async getFiles() {
    return await this.fileService.findFiles("uploads", []);
  }

  @Get("download-file")
  async downloadFile(@Query("file") file: string, @Res() res: Response): Promise<void> {
    try {
      const parsedFile = parse(file);

      const filename = parsedFile.base;
      const filePath = join(process.cwd(), parsedFile.dir, filename);

      const isExists = existsSync(filePath);
      if (!isExists) throw new BadRequestException();

      if (parsedFile.ext === ".pdf") res.setHeader("Content-Type", " application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch {
      throw new BadRequestException();
    }
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ): Promise<FileElementResponse> {
    if (file.mimetype.includes("image")) {
      const buffer = await this.fileService.convertToWebp(file.buffer);

      const save: MFile = new MFile({
        originalname: `${file.originalname.split(".")[0]}.webp`,
        buffer,
      });

      return this.fileService.saveFile(save);
    }

    const saveArray: MFile = new MFile(file);

    return this.fileService.saveFile(saveArray);
  }
}
