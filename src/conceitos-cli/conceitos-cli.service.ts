import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosCliService {
  create() {
    return 'This action creates a new resource';
  }

  findAll() {
    return 'This action returns all resources';
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
