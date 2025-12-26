import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Mini-Netflix API esta activo!!';
  }
}
