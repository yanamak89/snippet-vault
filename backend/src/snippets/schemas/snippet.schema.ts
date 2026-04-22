import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, HydratedDocumentFromSchema } from 'mongoose';
import { SnippetType } from '../enums/snippet-type.enum';


export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true, versionKey: false})
export class Snippet {
  @Prop({
    required: true,
    trim: true,
    minlength:1,
    maxLength:120,
  })
  title!: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 5000,
  })
  content!: string;

  @Prop({
    type: [String],
    default: [],
    index: true,
  })
  tags!: string[];

  @Prop({
    required: true,
    enum: Object.values(SnippetType),
  })
  type!: SnippetType;

  createdAt!: Date;
  updatedAt!: Date;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

SnippetSchema.index({ title: 'text', content: 'text' });