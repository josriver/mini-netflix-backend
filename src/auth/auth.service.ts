import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear el nuevo usuario
    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      role: 'user', // Rol por defecto
    });

    await this.userRepository.save(user);

    // Retornar sin la contraseña
    const { password, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    // Buscar el usuario
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar el token JWT
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}