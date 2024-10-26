import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto } from './dto/signInDto';
import { SignUpDto } from './dto/signUpDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
