import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prismaService : PrismaService){}
  async create(dto: CreateInvoiceDto) {
const { customerId, items } = dto;

    // 1. vérifier client
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Client introuvable');
    }

    // 2. transaction atomique
    return await this.prismaService.$transaction(async (tx) => {

      let total = 0;

      // 3. créer facture brouillon
      const invoice = await tx.invoice.create({
        data: {
          customerId,
          status: 'BROUILLON',
          total: 0,
        },
      });

      // 4. parcourir produits
      for (const item of items) {

        // chercher produit
        const product = await tx.produit.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new NotFoundException('Produit introuvable');
        }

        // vérifier stock
        if (product.stock < item.quantity) {
          throw new BadRequestException(
            `Stock insuffisant pour ${product.name}`
          );
        }

        // calcul total ligne
        const lineTotal = product.price * item.quantity;

        // ajouter total facture
        total += lineTotal;

        // créer invoice item
        await tx.invoiceItem.create({
          data: {
            invoiceId: invoice.id,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          },
        });

        // diminuer stock
        await tx.produit.update({
          where: {
            id: product.id,
          },
          data: {
            stock: product.stock - item.quantity,
          },
        });
      }

      // 5. update total facture
      const updatedInvoice = await tx.invoice.update({
        where: {
          id: invoice.id,
        },
        data: {
          total,
          status: 'EN_ATTENTE',
        },
      });

      return updatedInvoice;
    });
    }

  findAll() {
    return `This action returns all invoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
