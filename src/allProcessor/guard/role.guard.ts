import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


// 此处作为角色守卫  返回true or false
// 可以对用户角色进行判断  决定是否放行

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(  context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()  //  获得请求体所有信息
    return true;
  }
}
