import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionDto } from './dto/client-transation.dto';
import { PrismaService } from 'src/prisma.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService){}
async create(dto: CreateTransactionDto) {
  const { clientId, type, amount } = dto;

  // 1. Vérifier client
  const client = await this.prismaService.customer.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new BadRequestException('Client introuvable');
  }

  // 2. Calcul solde AVANT création
  let newSolde = client.solde;

  switch (type) {
    case 'DEPOT':
      newSolde += amount;
      break;

    case 'RETRAIT':
    case 'ACHAT':
      newSolde -= amount;
      break;

    default:
      throw new BadRequestException('Type de transaction invalide');
  }

  if (newSolde < 0) {
    throw new BadRequestException('Solde insuffisant');
  }

  // 3. Transaction atomique (TRÈS IMPORTANT)
  const result = await this.prismaService.$transaction(async (tx) => {
    const transaction = await tx.transaction.create({
      data: {
        clientId,
        type,
        amount,
      },
    });

    await tx.customer.update({
      where: { id: clientId },
      data: { solde: newSolde },
    });

    return transaction;
  });

  return result;
}

async findAll(): Promise<TransactionDto[]> {
  const transactions = await this.prismaService.transaction.findMany({
    include: {
      customer: {
        select: {
          name: true,
        },
      },
    },
  });

  return transactions.map(TransactionDto.fromPrisma);
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
