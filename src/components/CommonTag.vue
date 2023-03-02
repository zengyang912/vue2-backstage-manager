<template>
  <div class="tag">
    <el-tag 
    @click="handleClickTag(item)"
    @close="handleCloseTag(item,index)"
    v-for="(item,index) in tabList"
    :key="item.path"
    :closable="item.name !=='home'"
    :effect="$route.name===item.name ? 'dark':'plain'"
    size="small">
    {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name:"CommonTag",
    computed:{
        ...mapState('tab',['tabList']),
        
    },
    methods: {
        ...mapMutations('tab',['CLOSETAG']),

        handleClickTag(item){
            this.$router.push(item.path)
        },

        handleCloseTag(item,index){
            //调用store中的mutation
            this.CLOSETAG(item)
            const length=this.tabList.length
            //跳转后的删除逻辑
            if(item.name!==this.$route.name){
                return
            }
            if(index===length){
                this.$router.push(this.tabList[index-1].path)
            }else{
                this.$router.push(this.tabList[index].path)
            }
        }
    },
}
</script>

<style lang="less" scoped>
.tag{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>