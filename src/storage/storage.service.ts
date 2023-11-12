import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
    getHello(): string {
        return 'This is storageee';
    }
    uploadFile(): string {
        return 'Upload file';
    }
}
