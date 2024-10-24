import { IsDateString, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsDateString()
  birthdate: string;
}
