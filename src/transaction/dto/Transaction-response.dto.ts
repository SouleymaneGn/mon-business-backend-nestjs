import { ApiProperty } from '@nestjs/swagger';

enum TransactionStatus {
    DEPOT,
    RETRAIT,
    ACHAT
}
class CustomerDto {
  @ApiProperty()
  name!: string;
}

export class TransactionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  clientId!: string;

  @ApiProperty({ enum: TransactionStatus })
  type!: TransactionStatus;

  @ApiProperty()
  amount!: number;

  @ApiProperty({ nullable: true })
  note!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: CustomerDto })
  customer!: CustomerDto;
}