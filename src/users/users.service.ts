import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {


  findAll() {
    return `This action returns all users`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
