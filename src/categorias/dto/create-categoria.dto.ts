import { IsNumber, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsNumber()
    id: number;

    @IsString()
    nome:string;

    @IsString()
    cor:string;
}
