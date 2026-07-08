
import { Injectable } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { url } from 'inspector';
import { Pool } from 'pg';


@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}
