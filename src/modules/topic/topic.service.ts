import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { IPagination } from "@/interfaces/pagination.interface";

import { TopicEntity } from "./topic.entity";

import { CreateTopicDto } from "./dtos/create-topic.dto";
import { UpdateTopicDto } from "./dtos/update-topic.dto";

@Injectable()
export class TopicService {
  constructor(@InjectRepository(TopicEntity) private readonly topicRepository: Repository<TopicEntity>) {}

  // FIND
  async findAll() {
    return this.topicRepository.find();
  }

  async findWithCount({ page, limit }: IPagination) {
    const [topics, total] = await this.topicRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
    });

    return { data: topics, total };
  }

  async findById(id: number) {
    return this.topicRepository.findOne({ where: { id } });
  }

  // CREATE
  async create({ ...dto }: CreateTopicDto) {
    return this.topicRepository.save(this.topicRepository.create({ ...dto }));
  }

  // UPDATE
  async update({ ...dto }: UpdateTopicDto, id: number) {
    return this.topicRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.topicRepository.delete(id);
  }
}
