import { Controller, Get, Post, Put, Delete, Body, Query, Param, ParseIntPipe, BadRequestException } from "@nestjs/common";

import { IPagination } from "@/interfaces/pagination.interface";

import { TopicService } from "./topic.service";

import { CreateTopicDto } from "./dtos/create-topic.dto";
import { UpdateTopicDto } from "./dtos/update-topic.dto";

@Controller("topic")
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  // GET
  @Get("get-all")
  async getAll() {
    return this.topicService.findAll();
  }

  @Get("get-with-count")
  async getWithCount(@Query() { page, limit }: IPagination) {
    return this.topicService.findWithCount({ page, limit });
  }

  @Get("get-by-id/:id")
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.topicService.findById(id);
  }

  // POST
  // @UseGuards(JwtGuard)
  @Post("create")
  async create(@Body() dto: CreateTopicDto) {
    return this.topicService.create(dto);
  }

  // PUT
  // @UseGuards(JwtGuard)
  @Put("update/:id")
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateTopicDto) {
    const topic = await this.topicService.findById(id);
    if (!topic) throw new BadRequestException("not found");

    return this.topicService.update(dto, id);
  }

  // DELETE
  // @UseGuards(JwtGuard)
  @Delete("delete/:id")
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const topic = await this.topicService.findById(id);
    if (!topic) throw new BadRequestException("not found");

    return this.topicService.delete(id);
  }
}
