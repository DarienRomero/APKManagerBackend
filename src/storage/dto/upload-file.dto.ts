import { IsString } from "class-validator";

export class UploadFileDto {
    @IsString()
    app_id: string;
}
