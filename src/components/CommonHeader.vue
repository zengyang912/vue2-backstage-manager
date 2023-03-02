<template>
  <div class="header-container">
    <div class="left-content" >
        <el-button icon="el-icon-menu" style="margin-right: 20px;" size="mini" @click="handleMenu()"></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tabList" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="right-content">
        <!-- 这里click事件不能直接绑定在item上  -->
        <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
            <img src="../assets/logo.png" alt="图片走丢了">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:"CommonHeader",
    methods: {
        handleMenu(){
            //console.log(this.$store);
            this.$store.commit('tab/COLLAPSEMENU')
        },
        handleClick(command){
            if(command=='logout'){
                //清除cookie中的token和动态路由
                Cookie.remove('token')
                Cookie.remove('menu')
                this.$message('退出成功！')
                this.$router.push('/login')
            }
        }
    },
    computed:{
        //...mapState({tabList:state=>state.tab.tabList}),
        ...mapState('tab',['tabList'])
    },
}
</script>

<style lang="less" scoped>
.header-container{
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 20px;
    .text{
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .left-content{
        display: flex;
        align-items: center;
        .el-breadcrumb__item{
            /deep/.el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color: #666;
                }
            }&:last-child{
            .el-breadcrumb__inner{
                color: #fff;
            } 
        }
        }
    }
}
</style>