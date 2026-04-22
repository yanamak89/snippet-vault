import {
  ArrayMaxSize,
  ArrayUnique, 
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { SnippetType } from '../enums/snippet-type.enum';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true})
  @ArrayUnique()
  @ArrayMaxSize(20)
  @MaxLength(30, {each: true})
  tags?: string[];

  @IsEnum(SnippetType)
  type!: SnippetType;

} 
