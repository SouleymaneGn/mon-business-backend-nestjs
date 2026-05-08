import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "@prisma/client";

export class CreatePaymentDto {
  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  invoiceId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty({
    enum: PaymentMethod
  })
  method!: PaymentMethod;

  @ApiProperty({
    required: false
  })
  note?: string;
}
