import { ApiProperty } from "@nestjs/swagger";

export class CreateProdutDto {
  @ApiProperty()
  id?:string
  @ApiProperty()
  name!: string;
  @ApiProperty()

  price!: number;
  @ApiProperty()

  stock!: number;

  static fromPrisma(data: any) : CreateProdutDto {
    const product = new CreateProdutDto()
    product.id=data.id
    product.name = data.name
    product.price = data.price 
    product.stock = data.stock

    return product
  }
}
