import * as express from "express";
import { Controller, FileInterceptor, Get, Post, Res, UseInterceptors, Req, HttpCode, HttpStatus } from "@nestjs/common";
import * as fs from "fs";

@Controller('video')
export class VideoController {
    @Get()
    @HttpCode(HttpStatus.PARTIAL_CONTENT)
    async streamVideo(@Req() req: express.Request, @Res() res: express.Response) {
        const file = process.env.EXAMPLE_VIDEO;
        if (!req.headers.range) {
            return res.sendStatus(416);
        }
        
        let ifRange = req.header('If-Range');

        res.setHeader('Cache-Control', 'public, max-age=0');
        res.contentType("video/mp4");

        if (!fs.existsSync(file)) {
            return res.sendStatus(404);
        }  

        let range = req.headers.range.toString();
        let positions = range.replace(/bytes=/, '').split('-');
        let start = parseInt(positions[0], 10);

        fs.stat(file, (err, stats) => {
            let total = stats.size;
        let end = positions[1] ? parseInt(positions[1], 10) : total - 1;

        // Start should be lower than end
        if (start >= end) {
            return res.sendStatus(416);
        }

        // Start and end should be lower than size
        if (start > total || end > total) {
            return res.sendStatus(416);
        }

        let chunksize = (end - start) + 1;

        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize
        });
        let stream = fs.createReadStream(file, { start, end });

        stream
            .on('open', () => stream.pipe(res))
            .on('error', (error: string) => {
                res.end(error);
            });
        });
    }
}