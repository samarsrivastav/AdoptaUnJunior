import { IsNotEmpty, IsString, Matches } from "class-validator"

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    country: string
}