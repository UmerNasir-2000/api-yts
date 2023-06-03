import { Injectable } from '@nestjs/common';
import PrismaService from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  getHello() {
    return this.prismaService.movie.findMany();
  }
}
