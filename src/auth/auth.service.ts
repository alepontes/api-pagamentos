import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { SignUpDto } from '../users/dto/signUpDto';
// import * as bcrypt from 'bcrypt';
// import { SignInDto } from '../users/dto/signInDto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../users/entities/user.entity';
// import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
//
// const salts = 10;

@Injectable()
export class AuthService {
  // constructor(
  //   // @InjectRepository(User)
  //   // private readonly repository: Repository<User>,
  //   private usersService: UsersService,
  //   private jwtService: JwtService,
  // ) {}
  //
  // async signUp(signUpDto: SignUpDto) {
  //   const hashPass = await bcrypt.hash(signUpDto.password, salts);
  //
  //   return this.usersService.create({
  //     ...signUpDto,
  //     password: hashPass,
  //   });
  // }
  //
  // async signIn(signInDto: SignInDto) {
  //   const user = await this.usersService.findByUsername(signInDto.username);
  //
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const isValid = await bcrypt.compare(signInDto.password, user.password);
  //   if (!isValid) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   const token = this.jwtService.sign({
  //     sub: user.id,
  //     username: user.username,
  //   });
  //
  //   const decodedToken = this.jwtService.decode(token) as { exp: number };
  //   const expiresIn = new Date(decodedToken.exp * 1000);
  //
  //   return {
  //     token,
  //     expiresIn,
  //   };
  // }
}
