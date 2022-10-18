import { Injectable, Inject, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @Inject('CATEGORIAS_REPOSITORY')
    private categoriasRepository: Repository<Categoria>
  ) {}
    async listar():Promise<Categoria[]>{
      return this.categoriasRepository.find();
    }
  private categorias: Categoria[] = []; 
  
  create(createCategoriaDto: CreateCategoriaDto) {
    const IdMaxAtual = this.categorias[this.categorias.length - 1]?.id||0;
    const id = IdMaxAtual + 1;
    const categoria = {
      id,
      ...createCategoriaDto
    };
    this.categorias.push(categoria);
    return categoria;
  }

  findAll() {
    return this.categorias;
  }

  findOne(id: number) {
    const index = this.categorias.findIndex((categoria)=> categoria.id === id);
    if(index === -1){
      throw new NotFoundException(`Categoria com ID ${id} não encontrado.`) 
    }

    return this.categorias[index]
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = this.findOne(id);
    const newCategoria = {
      ...categoria,
      ...updateCategoriaDto
    }
    const index = this.categorias.findIndex((categoria) => categoria.id === id);
    if(index === -1){
      throw new NotFoundException(`Categoria com ID ${id} não encontrado.`) 
    }
    this.categorias[index] = newCategoria;

    return newCategoria;
  }

  remove(id: number){
    const index = this.categorias.findIndex((categoria) => categoria.id === id);

    if(index === -1){
      throw new NotFoundException(`Categoria com ID ${id} não encontrado.`) 
    }
    this.categorias.splice(index, 1) 

    return `Categoria com o ID ${id} removida com sucesso.`;
  }
}
