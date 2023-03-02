import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Goods from '../views/Goods'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
import Cookie from 'js-cookie'

//解决路由菜单重复点击
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new  VueRouter({
    router:true,
    routes:[
        //主路由
        {
            path:'/',
            component:Main,
            redirect:'/home',
            meta:{title:'主页'},
            name:'main',
            //子路由
            //子路由推荐不带'/' 不带'/'时，相对路径（不带‘/’）会拼接父级路由，绝对路径（带‘/’）是配置的完整路由，
            children:[
                /* {
                    path:'home',
                    component:Home,
                    name:'home',
                    meta:{isAuth:true,title:'主页'}
                },
                {
                    path:'user',
                    component:User,
                    name:'user',
                    meta:{isAuth:true,title:'用户管理'}
                },
                {
                    path:'goods',
                    component:Goods,
                    name:'goods',
                    meta:{isAuth:true,title:'商品管理'}
                },
                {
                    path:'page1',
                    component:PageOne,
                    name:'page1',
                    meta:{isAuth:true,title:'页面1'}
                },
                {
                    path:'page2',
                    component:PageTwo,
                    name:'page2',
                    meta:{isAuth:true,title:'页面2'}
                }, */
            ]
        },
        {
            path:'/login',
            component:Login,
            name:'login',
            meta:{isAuth:true,title:'登录'}
        }
        
    ]
})

router.beforeEach((to,from,next)=>{
    //获取token
    const token=Cookie.get('token')
    if(to.meta.isAuth){//判断是否需要鉴权
        //token不存在，说明当前用户是未登录，应该跳转至登录页
        if(!token&&to.name!=='login'){
            next({name:'login'})
        } else if(token&&to.name==='login'){
            next({name:from.name})
        }else{
            next()
        }
    }else{
        next()
    } 
})

//全局后置路由守卫-初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to,from)=>{
    document.title=to.meta.title||'MyWebSite'
})

export default router