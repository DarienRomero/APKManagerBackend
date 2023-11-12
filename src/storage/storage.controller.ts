import { Controller, Get, Post } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  getHello(): string {
    return this.storageService.getHello();
  }

  @Post()
  uploadFile(): string {
    return this.storageService.uploadFile();
  }
}
