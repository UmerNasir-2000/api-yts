import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import PrismaService from './database/prisma.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
