import { Injectable } from '@nestjs/common';

import { CreateImageDto } from '@modules/images/dto/create-image.dto';
import { UpdateImageDto } from '@modules/images/dto/update-image.dto';

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
