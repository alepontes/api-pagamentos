import { IsDateString, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsDateString()
  birthdate: string;
}
