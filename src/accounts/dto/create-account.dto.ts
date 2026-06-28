import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {  
  @ApiProperty({
    example: 'Caisse principale',
    description: 'Nom du compte',
  })
  name!: string;

  @ApiProperty({
    example: 500000,
    description: 'Solde initial du compte',
    required: false,
    default: 0,
  })
  balance?: number;
}