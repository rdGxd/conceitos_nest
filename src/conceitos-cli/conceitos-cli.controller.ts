import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ConceitosCliService } from './conceitos-cli.service';

@Controller('conceitos-clis')
export class ConceitosCliController {
  constructor(private readonly conceitosCliService: ConceitosCliService) {}

  @Post()
  create() {
    return this.conceitosCliService.create();
  }

  @Get()
  findAll() {
    return this.conceitosCliService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.conceitosCliService.findOne(id);
  }

  @Patch(':id')
  update(id: number) {
    return this.conceitosCliService.update(id);
  }

  @Delete(':id')
  remove(id: number) {
    return this.conceitosCliService.remove(id);
  }
}
