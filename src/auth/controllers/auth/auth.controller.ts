import { Controller, Post, UseGuards, Get, Session, Req } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
    });
  }

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    session.authenticated = true;
    return session;
  }
}
