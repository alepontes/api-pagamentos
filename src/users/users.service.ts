import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signUpDto';
import { SignInDto } from './dto/signInDto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const salts = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hashPass = await bcrypt.hash(signUpDto.password, salts);

    const user = this.repository.create({
      ...signUpDto,
      password: hashPass,
    });

    return this.repository.save(user);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.repository.findOne({
      where: { username: signInDto.username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(signInDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });

    const decodedToken = this.jwtService.decode(token) as { exp: number };
    const expiresIn = new Date(decodedToken.exp * 1000);

    return {
      token,
      expiresIn,
    };
  }

  findAll() {
    return this.repository.find();
  }
}
