import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService : PrismaService){}
  async create(createCustomerDto: Prisma.customerCreateInput) {
    try {
    const customer = await this.prismaService.customer.create({data: createCustomerDto})
    return {
      message :"client cree avec succes",
      data : customer
    } 
    } catch (error) {
          throw new InternalServerErrorException('Erreur lors de la création du client');

    }
   
  }

  async findAll() {
    try {
      const customer = await this.prismaService.customer.findMany()
      return customer
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la recuperation des clients');
   
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
