import { FileInterceptor } from '@nestjs/platform-express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FirebaseService } from './firebase.service';
import { ImageUploadResponse } from './entities/file.entity';
import { UseInterceptors } from '@nestjs/common';
import { UploadInput } from './dto/upload.input';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver(() => ImageUploadResponse)
export class FirebaseResolver {
  constructor(private firebaseService: FirebaseService) {}

  @Mutation(() => ImageUploadResponse)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, callback) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']; // Thêm các loại tệp bạn muốn cho phép ở đây
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('File type not allowed'), null); // Nếu tệp không hợp lệ, trả về lỗi
        }
      },
    }),
  )
  async uploadImage(
    @Args('image') image: UploadInput
  ): Promise<ImageUploadResponse> {
    const filePath = image.path;
    const destination = `${Date.now()}_${image.originalname}`;

    const imageUrl = await this.firebaseService.uploadImage(
      filePath,
      destination,
    );

    return { imageUrl };
  }
}
