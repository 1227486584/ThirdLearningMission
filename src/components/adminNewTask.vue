<template>
    <div>
        <Form ref="addTaskForm" :model="addTaskForm" :rules="addFormRule" :label-width="80">   
                <FormItem label="任务标题：" prop="taskName" :label-width="100">
                    <Input v-model="addTaskForm.taskName" placeholder="请填写任务标题"/>
                </FormItem>
                <FormItem label="任务内容：" prop="taskContent" :label-width="100">
                    <Input v-model="addTaskForm.taskContent" type="textarea" :autosize="{minCols: 30,minRows: 10}" placeholder="请填写任务内容..."/>
                </FormItem >
                <FormItem label="任务截止时间：" prop="taskDeadLine" :label-width="120">
                    <!-- <DatePicker type="date" @on-change='changeDate()' :placeholder='请选择截止日期' v-model="addTaskForm.taskDeadLine"></DatePicker> -->
                    <Date-picker  placeholder="请选择截止日期" v-model="addTaskForm.taskDeadLine" type="date"   :value="addTaskForm.taskDeadLine"  format="yyyy-MM-dd"  @on-change="addTaskForm.taskDeadLine=$event;" >
                </Date-picker>  
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
  name: 'adminNewTask',
  data () {
    return {
       addTaskForm:{
          taskName:'',
          taskContent:'',
          taskDeadLine:''
      },
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
 methods:{
    //  发布
     Public(){
         this.axios.get('/addTask', {
                params: this.addTaskForm
            })
            .then(res => {
                this.$Message.success("发布成功");
            })
            .catch(err => {
                alert(err)
            this.$Message.error(err.message);
            });  
     },
    //  取消
     Cancel(){
         this.addTaskForm.taskName=''
         this.addTaskForm.taskContent=''
         this.addTaskForm.taskDeadLine=''
    },
 }
}
</script>
<style scoped lang="less">


</style>