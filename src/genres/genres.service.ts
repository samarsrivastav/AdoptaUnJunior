import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return null;
  }

  async findAll(): Promise<Genre[]> {
    return null;
  }

  async findOne(id: number): Promise<Genre> {
    return null;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<void> {
    return null;
  }

  async remove(id: number): Promise<void> {
    return null;
  }
}
