import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RoleModule } from './role/role.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
