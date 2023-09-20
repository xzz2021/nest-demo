
// 此处作为角色守卫  返回true or false
// 可以对用户角色进行判断  决定是否放行

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/roles/roles.enum';
import { ROLES_KEY } from '../decorator/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // getAllAndOverride   读取路由的metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // const aaa = context.switchToHttp().getRequest();
    // console.log("🚀 ~ file: role.guard.ts:25 ~ RolesGuard ~ canActivate ~ aaa:", aaa)
    const { user } = context.switchToHttp().getRequest();
    // console.log("🚀 ~ file: role.guard.ts:25 ~ RolesGuard ~ canActivate ~ user:", user)
    //  rawHeaders['Authorization'] 
    let userRole = user.role.map(item => item.name)
    return requiredRoles.some((role) => userRole.includes(role));
    // return true;
  }
}