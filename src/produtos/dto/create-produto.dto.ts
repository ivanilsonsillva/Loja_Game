import { IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsNumber()
    id: number;

    @IsString()
    nome:string;

    @IsNumber()
    valor:number;
}

