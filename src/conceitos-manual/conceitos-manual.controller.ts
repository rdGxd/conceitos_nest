import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ConceitosManualService } from './conceitos-manual.service';

@Controller('conceitos-manual')
export class ConceitosManualController {
  constructor(
    private readonly conceitosManualService: ConceitosManualService,
  ) {}

  @Post()
  create() {
    return this.conceitosManualService.create();
  }

  @Get()
  findAll() {
    return this.conceitosManualService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.conceitosManualService.findOne(id);
  }

  @Patch(':id')
  update(id: number) {
    return this.conceitosManualService.update(id);
  }

  @Delete(':id')
  remove(id: number) {
    return this.conceitosManualService.remove(id);
  }
}
