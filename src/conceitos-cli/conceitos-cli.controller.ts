import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('conceitos-clis')
export class ConceitosCliController {
  constructor() {}

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne() {}

  @Patch(':id')
  update() {}

  @Delete(':id')
  remove() {}
}
