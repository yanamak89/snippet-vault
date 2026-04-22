import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetsDto } from './dto/query-snippets.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetsService } from './snippets.service';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() CreateSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(CreateSnippetDto);
  } 

  @Get()
  findAll(@Query() queryDto: QuerySnippetsDto){
    return this.snippetsService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateSnippetDto: UpdateSnippetDto){
    return this.snippetsService.update(id, UpdateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.snippetsService.remove(id);
  }
}