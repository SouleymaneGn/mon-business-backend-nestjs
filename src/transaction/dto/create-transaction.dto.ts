import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "@prisma/client";

export class CreateTransactionDto {
     @ApiProperty()
    
    id?: string
      @ApiProperty()
    
    type?: TransactionType
      @ApiProperty()
    clientId!: string
      @ApiProperty()  
 
    amount!: number
      @ApiProperty()

    note?: string ;
      @ApiProperty()

    createdAt?: Date | string;
      @ApiProperty()

    updatedAt?: Date | string;

}
