import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import { UserPayload } from "src/auth/models/UserPayload";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "src/auth/models/UserToken";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        return {
          ...user,
          password: undefined
        };
      }
    }
    throw new Error("Credenciais fornecidas incorretamente");
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      name: user.name,
      email: user.email,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
