import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { DatabaseModule } from './database/database.module';
import { produtosProviders } from './produtos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProdutosController],
  providers: [
    ...produtosProviders,
     ProdutosService
  ]
})
export class ProdutosModule {}
