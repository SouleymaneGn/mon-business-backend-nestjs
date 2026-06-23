import { ApiProperty } from '@nestjs/swagger';
import { CreatePurchaseItemDto } from './create-purchase-Items';

export class CreatePurchaseDto {
  @ApiProperty()
  supplierId!: string;

  @ApiProperty()
  paidAmount!: number;

  @ApiProperty({
    type: [CreatePurchaseItemDto],
  })
  items!: CreatePurchaseItemDto[];
}