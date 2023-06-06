import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export default class MaxNumberPipe implements PipeTransform<number> {
  constructor(private readonly maxValue: number) {}
  transform(value: number, metadata: ArgumentMetadata) {
    if (value > this.maxValue)
      throw new BadRequestException(
        `Should not be greater than ${this.maxValue}`,
      );
    return value;
  }
}
