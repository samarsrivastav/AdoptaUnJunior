import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublishersService {

  constructor(
    @InjectRepository(Publisher) private readonly publisherRepo: Repository<Publisher>,
  ){}

  async create(createPublisherDto: CreatePublisherDto) {
    try {
      const publisher: Publisher = this.publisherRepo.create(createPublisherDto);
      const isPublisherFound: boolean = await this.publisherRepo.exists({where: {name: publisher.name}})
      if(!isPublisherFound){
        return await this.publisherRepo.save(publisher);
      }

      throw new ConflictException('Publisher already exists');
    } catch (error) {
      throw new InternalServerErrorException('An error occured while creating the publisher');
    }
  }

  async findAll() {
    try {
      const publishers = await this.publisherRepo.find();
      return publishers.length ? publishers : [];
    } catch (error) {
      throw new NotFoundException('Publisher not found');
    }
  }

  async findOne(id: number) {
    try {
      const publisher = await this.publisherRepo.findOneByOrFail({id});
      return publisher;
    } catch (error) {
      if(error.name === 'EntityNotFoundError'){
        throw new NotFoundException('Publisher not found');
      }
      throw new InternalServerErrorException('An error occured while fetching the publisher');
    }
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    try {
      const publisher = await this.publisherRepo.findOneByOrFail({id});
      const toSavePublisher = this.publisherRepo.create(
        { ...publisher, ...updatePublisherDto }
      );
      await this.publisherRepo.save(toSavePublisher);
    } catch (error) {
      if(error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Publisher not found');
      }
      throw new InternalServerErrorException('An error occurred while updating the publisher');
    }
  }

  async remove(id: number) {
   try {
    const isPublisherFound = await this.publisherRepo.existsBy({id});
    if(isPublisherFound){
      await this.publisherRepo.delete({id});
    } else {
      throw new NotFoundException('Publisher not found');
    }
   } catch (error) {
    throw new InternalServerErrorException('An error occurred while deleting the author');
   }
  }
}
