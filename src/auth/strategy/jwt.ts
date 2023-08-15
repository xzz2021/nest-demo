import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TEMPsecret',
    });
  }
  async validate(payload: any) {
    console.log("🚀 ~ file: jwt.ts:16 ~ JwtStrategy ~ validate ~ payload:", payload)
    return { userId: payload.sub, username: payload.username };
  }
}