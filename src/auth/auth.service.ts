import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Users } from  './entities/users-entity.js';

@Injectable()
export class AuthService {

    private users: Users[] = []
    //regist
    register(registerDto: RegisterDto): Users {
        const newUser: Users = {
            id: this.users.length + 1,
            username: registerDto.username,
            email: registerDto.email,
            password: registerDto.password
        }
        this.users.push(newUser);
        return newUser;
    }

    //login
    login(loginDto: LoginDto): string {
        const user = this.users.find(
            user => 
                user.email === loginDto.email && 
            user.password === loginDto.password
        );
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return 'User berhasil login';
    }

    //forgot-pass
    forgotPassword(){
        return 'Link password berhasil dikirimkan';
    }

    //pass-recovery
    passwordRecovery(){
        return 'Password recovery successful';

    }
}


