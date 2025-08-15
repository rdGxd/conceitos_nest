import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { HashingServiceProtocol } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async login(loginDto: LoginDto) {
    let passwordIsValid = false;
    let throwError = true;

    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      );
    }

    if (passwordIsValid) {
      throwError = false;
    }

    if (throwError) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // TODO: Fazer o novo token e entregar para o usuário na resposta
    return {
      message: 'Login successful',
    };
  }
}
