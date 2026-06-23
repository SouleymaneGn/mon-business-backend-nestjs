import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SuppliersService {
   constructor(private readonly prismaService : PrismaService){}
   async create(createSupplierDto: CreateSupplierDto) {
     try {
     const customer = await this.prismaService.supplier.create({data:createSupplierDto})
     return {
       message :"fourniseur cree avec succes",
       data : customer
     } 
     } catch (error) {
      console.log(error)
           throw new InternalServerErrorException('Erreur lors de la création du fourniseur');
 
     }
    
   }

  findAll() {
   return this.prismaService.supplier.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
