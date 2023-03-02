import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        userinfo:{username:username,identity:'超级管理员'},
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue',
              meta:{isAuth:true,title:'主页'}
            },
            {
              path: '/goods',
              name: 'goods',
              label: '商品管理',
              icon: 'video-play',
              url: 'Goods.vue',
              meta:{isAuth:true,title:'商品管理'}
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User.vue',
              meta:{isAuth:true,title:'用户管理'}
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'PageOne.vue',
                  meta:{isAuth:true,title:'页面1'}
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'PageTwo.vue',
                  meta:{isAuth:true,title:'页面2'}
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '登录成功！'
        }
      }
    } else if (username === 'user' && password === 'user') {
      return {
        userinfo:{username:username,identity:'普通用户'},
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/goods',
              name: 'goods',
              label: '商品管理',
              icon: 'video-play',
              url: 'Goods.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '登录成功！'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误！'
        }
      }
    }

  }
}