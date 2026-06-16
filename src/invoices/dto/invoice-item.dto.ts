import { ApiProperty } from "@nestjs/swagger";

export class InvoiceItemDto {
  @ApiProperty()
  productId!: string;
  @ApiProperty()
  price!:number
  @ApiProperty()
  quantity!: number;
}