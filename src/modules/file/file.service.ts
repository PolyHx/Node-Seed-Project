import * as path from "path";
import { Component } from "@nestjs/common";

@Component()
export class FileService {
    private mime = {
        html: 'text/html',
        txt: 'text/plain',
        css: 'text/css',
        gif: 'image/gif',
        jpg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
        js: 'application/javascript'
    };

    getMimeTypeFromFile(file: string) {
        return this.mime[path.extname(file).slice(1)] || 'text/plain';
    }
}
