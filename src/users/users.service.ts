import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class UsersService {
  signup(signupDto: SignupDto) {
    return signupDto;
  }

  signin(signinDto: SigninDto) {
    return signinDto;
  }

  findAll() {
    return `This action returns all users`;
  }
}
