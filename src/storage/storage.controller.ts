import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, Response} from '@nestjs/common';
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

  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body : UploadFileDto,
    @Response() res
  ) {
    if (!file) {
      return { error: 'No file uploaded.' };
    }
    const publicUrl = await this.storageService.uploadFile2(file, body);
    res.status(200).json({
      url: publicUrl,
    });
  }
}
