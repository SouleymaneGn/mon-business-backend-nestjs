import { ApiProperty } from "@nestjs/swagger"

export class CreateCustomerDto {
id?:string;
@ApiProperty()
name!:string ;
@ApiProperty()
phone!:string
createdAt?:Date
updateAt?:Date
}



