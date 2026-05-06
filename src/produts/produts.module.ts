import { Module } from '@nestjs/common';
import { ProdutsService } from './produts.service';
import { ProdutsController } from './produts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProdutsController],
  providers: [ProdutsService, PrismaService],
})
export class ProdutsModule {}
