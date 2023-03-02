import Cookie from "js-cookie"
export default{
    namespaced:true,
    state:{
        isCollapse:false,//控制菜单的展开收起
        //面包屑数据
        tabList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        menu:[],
        userinfo:{username:'',identity:''},
    },
    mutations:{
        COLLAPSEMENU(state){
            state.isCollapse=!state.isCollapse
        },
        //更新面包屑数据
        SELECTMENU(state,val){
            if(val.name!=='home'){
                const index =state.tabList.findIndex(item=>item.name===val.name)
                if(index===-1){
                    state.tabList.push(val)
                }
            }
        },
        CLOSETAG(state,item){
            //console.log(item);
            state.tabList=state.tabList.filter(val=>val.name!==item.name)
        },
        //得到用户信息
        GETUSERINFO(state,userinfo){
            state.userinfo.username=userinfo.username
            state.userinfo.identity=userinfo.identity
        },
        //设置menu数据
        MENU(state,val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))
        },
        ADD_MENU(state,router){
            if(!Cookie.get('menu'))return
            const menu =JSON.parse(Cookie.get('menu'))
            state.menu=menu
            //组装动态路由的数据
            const menuArray=[]
            menu.forEach(item => {
                //判断有没有子路由
                if(item.children){
                    item.children = item.children.map(item => { 
                        item.component = () => import(`../views/${item.url}`) 
                        return item
                })
                menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`) 
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item=>{
                router.addRoute('main',item)
            })
        }
    }
}