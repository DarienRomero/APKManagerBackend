import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
    getHello(): string {
        return 'This is storageee';
    }
    uploadFile(): string {
        const pk = process.env.PRIVATE_KEY;
        console.log("pk", pk)
        return 'Upload file';
    }
}
