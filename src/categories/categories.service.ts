import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private readonly categoriesRepo: Repository<Category>,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category: Category = this.categoriesRepo.create(createCategoryDto);
      const isCategoryFound: boolean = await this.categoriesRepo.exists({ where: { name: category.name } });
      if(!isCategoryFound){
        return await this.categoriesRepo.save(category);
      }
      
      throw new ConflictException('Category already exists');
      
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occured while creating the category');
    }
  }

  async findAll() {
    try {
      const authors = await this.categoriesRepo.find();
      return authors.length ? authors : [];
    } catch (error) {
      throw new NotFoundException('Categories not found');
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoriesRepo.findOneByOrFail({ id });
      return category;
    } catch (error) { 
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Category not found');
      }
      throw new InternalServerErrorException('An error occurred while fetching the category');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoriesRepo.findOneByOrFail({ id });
      const toSaveCategory = this.categoriesRepo.create(
        { ...category, ...updateCategoryDto }
      );
      await this.categoriesRepo.save(toSaveCategory);

    } catch (error) {
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Category not found');
      }
      throw new InternalServerErrorException('An error occurred while updating the category');
    }
  }

  async remove(id: number) {
    try {
      const isCategoryFound = await this.categoriesRepo.existsBy({ id });
      if(isCategoryFound)  {
        await this.categoriesRepo.delete({ id });
      } else {
        throw new NotFoundException('Category not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the category');
    }
  }
}
