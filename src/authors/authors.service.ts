import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Book } from '../books/entities/book.entity';

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

  async findAll(): Promise<Author[]> {
    try {
      const authors = await this.authorsRepo.find();
      return authors.length ? authors : [];
    } catch (error) {
      throw new NotFoundException('Authors not found');
    }
  }

  async findOne(id: number): Promise<Author> {
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

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<void> {
    try {
      const author = await this.authorsRepo.findOneByOrFail({ id });
      const toSaveAuthor = this.authorsRepo.create(
        { ...author, ...updateAuthorDto }
      );
      await this.authorsRepo.save(toSaveAuthor);

    } catch (error) {
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Author not found');
      }
      throw new InternalServerErrorException('An error occurred while updating the author');
    }
  }

  async remove(id: number): Promise<void> {
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

  async findBooksByAuthorId(id: number): Promise<Book[]> {
    try {
      const author = await this.authorsRepo.findOneOrFail({ 
          where: {id}, 
          relations: ['books'] 
        });

      return author.books;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching author books');
    }
  }
}