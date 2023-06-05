import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export default class MinNumberPipe implements PipeTransform<number> {
  constructor(private readonly minValue: number) {}
  transform(value: number, metadata: ArgumentMetadata) {
    if (value < this.minValue)
      throw new BadRequestException(`Should not be less than ${this.minValue}`);
    return value;
  }
}
