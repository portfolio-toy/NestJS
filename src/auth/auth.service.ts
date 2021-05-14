import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
    ){}

    signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.UserRepository.signup(authCredentialDto);
    }

    signIn(authCredentialDto: AuthCredentialDto) {
        const result = this.UserRepository.validateUserPassword(authCredentialDto);
        console.log(result);
    }
}
