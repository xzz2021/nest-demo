
//定义表格，表的名称会以class小写命名

//若已有项目数据库，，反向生成模型代码，可以使用三方库typeorm-model-generator


//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn, VersionColumn } from 'typeorm'
import { Profile } from './entities/profile.entity';
import { Exclude } from 'class-transformer';
import { Roles } from '../roles/roles.entity';

//   如果想在单个数据源中使用多个数据库 ,,  直接指定数据库的命名
//   @Entity({database: 'secondDatabaseName'})
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique: true })  // 设定当前键为唯一值
    username: string;

    @Column()
    @Exclude()  // 转换数据, 排除此字段  //  结合@UseInterceptors(ClassSerializerInterceptor) 使用
    password: string;

    @CreateDateColumn()  //创建时自动插入日期时间
    createtime: string;

    @UpdateDateColumn()
    updatetime: string;

    @DeleteDateColumn()
    deletetime: string;

    // @Column(() => Name)  引入  嵌入的实体   便于 抽离公共公用column
    // name: Name   // 生成的列名是   'name' + Name.a ................

    // @VersionColumn()   //每次调用实体时 自动设置版本增量

    //ontoone 只需要在被关联的副表声明即可
    //oneToOne 定义的位置 会在当前表格生成关联字段

   //  第一个参数是关联的类， 也即被关联的表格名
   //  cascade 代表可以直接对关联表单进行操作
    @OneToOne(() => Profile, { cascade: true})   //关联表单，需要在关联的两张表的entity里都声明OneToOne， 实现映射
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者   会生成profileId作为关联列
    profile: Profile;  

    //  定义了关联表后, 可以再重复定义,这样在查询时会顺带返回当前项关联表所在的id
    // @Column({nullable: true})
    // profiledId: number;

    // 第二个参数  创建双向关系

    @ManyToMany(() => Roles, role => role.name, { cascade: true})  //如果设置 eagger: true 查询时会自动加载关联表信息  不需要配置relations
    @JoinTable()  // 因为是多对多   这里是要关联整张表格
    userrole: Relation<Roles[]>;  // ESM中   双向关系   定义relation 避免循环依赖
}