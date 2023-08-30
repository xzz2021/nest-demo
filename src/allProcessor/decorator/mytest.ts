import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/allProcessor/interceptor/serialize';

//  当调用的装饰器比较复杂时, 可以在这里包裹 自定义 diy名字  方便使用

// 然后可以 直接以  自己命名的 函数名 进行装饰使用

interface ClassConstructor {
    new (...args: any[]): any
}
export function MySerialize(dto: ClassConstructor){

    return UseInterceptors(new SerializeInterceptor(dto))
}
