import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
    private storage: Storage;

    constructor() {
        // Create a new instance of the Storage class
        this.storage = new Storage({
            projectId: 'apkmanager-12227',
            keyFilename: '../assets/apkmanager-12227-dfe1b13f205a.json'
          });
      }

    getHello(): string {
        return 'This is storageee';
    }
    async uploadFile(file: Express.Multer.File, path: String): Promise<string> {

        const bucketName: string = "apkmanager-12227.appspot.com";
        // Set the name for the file in the bucket
        const fileName = `${Date.now()}_${file.originalname}`;

        // Specify the options for the file upload
        const options = {
            destination: fileName,
            metadata: {
                contentType: file.mimetype,
            },
        };

        try {
            console.log("File to upload", file)
            // Upload the file to the specified bucket
            await this.storage.bucket(bucketName).upload(file.path, options);

            console.log("Upload path", path)

            // Get the public URL for the file
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${path}/${fileName}`;

            console.log("publicUrl", publicUrl)
            // Return the public URL
            return publicUrl;
        } catch (error) {
            console.error('Error uploading file to Google Cloud Storage:', error);
            throw error;
        }
    }
}
