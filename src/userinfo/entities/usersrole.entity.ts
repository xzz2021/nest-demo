
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Users } from './users.entity';


@Entity()
export class UsersRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleid: number;

    @ManyToOne(() => Users)   // 关联表单   联合查询可以使用querybuilder进行筛选条件查询
    @JoinColumn()
    user: Users;

    
    

}
