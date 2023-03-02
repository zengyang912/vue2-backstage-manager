<template>
    <div> 
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <h3>{{isCollapse ? '后台':'通用后台管理系统'}}</h3>
            <!-- <h3 v-show="isCollapse">后台</h3>
            <h3 v-show="!isCollapse">通用后台管理系统</h3> -->
            <el-menu-item :index="item.name" v-for="item in noChidren" :key="item.name" @click="clickMenu(item)">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu :index="item.label" v-for="item in hasChidren" :key="item.label" @click="clickMenu(item)">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.path"  >   
                    <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>    
                </el-menu-item-group>
            </el-submenu>
        </el-menu>  
    </div>
    
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Cookie from "js-cookie"
export default {
    name: "CommonAside",
    data() {
        return {
            //isCollapse: false,//设置默认展开侧边栏菜单
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item){
            this.$router.push(item.path)
            this.$store.commit('tab/SELECTMENU',item)
        }
    },
    computed:{
        noChidren(){
            return this.menuData.filter(item=>!item.children)
        },
        hasChidren(){
            return this.menuData.filter(item=>item.children)
        },
        /* isCollapse(){
            return this.$store.state.tab.isCollapse
        } */
        //借助mapState生成计算属性，从state中读取数据
        ...mapState('tab',['isCollapse']),
        menuData(){
            //只写cookie依然可以
            return JSON.parse(Cookie.get('menu'))||this.$store.state.tab.menu
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu{
    height: 912px;
    border: none;
}
h3{
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 48px;
    font-weight: 400;
    height: 48px;
}

</style>

