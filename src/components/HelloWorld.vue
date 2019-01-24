<template>
  <div id="page">
    <div id="header">
      <div class="login">
          <router-link to="login">登录</router-link><i class="iconfont icon-denglu"></i>
      </div>
    </div>
    <div id="nav">
        <Menu mode="horizontal" :theme="theme1">
        <MenuItem name="1">
            关于远传
        </MenuItem>
        <MenuItem name="2">
            智远计划
        </MenuItem>
        <MenuItem name="3">
            导师团队
        </MenuItem>
        <!-- <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup> -->
        <!-- </Submenu> -->
        <MenuItem name="4">
           联系我们
        </MenuItem>
    </Menu>
    </div>
     <div id="content">
          <Carousel
              v-model="value"
              :autoplay="setting.autoplay"
              :height="setting.height"
              :dots='setting.dots'
              :radiusDot='setting.radiusDot'
              :arrow='setting.arrow'
              >
              <CarouselItem v-for="item in CarouselItems" :key="item.id">
                  <div><img :src="item.url" /></div>
              </CarouselItem>
          </Carousel>
         
          <Tabs type="card" :animated="false">
              <TabPane label="最新消息">最新消息的内容</TabPane>
              <TabPane label="学员风采">展示学员风采</TabPane>
          </Tabs>
     </div>
     <div id="footer">
         <p>@2019-2020 浙江远传信息技术股份有限公司 版权所有</p>
     </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      //nav数据
        theme1: 'light',
      // Carousel相关数据开始
        value: 0,
        setting: {
            autoplay: true,
            height:300,
             // autoplaySpeed: 2000,
             dots: 'outside',
             radiusDot: true,
             // trigger: 'click',
             arrow: 'hover'
        },
        CarouselItems:[
          {url:require('../../static/img/1.jpg'),title:''},
          {url:require('../../static/img/2.jpg'),title:''},
          {url:require('../../static/img/3.jpg'),title:''},
          {url:require('../../static/img/4.jpg'),title:''},
          {url:require('../../static/img/5.jpg'),title:''},
        ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#content{
  width:1080px;
  margin:0 auto;
  img{
     
     max-width: 100%;
    //  max-height: 100%;
  }
}
#header{
  height:100px;
  background-image:url('../../static/img/logo.png');
  background-repeat: no-repeat;
  background-position: left top;
  position:relative;
}
.login{
  position: absolute;
  left:900px;
  top:50px;
  height:100px;
  font-size: 18px;
  i{
    font-size:30px;
  }
}
#footer{
  height: 50px;
  line-height: 50px;
  background-color:#ccc;
  text-align: center
}
</style>
<style>
#page{
    width:100%;
}
    #nav{
        width:1080px;
        margin:0 auto;
    }
</style>
