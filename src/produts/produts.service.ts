import { Injectable } from '@nestjs/common';
import { CreateProdutDto } from './dto/create-produt.dto';
import { UpdateProdutDto } from './dto/update-produt.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProdutsService {
  constructor( private prismaService: PrismaService){}
async create(createProductDto: CreateProdutDto) {
  const { name } = createProductDto;

  // 1. Vérifier si le produit existe déjà
  const existingProduct = await this.prismaService.produit.findFirst({
    where: {
      name: name,
    },
  });

  if (existingProduct) {
    throw new Error('Ce produit existe déjà');
  }

  // 2. Créer le produit
  const product = await this.prismaService.produit.create({
    data: {
      ...createProductDto,
    },
  });

  return product;
}

  async findAll() {
   const products = await this.prismaService.produit.findMany() 
    return CreateProdutDto.fromPrisma(products)
  }

  findOne(id: number) {
    return `This action returns a #${id} produt`;
  }

  update(id: number, updateProdutDto: UpdateProdutDto) {
    return `This action updates a #${id} produt`;
  }

  remove(id: number) {
    return `This action removes a #${id} produt`;
  }
}
