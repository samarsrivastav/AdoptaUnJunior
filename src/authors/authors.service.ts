import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(Author) private authorsRepo: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      const author: Author = this.authorsRepo.create(createAuthorDto);
      const isAuthorFound: boolean = await this.authorsRepo.exists({ where: { name: author.name } });
      if(!isAuthorFound){
        return await this.authorsRepo.save(author);
      }
      
      throw new ConflictException('Author already exists');
      
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occured while creating the author');
    }
  }

  async findAll() {
    try {
      const authors = await this.authorsRepo.find();
      return authors.length ? authors : [];
    } catch (error) {
      throw new NotFoundException('Authors not found');
    }
  }

  async findOne(id: number) {
    if(!id) {
      throw new NotFoundException(`Invalid id: ${id}`);
    }
    try {
      const author = await this.authorsRepo.findOneByOrFail({ id });
      return author;
    } catch (error) { 
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Author not found');
      }
      throw new InternalServerErrorException('An error occurred while fetching the author');
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    if(!id) {
      throw new NotFoundException(`Invalid id: ${id}`);
    }
    try {
      const isAuthorFound = await this.authorsRepo.existsBy({ id });

      if(isAuthorFound) {
        await this.authorsRepo.update({ id }, updateAuthorDto);
      } else {
        throw new NotFoundException('Author not found');
      }

    } catch (error) {
      console.log(error.name)
      throw new InternalServerErrorException('An error occurred while updating the author');
    }
  }

  async remove(id: number) {
    if(!id) {
      throw new NotFoundException(`Invalid id: ${id}`);
    }
    try {
      const isAuthorFound = await this.authorsRepo.existsBy({ id });
      if(isAuthorFound)  {
        await this.authorsRepo.delete({ id });
      } else {
        throw new NotFoundException('Author not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the author');
    }
  }
}
