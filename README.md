####  学习nest案例，预期配合react的界面, 实现完整后台管理 权限分发 角色管理

目前使用到的主要依赖:
- typeorm  
- passport 
- bcrypt 
- winston 

已更新添加的内容
 1. 全局日志系统
 2. 登录注册接口及密码hash加密, token验证,接口权限
 3. 拦截器,管道,中间件,守卫,过滤器,意外处理
 4. 已有app,userinfo,auth,users三个模块
 5. 数据库查询数据转换排除,数据库外链关联
 6. 静态文件服务
 7. swagger接口文档自动生成
 8. 接口安全: 添加请求限流


 5. 部分其他测试接口