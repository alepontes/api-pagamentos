import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransfersService {
  constructor(private readonly userService: UsersService) {}

  async create(createTransferDto: CreateTransferDto) {
    const amount: number = +createTransferDto.amount;

    if (createTransferDto.toId === createTransferDto.fromId) {
      throw new BadRequestException('Erro ao realizar transferência');
    }

    const [toUser, fromUser] = await Promise.all([
      this.userService.getById(createTransferDto.toId),
      this.userService.getById(createTransferDto.fromId),
    ]);

    if (!toUser || !fromUser) {
      throw new NotFoundException(`Usuário não encontrados`);
    }

    if (!fromUser.haveBalance(amount)) {
      throw new BadRequestException('Saldo Insuficiente');
    }

    // @todo transaction
    this.userService.deposit(toUser, amount);
    this.userService.withdraw(fromUser, amount);
  }
}
