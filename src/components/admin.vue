<template>
    <div class="layout">
        <LayoutHeader></LayoutHeader>
        <div class="content">
            <div class="left">
                <ul>
                    <li><router-link to="/admin/adminNewTask">发布新任务</router-link></li>
                    <li><router-link to="/admin/adminManage">学员管理</router-link></li>
                </ul>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'admin',
  data () {
    return {
        
    }
 },
 methods:{
   
 }
}
</script>
<style scoped lang="less">
.layout{
    width: 960px;
    margin: 0 auto;
}
</style>