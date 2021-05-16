import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private JwtService: JwtService
    ){}

    signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.UserRepository.signup(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto) : Promise<{accessToken : string}> {
        const username = await this.UserRepository.validateUserPassword(authCredentialDto);
        
        if(!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload  = { username };
        const accessToken = await this.JwtService.sign(payload);

        return { accessToken };
    }
}
