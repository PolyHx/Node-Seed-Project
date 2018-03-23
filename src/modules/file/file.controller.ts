import * as express from "express";
import { Controller, FileInterceptor, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import * as fs from "fs";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            mimeType: file.mimetype
        };
    }

    @Get()
    async downloadFile(@Res() res: express.Response) {
        const file = process.env.EXAMPLE_FILE;
        const type = this.fileService.getMimeTypeFromFile(file);
        const stream = fs.createReadStream(file);
        stream.on('open', function () {
            res.set('Content-Type', type);
            stream.pipe(res);
        });
        stream.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });
    }
}
