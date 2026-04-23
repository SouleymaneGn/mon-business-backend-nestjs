import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService){}
async create(data: Prisma.TransactionCreateInput) {
  const { customer, type, amount } = data;

  // récupérer clientId depuis relation nested
  const clientId = customer.connect?.id;

  if (!clientId) {
    throw new BadRequestException('Client requis');
  }

  // 1. Vérifier client
  const client = await this.prismaService.customer.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new BadRequestException('Client introuvable');
  }

  // 2. Créer transaction
  const transaction = await this.prismaService.transaction.create({
    data: {
      type,
      amount,
      customer: {
        connect: { id: clientId },
      },
    },
  });

  // 3. Calcul solde
  let newSolde = client.solde;

  switch (type) {
    case 'DEPOT':
      newSolde += amount;
      break;

    case 'RETRAIT':
          newSolde -= amount;
      break;
    case 'ACHAT':
      newSolde -= amount;
      break;
  }

  // 4. Update client
  await this.prismaService.customer.update({
    where: { id: clientId },
    data: { solde: newSolde },
  });

  return transaction;
}

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }



}
