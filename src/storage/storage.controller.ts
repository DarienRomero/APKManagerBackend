import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  getHello(): string {
    return this.storageService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))

  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body : UploadFileDto
  ) {
    return this.storageService.uploadFile(file, body.path);
  }
}
