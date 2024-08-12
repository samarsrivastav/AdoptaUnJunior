import { IsNotEmpty, IsString } from "class-validator"

export class CreatePublisherDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    country: string
    
    @IsString()
    @IsNotEmpty()
    website: string
}
