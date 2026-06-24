import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService){}
async create(dto: CreatePurchaseDto) {
  return this.prisma.$transaction(async (tx) => {

    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.purchasePrice,
      0,
    );

    let status: PurchaseStatus;

    if (dto.paidAmount === 0) {
      status = PurchaseStatus.UNPAID;
    } else if (dto.paidAmount >= totalAmount) {
      status = PurchaseStatus.PAID;
    } else {
      status = PurchaseStatus.PARTIAL;
    }

    const purchase = await tx.purchase.create({
      data: {
        supplierId: dto.supplierId,
        totalAmount,
        paidAmount: dto.paidAmount,
        status,
      },
    });

    for (const item of dto.items) {

      await tx.purchaseItem.create({
        data: {
          purchaseId: purchase.id,
          productId: item.productId,
          quantity: item.quantity,
          purchasePrice: item.purchasePrice,
        },
      });

      await tx.produit.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }

    return purchase;
  });
}

async findAll() {
  const purchases = await this.prisma.purchase.findMany({
    include: {
      supplier: true,
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return purchases.map((purchase) => ({
    id: purchase.id,
    supplierName: purchase.supplier.name,
    totalAmount: purchase.totalAmount,
    paidAmount: purchase.paidAmount,
    balance: purchase.totalAmount - purchase.paidAmount,
    itemCount: purchase.items.length,
    status: purchase.status,
    createdAt: purchase.createdAt,
  }));
}

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
