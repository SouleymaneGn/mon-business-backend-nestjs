import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutsService } from './produts.service';
import { CreateProdutDto } from './dto/create-produt.dto';
import { UpdateProdutDto } from './dto/update-produt.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('produts')
export class ProdutsController {
  constructor(private readonly produtsService: ProdutsService) {}

  @Post()
  create(@Body() createProdutDto: CreateProdutDto) {
    return this.produtsService.create(createProdutDto);
  }

 @Get()
   @ApiOkResponse({ type: CreateProdutDto, isArray: true })
  findAll() {
    return this.produtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutDto: UpdateProdutDto) {
    return this.produtsService.update(+id, updateProdutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtsService.remove(+id);
  }
}
