
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


//  定义两个passport的守卫类型
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
