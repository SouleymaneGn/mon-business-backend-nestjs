import { ApiProperty } from "@nestjs/swagger";

export class CreateProdutDto {
  @ApiProperty()
  name!: string;
  @ApiProperty()

  price!: number;
  @ApiProperty()

  stock!: number;

  static fromPrisma(data: any) : CreateProdutDto {
    const product = new CreateProdutDto()
    product.name = data.name
    product.price = data.price 
    product.stock = data.stock

    return product
  }
}
