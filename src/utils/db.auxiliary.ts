//  这里定义封装 一些 数据库 查询 辅助 函数 类
//  或者其他抽离出来的 业务处理函数
import { SelectQueryBuilder } from "typeorm";



//  此函数用来对andwhere联合查询字段缺失bug 进行 排除 封装处理
//  利用queryBuilder的链式调用

export const confitionUtils = <T> (
    queryBuilder: SelectQueryBuilder<T>,
    obj: Record<string, unknown>
    ) => {
        Object.keys(obj).forEach(key => {
            if(obj[key]) {
                queryBuilder.andWhere(`${key} = :${key}`, { [key]:  obj[key]});
            }
        return queryBuilder
        })
}
