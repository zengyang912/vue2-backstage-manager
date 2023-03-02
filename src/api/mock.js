import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import user from './mockServerData/user'
import permission from './mockServerData/permission'
//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
//使用正则表达式解决get请求传参
Mock.mock(/api\/user\/getUser/,'get', user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)