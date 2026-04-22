import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, isValidObjectId, Model } from 'mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { QuerySnippetsDto } from './dto/query-snippets.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto) {
    const payload = {
      ...createSnippetDto,
      title: createSnippetDto.title.trim(),
      content: createSnippetDto.content.trim(),
      tags: this.normalizeTags(createSnippetDto.tags ?? []),
    };

    return this.snippetModel.create(payload);
  }

  async findAll(queryDto: QuerySnippetsDto) {
    const { page = 1, limit = 10, q, tag } = queryDto;

    const filter: FilterQuery<SnippetDocument> = {};

    if (q?.trim()) {
      filter.$text = { $search: q.trim() };
    }

    if (tag?.trim()) {
      filter.tags = tag.trim().toLowerCase();
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.snippetModel
        .find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.snippetModel.countDocuments(filter),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    this.validateObjectId(id);

    const snippet = await this.snippetModel.findById(id).lean();

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto) {
    this.validateObjectId(id);

    const updatePayload: Partial<UpdateSnippetDto> = {
      ...updateSnippetDto,
    };

    if (typeof updateSnippetDto.title === 'string') {
      updatePayload.title = updateSnippetDto.title.trim();
    }

    if (typeof updateSnippetDto.content === 'string') {
      updatePayload.content = updateSnippetDto.content.trim();
    }

    if (updateSnippetDto.tags) {
      updatePayload.tags = this.normalizeTags(updateSnippetDto.tags);
    }

    const updated = await this.snippetModel
      .findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
      })
      .lean();

    if (!updated) {
      throw new NotFoundException('Snippet not found');
    }

    return updated;
  }

  async remove(id: string) {
    this.validateObjectId(id);

    const deleted = await this.snippetModel.findByIdAndDelete(id).lean();

    if (!deleted) {
      throw new NotFoundException('Snippet not found');
    }

    return { message: 'Snippet deleted successfully' };
  }

  private validateObjectId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid snippet id');
    }
  }

  private normalizeTags(tags: string[]): string[] {
    return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
  }
}