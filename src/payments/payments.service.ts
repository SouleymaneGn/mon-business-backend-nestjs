import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma.service';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prismaService : PrismaService){}
 async create(createPaymentDto: CreatePaymentDto) {

  const {
    customerId,
    invoiceId,
    amount,
    method,
    note,
  } = createPaymentDto;

  // =========================================
  // 1. vérifier client
  // =========================================

  const customer = await this.prismaService.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    throw new NotFoundException('Client introuvable');
  }

  // =========================================
  // 2. vérifier facture
  // =========================================

  const invoice = await this.prismaService.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    include:{
      payments:true
    }
  });

  if (!invoice) {
    throw new NotFoundException('Facture introuvable');
  }

  // =========================================
  // 3. total déjà payé
  // =========================================

  const totalPaid = invoice.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  // =========================================
  // 4. reste à payer
  // =========================================

  const remaining = invoice.total - totalPaid;

  // =========================================
  // 5. vérifier montant
  // =========================================

  if (amount > remaining) {
    throw new BadRequestException(
      'Le paiement dépasse le reste à payer'
    );
  }

  // =========================================
  // TRANSACTION ATOMIQUE
  // =========================================

  return await this.prismaService.$transaction(async (tx) => {

    // =========================================
    // 6. créer paiement
    // =========================================

    const payment = await tx.payment.create({
      data: {
        customerId,
        invoiceId,
        amount,
        method,
        note,
      },
    });

    // =========================================
    // 7. SI paiement via VIREMENT
    // => modifier solde + créer transaction
    // =========================================

    if (method === PaymentMethod.VIREMENT) {

      // nouveau solde
      const newSolde = customer.solde - amount;

      // update solde client
      await tx.customer.update({
        where: {
          id: customerId,
        },
        data: {
          solde: newSolde,
        },
      });

      // historique transaction
      await tx.transaction.create({
        data: {
          clientId: customerId,
          type: 'PAIEMENT',
          amount,
          note: 'Paiement facture via solde client',
        },
      });
    }

    // =========================================
    // 8. nouveau montant payé
    // =========================================

    const newPaidAmount = totalPaid + amount;

    // =========================================
    // 9. calcul status facture
    // =========================================

    let newStatus: 'EN_ATTENTE' | 'PARTIEL' | 'PAYE' = 'EN_ATTENTE';

    if (newPaidAmount === invoice.total) {
      newStatus = 'PAYE';
    }
    else if (newPaidAmount > 0) {
      newStatus = 'PARTIEL';
    }

    // =========================================
    // 10. update facture
    // =========================================

    await tx.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: newStatus,
      },
    });

    return payment;
  });
}

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
