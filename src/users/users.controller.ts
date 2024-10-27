import { Controller, Get, Post, Body, UseGuards, HttpCode } from "@nestjs/common";
import { UsersService } from './users.service';
import { SignInDto } from './dto/signInDto';
import { SignUpDto } from './dto/signUpDto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(201)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.usersService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }
}
