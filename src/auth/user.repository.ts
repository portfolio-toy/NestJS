import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'; 
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialDto: AuthCredentialDto): Promise<void>{
    const { username, password } = authCredentialDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hasingPassword(password, user.salt);
     
    try {
      await user.save();
    } catch (error) {
      if(error.code == 23505) { // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    
  }

  async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;

    const user = await this.findOne({username});

    if(user && await user.validatePassword(password)) {
      return user.username;
    } 
    return null;
    
  }
  private async hasingPassword(password: string, salt: string) : Promise<string> {
    return bcrypt.hash(password,salt);
  }
}