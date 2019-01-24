<template>
    <div>
        <Form ref="addTaskForm" :model="addTaskForm" :rules="addFormRule" :label-width="80">   
                <FormItem label="任务标题：" prop="taskName">
                    <Input v-model="addTaskForm.taskName" placeholder="Enter your name"/>
                </FormItem>
                <FormItem label="任务内容：" prop="taskContent">
                    <Input v-model="addTaskForm.taskContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
                </FormItem >
                <FormItem label="发布给：" prop="stuId">
                    <Select v-model="addTaskForm.stu" multiple >
                        <Option v-for="item in students" :value="item.studentId" :key="item.studentId">{{ item.studentName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="任务截止时间：" prop="taskDeadLine">
                    <DatePicker type="date" v-model="addTaskForm.taskDeadLine"></DatePicker>
                </FormItem >
                <FormItem>
                    <Button type="primary" @click="Public">发布</Button>
                    <Button type="default" @click="Cancel" >取消</Button>
                </FormItem>
            </Form>
    </div>
</template>
<script>
export default {
  name: 'tutorPubTask',
  data () {
    return {
      addTaskForm:{
          taskName:'',
          taskContent:'',
        //   stu:[],
          taskDeadline:''
      },
      students:[],
      addFormRule:{
        taskName: [
          {
            required: true,
            message: "请填写任务标题",
            trigger: "blur"
          },
        ],
        taskContent:[
            {
            required: true,
            message: "请填写任务内容",
            trigger: "blur"
          },
        ],
        taskDeadLine:[
            {
            required: true,
            message: "请选择任务截止日期",
            trigger: "blur"
          },
        ]
      }
    }
 },
 mounted(){
    this.addTaskToStu();
  },
 methods:{
    addTaskToStu(){
         this.axios.get('/getTeaStu')
            .then(res => {
                console.log(res.data.resJson);
                for(var i=0;i<res.data.resJson.length;i++){
                    var obj={}
                    obj.studentId=res.data.resJson[i].studentId;
                    obj.studentName=res.data.resJson[i].studentName;
                    this.students.push(obj)
                }
            })
            .catch(err => {
                alert(err);
            this.$Message.error(err);
            });  
    },
    Public(){
        this.axios.get('/addTask', {
                params: this.addTaskForm
            })
            .then(res => {
                        if(res.resJson == '学员'){
                          window.location.href=window.location.href.replace('login', "student")
                        }else if(res.resJson == '导师'){
                             window.location.href=window.location.href.replace('login', "tutor")
                        }else{
                            window.location.href=window.location.href.replace('login', "admin")
                        }
            })
            .catch(err => {
                alert(err);
            this.$Message.error(err);
            });  
     },
    //  取消
     Cancel(){
         this.addTaskForm.taskName=''
         this.addTaskForm.taskContent=''
         this.addTaskForm.taskDeadline=''
    },
 }
}
</script>
<style scoped lang="less">

</style>