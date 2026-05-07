import { ApiProperty } from "@nestjs/swagger";
import { InvoiceItemDto } from "./invoice-item.dto";

export class CreateInvoiceDto {
  @ApiProperty()
  customerId!: string;
  @ApiProperty({ type: [InvoiceItemDto] })
  items!: InvoiceItemDto[];
}
