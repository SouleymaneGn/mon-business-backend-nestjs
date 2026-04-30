class Customer {
  name!: string;

  static fromPrisma(data: any): Customer {
    const customer = new Customer();
    customer.name = data?.name;
    return customer;
  }
}

export class TransactionDto {
  id!: string;
  clientId!: string;
  type!: 'DEPOT' | 'RETRAIT';
  amount!: number;
  note!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
  customer!: Customer;

  static fromPrisma(data: any): TransactionDto {
    const transaction = new TransactionDto();

    transaction.id = data.id;
    transaction.clientId = data.clientId;
    transaction.type = data.type;
    transaction.amount = data.amount;
    transaction.note = data.note;
    transaction.createdAt = new Date(data.createdAt);
    transaction.updatedAt = new Date(data.updatedAt);
    transaction.customer = Customer.fromPrisma(data.customer);

    return transaction;
  }
}