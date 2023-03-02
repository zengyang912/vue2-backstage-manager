<template>
    <div class="home-container">
      <el-row>
        <el-col :span="8" style="padding-right: 10px;">
          <el-card shadow="hover">
            <div class="user">
              <img src="../assets/logo.png" alt="">
              <div class="user-info">
                <p class="name">{{ userinfo.username }}</p>
                <p class="access">{{userinfo.identity}}</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>2023-2-25</span></p>
              <p>上次登录地点：<span>长沙</span></p>
            </div>
          </el-card>
          <el-card style="margin-top: 20px; height: 460px;" shadow="hover">
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <!-- <el-table-column
              prop="name"
              label="品牌">
            </el-table-column>
            <el-table-column
              prop="todayBuy"
              label="今日销量">
            </el-table-column>
            <el-table-column
              prop="monthBuy"
              label="本月销量">
            </el-table-column>
            <el-table-column
              prop="totalBuy"
              label="总销量">
            </el-table-column> -->
            <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"/>
          </el-table>
          </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
          <div class="num">
              <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0,}" shadow="hover">
                <!-- el组件里的样式优先级很高，设置在外面没用的 -->
              <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
              <div class="detail">
                <p class="price">￥{{ item.value }}</p>
                <p class="desc">{{ item.name }}</p>
              </div>
            </el-card>
          </div>
          <el-card style="height: 280px;" shadow="hover">
            <div ref="echart1" style="height: 280px;"></div>
          </el-card>
          <div class="graph">
            <el-card style="height: 260px;" shadow="hover">
              <div ref="echart2" style="height: 260px;"></div>
            </el-card>
            <el-card style="height: 260px;" shadow="hover">
              <div ref="echart3" style="height: 240px;"></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import { getData } from '../api/index'
  import * as echarts from 'echarts'
import { mapState } from 'vuex'
  export default {
      name:"Home",
      data(){
        return {
              tableData:[],
              tableLabel:{
                name:'品牌',
                todayBuy:'今日销量',
                monthBuy:"本月销量",
                totalBuy:"总销量"
              },
              countData: [
              {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
              },
              {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
              },
              {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
              },
              {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
              },
              {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
              },
              {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
              },
            ],
        }
      },
      mounted() {
        getData().then(({data})=>{
          const {tableData,orderData,userData,videoData}=data.data
          this.tableData=tableData

          //折线图
          // 基于准备好的dom，初始化echarts实例
          const echart1=echarts.init(this.$refs.echart1)
          //处理数据xAxis
          const {}=data.data
          const xAxis=Object.keys(orderData.data[0])
          // 指定图表的配置项和数据
          let echart1Option={
            title: {
              text: '手机销量折线图'
            },
            //悬浮气泡
            tooltip: {},
            //图例
            legend: {
              data: xAxis
            },
            xAxis:{
              data:xAxis
            },
            yAxis: {},
            //与图例相对应的图表数据
            series:[
              
            ]
          }
          xAxis.forEach(key=>{
            echart1Option.series.push({
              name:key,
              data:orderData.data.map(item=>item[key]),
              type:'line'
            })
          })
          echart1.setOption(echart1Option)

          //柱状图
          const echart2=echarts.init(this.$refs.echart2)
          const echart2Option={
                legend: {
                // 图例文字颜色
                textStyle: {
                  color: "#333",
                },
              },
                grid: {
                  left: "20%",
                },
                // 提示框
                tooltip: {
                  trigger: "axis",
                },
                xAxis: {
                  type: "category", // 类目轴
                  data: userData.map(item=>item.date),
                  axisLine: {
                    lineStyle: {
                      color: "#17b3a3",
                    },
                  },
                  axisLabel: {
                    interval: 0,
                    color: "#333",
                  },
                },
                yAxis: [
                  {
                    type: "value",
                    axisLine: {
                      lineStyle: {
                        color: "#17b3a3",
                      },
                    },
                  },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                  {
                    name:'新增用户',
                    data: userData.map(item=>item.new),
                    type:'bar'
                  },
                  {
                    name:'活跃用户',
                    data: userData.map(item=>item.active),
                    type:'bar'
                  },
                ],
          }
          echart2.setOption(echart2Option)

          //饼状图
          const echart3=echarts.init(this.$refs.echart3)
          const echart3Option={
            tooltip: {
              trigger: "item",
            },
            color: [
              "#0f78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf",
            ],
            series: [
              {
                data:videoData,
                type:'pie'
              }
            ],
          }
          echart3.setOption(echart3Option)
        })
      },
      computed:{
        ...mapState('tab',['userinfo'])
      }
  }
  </script>
  
  <style lang="less" scoped>
  .user{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info{
      .name{
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access{
        color: #999999;
      }
    }
  }
  .login-info{
    p{
      line-height: 28px;
      font-size: 14px;
      color: #999999;
    }
    span{
      color: #666666;
      margin-left: 60px;
    }
  }

  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* width: 958px;
    height: 203px; */
    .icon{
      width: 80px;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      text-align: center;
      color: #fff;
    }
    .detail{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price{
        font-size: 30px;
        height: 25px;
        line-height: 25px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      .desc{
        font-size: 14px;
        color: #999;
        height: 25px;
        line-height: 25px;
        text-align: center;
        margin-top: 0;
      }
    }
    .el-card{
      width: 32%;
      margin-bottom: 20px;
      height: 80px;
      line-height: 80px;
    }
  }
  .graph{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-card{
      width: 48%;
    }
  }
  </style>