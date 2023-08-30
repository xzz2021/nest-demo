
// 此处可以自定义设置自己的异常抛出处理器

import { HttpException, HttpStatus } from "@nestjs/common";


  export class ForbiddenException extends HttpException {  
        constructor() {  
          super('Forbidden', HttpStatus.FORBIDDEN);  
        }
      }  
    
    //   throw new ForbiddenException();