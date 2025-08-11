import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  create() {
    return 'This action adds a new conceitos-manual';
  }

  findAll() {
    return `This action returns all conceitos-manuals`;
  }

  findOne(id: number) {
    return `This action returns a #id conceitos-manual`;
  }

  update(id: number) {
    return `This action updates a #id conceitos-manual`;
  }

  remove(id: number) {
    return `This action removes a #id conceitos-manual`;
  }
}
