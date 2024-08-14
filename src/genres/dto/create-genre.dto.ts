import { IsNotEmpty, IsString } from "class-validator"

export class CreateGenreDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}
