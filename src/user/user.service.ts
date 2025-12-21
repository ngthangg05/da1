import { BadRequestException, Injectable } from '@nestjs/common';
import { UserTokenInfo } from './interface/customer.interface';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/common/constant';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createCustomer(
    username: string,
    password: string,
  ): Promise<number | null> {
    const isExistCustomer =
      await this.userRepository.getUserByUsername(username);
    if (isExistCustomer) {
      throw new BadRequestException('Username already exists');
    }
    // Hash password by bcrypt algorithm with salt rounds = 10
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userRepository.createCustomer(
      username,
      passwordHash,
      Role.CUSTOMER,
    );
  }

  private async validatePassword(password: string, passwordHash: string) {
    const ok = await bcrypt.compare(password, passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Wrong password');
    }
  }

  private async generateToken(userInfo: UserTokenInfo) {
    const payload = {
      id: userInfo.id,
      username: userInfo.username,
      role: userInfo.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string, role: Role } | null> {
    const user = await this.userRepository.getUserByUsername(username);
    if (user) {
      await this.validatePassword(password, user.passwordHash);
      return {
        role: user.role,
        ...(await this.generateToken(user))
      };
    }
    return null;
  }
}
