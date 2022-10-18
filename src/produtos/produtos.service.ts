import { Injectable, Inject, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject('PRODUTOS_REPOSITORY')
    private produtosRepository: Repository<Produto>
  ) {}
    async listar():Promise<Produto[]>{
      return this.produtosRepository.find();
    }
  private produtos: Produto[] = []; 
  
  create(createProdutoDto: CreateProdutoDto) {
    const IdMaxAtual = this.produtos[this.produtos.length - 1]?.id||0;
    const id = IdMaxAtual + 1;
    const produto = {
      id,
      ...createProdutoDto
    };
    this.produtos.push(produto);
    return produto;
  }

  findAll() {
    return this.produtos;
  }

  findOne(id: number) {
    const index = this.produtos.findIndex((produto)=> produto.id === id);
    if(index === -1){
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`) 
    }

    return this.produtos[index]
  }

  update(id: number, UpdateProdutoDto: UpdateProdutoDto) {
    const produto = this.findOne(id);
    const newProduto = {
      ...produto,
      ...UpdateProdutoDto
    }
    const index = this.produtos.findIndex((produto) => produto.id === id);
    if(index === -1){
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`) 
    }
    this.produtos[index] = newProduto;

    return newProduto;
  }

  remove(id: number){
    const index = this.produtos.findIndex((produto) => produto.id === id);

    if(index === -1){
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`) 
    }
    this.produtos.splice(index, 1) 

    return `Produto com o ID ${id} removido com sucesso.`;
  }
}