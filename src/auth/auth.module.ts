import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local';
import { JwtStrategy } from './strategy/jwt';
import { AuthController } from './auth.controller';
import { UserinfoModule } from 'src/userinfo/userinfo.module';

@Module({
  imports: [ 
    UserinfoModule, 
    PassportModule,
    JwtModule.register({
      secret: 'TEMPsecret',
      signOptions: { expiresIn: '120s' }
    })
  ], //
  providers: [AuthService, LocalStrategy, JwtStrategy],
  // exports: [ AuthService ],
  controllers: [AuthController]
})
export class AuthModule {}
