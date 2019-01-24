<template>
    <div class="layout">
        <LayoutHeader></LayoutHeader>
        <div class="content">
            <div class="left">
                <ul>
                    <li><router-link to="/tutor/stuSubmitTask">学员提交</router-link></li>
                    <li><router-link to="/tutor/tutorPubTask">发布新任务</router-link></li>
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
  name: 'student',
  data () {
    return {
        
    }
 }
}
</script>
<style scoped lang="less">
.layout{
    width: 960px;
    margin: 0 auto;
}
ul{
    margin-top: 100px;
}
li{
    list-style: none;
}
</style>