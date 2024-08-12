import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book) private booksRepo: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book: Book = this.booksRepo.create(createBookDto);
      const isBookFound: boolean = await this.booksRepo.exists({ where: { title: book.title } });
      if(!isBookFound){
        return await this.booksRepo.save(book);
      }
      
      throw new ConflictException('Book already exists');
      
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occured while creating the author');
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.booksRepo.find({relations: ['authors', 'categories', 'publisher']});
      return books.length ? books : [];
    } catch (error) {
      throw new NotFoundException('Books not found');
    }
  }

  async findOne(id: number): Promise<Book> {
    try {
      const book = await this.booksRepo.findOneByOrFail({ id });
      return book;
    } catch (error) {
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Book not found');
      }
      throw new InternalServerErrorException('An error occurred while fetching the book');
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<void> {
    try {
      const book = await this.booksRepo.findOneByOrFail({ id });
      const toSaveBook = this.booksRepo.create(
        { ...book, ...updateBookDto }
      );
      await this.booksRepo.save(toSaveBook);

    } catch (error) {
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Book not found');
      }
      throw new InternalServerErrorException('An error occurred while updating the book');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const isBookFound = await this.booksRepo.existsBy({ id });
      if(isBookFound)  {
        await this.booksRepo.delete({ id });
      } else {
        throw new NotFoundException('Book not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the book');
    }
  }
}