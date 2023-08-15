
// pipe管道函数
// 其实用  dto  类型校验也是一样的   接收到数据交给路由处理前的函数，   主要用于传递数据，校验数据, 转换数据  
// 可以直接在@Body()里注入使用



  import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';  

  @Injectable()  
  export class ValidationPipe implements PipeTransform {  
        transform(value: any, metadata: ArgumentMetadata) {  
          return value;   
        }  
  }  


    // metadata  的数据结构-------如果在注入pipe函数的上层函数没有使用ts，或者没有定义类型，那么metatype就会是undefined

//   export interface ArgumentMetadata {  
//         type: 'body' | 'query' | 'param' | 'custom';  
//         metatype?: Type<unknown>;  
//         data?: string;  
//   }  