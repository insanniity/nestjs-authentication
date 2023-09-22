import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from "src/user/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });
    delete createdUser.password;
    return createdUser;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    delete user.password;
    return user;
  }

  async update(id: number, _updateUserDto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      ..._updateUserDto,
      password: await bcrypt.hash(_updateUserDto.password, 10),
    };

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    // delete deletedUser.password;
    // return deletedUser;
  }
}
