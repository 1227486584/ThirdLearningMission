<template>
<div class='body'>
    <div class="login">
            <div class="loginIn">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">   
                <FormItem label="用户名：" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"/>
                </FormItem>
                <FormItem label="密码：" prop="pwd">
                    <Input v-model="formValidate.pwd" placeholder="Enter your password"/>
                </FormItem>
                <FormItem prop="type">
                    <RadioGroup v-model="formValidate.type">
                        <Radio label="学员" ></Radio>
                        <Radio label="导师"></Radio>
                        <Radio label="管理员"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="Submit('formValidate')">登录</Button>
                    <Button type="default" @click="Reset('formValidate')" style="margin-left:10px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
             formValidate: {
                    name: '付青青',
                    pwd:'11111',
                    type:'学员',
                },
            ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                     pwd: [
                        { required: true, message: 'The password cannot be empty', trigger: 'blur' }
                    ],
                },

        }
    },
  methods:{
     Submit(){
        this.axios.get('/login',{
            params: this.formValidate
        })
        .then(res => {
                this.$store.commit('setName',this.formValidate.name)
                this.$store.commit('setIdentity',this.formValidate.type)
                 this.$store.commit('setToken',res.data.resJson.token)
                if(res.data.resJson.type == '学员'){
                    this.$router.replace({path: '/student'}) 
                }else if(res.data.resJson.type == '导师'){
                     this.$router.replace({path: '/tutor'})
                }else{
                   this.$router.replace({path: '/admin'})
                }
        })
        .catch(err => {
            alert(err);
            this.$Message.error(err);
        });  
     },
     Reset(){
         this.formValidate.name='';
         this.formValidate.pwd='';
     },
  }
}
</script>
<style scoped lang="less">
.body{
    width:100%;
    background: -webkit-linear-gradient(to bottom,#cad7ec 5%, #fff 95%); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(to bottom, #cad7ec 5%, #fff 95%); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to bottom, #cad7ec 5%, #fff 95%); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom, #cad7ec 5%, #fff 95%); /* 标准的语法 */
}
.login{
    position: relative;
    width:960px;
    margin:0 auto;
    height:400px; 
    background-image: url('../../static/img/login.png');
    .loginIn{
        position: absolute;
        left:467px;
        top:108px;
        width:420px;
        height:270px;
        // background-color: #ccc;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .ivu-form{
            position: relative;
            top:17px
        }
    }
}

</style>
