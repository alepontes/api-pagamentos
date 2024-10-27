import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateTransferDto {
  @IsNotEmpty()
  @IsNumber()
  fromId: number;

  @IsNotEmpty()
  @IsNumber()
  toId: number;

  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
