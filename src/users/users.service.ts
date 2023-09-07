import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {


  findAll() {
    return `This action returns all users`;
  }

  remove(username: string) {
    return `This action removes a #${username} user`;
  }
}
