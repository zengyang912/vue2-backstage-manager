<template>
  <div>
    <el-card id="loginBox">
       <el-form ref="form" class="login-container" :model="form" :rules="rules" :inline="true">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit()">登录</el-button>
            </el-form-item>
        </el-form> 
    </el-card>
   
  </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name:"Login",
    data(){
        return {
            form:{
                    username:'',
                    password:''
            },
            rules:{
                    username:[{required:true,trigger:'blur',message:'请输入用户名'}],
                    password:[{required:true,trigger:'blur',message:'请输入密码'}]
            }
        }
    },
    methods: {
        submit(){
            //token信息
            // const token =Mock.Random.guid()
            // Cookie.set('token',token)
            //跳转页面
            //表单校验
            this.$refs.form.validate((valid)=>{
                if(valid){
                   getMenu(this.form).then(({data})=>{
                   console.log(data);
                        if(data.code===20000){
                            Cookie.set('token',data.data.token)
                            this.$message(data.data.message)
                            //获取用户名
                            this.$store.commit('tab/GETUSERINFO',data.userinfo)
                            //获取菜单数据，存入store中
                            this.$store.commit('tab/MENU',data.data.menu) 
                            //将路由数据，存入store
                            this.$store.commit('tab/ADD_MENU',this.$router) 
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message)
                        }
                   }) 
                }
            })
            

            
        }
    },
}
</script>

<style lang="less" scoped>
#loginBox{
    width: 350px;
    margin: 180px auto;
    border-radius: 15px;
    .login-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .el-button{
        margin-left: 10px;
    }
}

</style>