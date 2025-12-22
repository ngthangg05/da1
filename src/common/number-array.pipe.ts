import { ParseArrayPipe } from '@nestjs/common';

export const NumberArrayPipe = new ParseArrayPipe({
  items: Number,
  separator: ',',
  optional: true,
});
