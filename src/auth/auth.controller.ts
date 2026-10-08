import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthService } from './auth.service.js';

// -/auth/register: Post
// -/auth/login: Post
// -/auth/forgot-password: Post
// -/auth/password-recovery: Patch

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }   

    @Post('forgot-password')
    forgotPassword() {
        return 'Link password berhasil dikirimkan';
    }

    @Post('password-recovery')
    passwordRecovery() {
        return 'Password recovery successful';
    }
}
