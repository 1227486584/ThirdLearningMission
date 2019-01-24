<template>
    <div class="header">
        <div class="headerInner">欢迎您：<b>{{userName}}</b> {{identity}} | <span @click="logout">安全退出</span></div>
    </div>
</template>
<script>
export default {
  name: 'LayoutHeader',
  computed:{
      userName(){
          return this.$store.state.userName
      },
      identity(){
          return this.$store.state.identity
      }
  },
//   data () {
//     return {

//     }
//  }
    methods:{
        logout(){
              console.log(this.$router);
            this.axios.get('/logout')
            .then(res => {
                this.$store.commit('logOut')  
                this.$router.replace({
                path: '/'
                })            
            })
            .catch(err => {
                this.$Message.error(err);
            });  
        }
    }
}
</script>
<style scoped lang="less">
.header{
    position: relative;
    width:960px;
    height: 100px;
    background-image: url('../../static/img/logo.png');
    .headerInner{
        position: absolute;
        right:30px;
        top:10px;
        span{
            cursor: pointer;
            color:#5d94d8;
        }
    }
}
</style>