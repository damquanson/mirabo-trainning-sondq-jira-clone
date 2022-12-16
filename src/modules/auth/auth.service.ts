import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDetails } from '../user/dto/login';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneName(email);

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateUserGoogle(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userRepository.findOneBy({ email: details.email });
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating...');
    details['name'] = details.displayName;
    delete details.displayName;
    details['password'] = 'randompassword';
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
