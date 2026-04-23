import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [CustomerModule, ConfigModule.forRoot({isGlobal:true}), TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
