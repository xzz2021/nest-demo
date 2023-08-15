import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local';
import { JwtStrategy } from './strategy/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/users.entity';

@Module({
  imports: [ 
    // UserinfoModule, 
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: 'TEMPsecret',
      signOptions: { expiresIn: '120s' }
    })
  ], //
  providers: [AuthService , LocalStrategy, JwtStrategy],
  exports: [ AuthService ]
})
export class AuthModule {}
