import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class StorageService {
    private storage: Storage;

    bucketName = "apkmanager-12227.appspot.com";

    constructor() {
        // Create a new instance of the Storage class
        this.storage = new Storage({
            projectId: 'apkmanager-12227',
            // keyFilename: process.env.FIREBASE_KEY_ROUTE
            keyFilename: "./assets/apkmanager-12227-dfe1b13f205a.json"
          });
      }

    getHello(): string {
        return 'This is storageee';
    }
    async uploadFile2(file: Express.Multer.File, body: UploadFileDto): Promise<string> {
        const bucketName: string = "apkmanager-12227.appspot.com";
        const bucket = this.storage.bucket(bucketName);
        const filePath = `app/${body.app_id}/${file.originalname}`;
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
    
        return new Promise((resolve, reject) => {
          blobStream.on('finish', async () => {
            await blob.makePublic();

            // Generate the public URL
            const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;
            resolve(publicUrl);
          });
          blobStream.on('error', (err) => {
            reject(err);
          });
          blobStream.end(file.buffer);
        });
      }
}
