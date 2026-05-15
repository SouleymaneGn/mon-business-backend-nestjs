import { ApiProperty } from "@nestjs/swagger";

export class InvoiceItemDto {
  @ApiProperty()
  productId!: string;
  @ApiProperty()
  quantity!: number;
}