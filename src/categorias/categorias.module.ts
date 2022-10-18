import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { DatabaseModule } from './database/database.module';
import { categoriasProviders } from './categoria.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriasController],
  providers: [
    ...categoriasProviders,
    CategoriasService
  ]
})
export class CategoriasModule {}
