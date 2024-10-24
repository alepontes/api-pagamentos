import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.usersService.signin(signinDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
