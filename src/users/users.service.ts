import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

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
