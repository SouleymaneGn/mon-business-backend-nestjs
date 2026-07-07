import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma.service';
@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService){}
  async create(createAccountDto: CreateAccountDto) {
    
  const account = await this.prisma.account.findUnique({
    where:{
      name:createAccountDto.name
    }
  });

  if (account) {
    throw new ConflictException('Un compte portant ce nom existe déjà.');
  }

  return this.prisma.account.create({
    data: createAccountDto,
  });
}

findAll() {
    return this.prisma.account.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
