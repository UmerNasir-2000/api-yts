import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export default class PaginationRequestDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty({ message: 'Page is a required field' })
  page: number;

  @IsInt()
  @Min(10)
  @Max(50)
  @IsNotEmpty()
  offset: number;
}
