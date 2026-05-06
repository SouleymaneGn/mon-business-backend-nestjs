import { PartialType } from '@nestjs/swagger';
import { CreateProdutDto } from './create-produt.dto';

export class UpdateProdutDto extends PartialType(CreateProdutDto) {}
