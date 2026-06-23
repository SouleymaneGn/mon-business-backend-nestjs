import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {
 @ApiProperty()
  id?: string
  @ApiProperty()
  name!: string;
  @ApiProperty()
  phone?: string;
   @ApiProperty()

  email?: string;

  @ApiProperty()

  address?: string;


  
  static fromPrisma(data: any) : CreateSupplierDto {
    const product = new CreateSupplierDto()
    product.id=data.id
    product.name = data.name
    product.phone = data.price 
    product.email = data.stock
    product.address = data.adresse
    return product
  }
}
