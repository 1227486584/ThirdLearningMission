<template>
    <div>
      <div class="current">
            <h2>最新任务</h2>
            <div class="task" v-show="hasTask">
                <h3 v-text="newTask.taskName"></h3>
                <div class="inner">
                    <p v-text="newTask.taskContent" ></p>
                    <p>作业提交的内容：</p>
                    <div v-text="newTask.answer"></div>
                    <div>
                      <span v-show="fujian" style="background:#999" @click="download">附件：{{newTask.fileName}}</span> <span>由 <b>{{newTask.studentName}}</b> 提交</span> <button class="button primary" @click="evaluate">去打分</button>
                    </div>
                </div>
                <div class="clickShow clearfix" v-show="showEvaluate">
                   <Form
                        ref="grade"
                      >
                        <Row style="text-align: left">
                          <i-col>
                            <Form-item label="得分：" prop="taskScore">
                                <Input style="width:400px;" v-model="params.taskScore"/>
                            </Form-item>
                          </i-col>
                        </Row>
                        <Row style="text-align: left">
                          <i-col>
                            <Form-item label="扣分原因：" prop="reason">
                              <textarea style="width:400px;" v-model="params.reason"></textarea> 
                            </Form-item>
                          </i-col>
                        </Row>
                        <Button  @click="marking('grade')" type="primary">确定</Button>
                        <Button @click="cancel" type="default">取消</Button>
                   </Form>
                </div>
           </div>
             <div class="task">
                <h2>历史任务列表</h2>
                <div v-for="(item,index) in historyTasks" :key='index'>
                    <div class="task">
                        <h3 v-text="item.taskName"></h3>
                        <div class="inner">
                            <p v-text="item.taskContent"></p>
                            <div>
                            <span><b>{{item.taskCreater}}</b> {{item.taskCreatType}} 于 {{item.taskCreateData}} 发布</span> <span>任务截止日期: <b>{{item.taskDeadline}}</b> </span> <button class="button default">任务已过期</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div> 
    </div>
</template>
<script>
export default {
  name: 'stuSubmitTask',
  data () {
    return {
      newTask:{
            taskName:'',
            taskContent:'',
            answer:'',
            fileName:''
        },
      params:{
            taskScore:'',
            reason:'',
            taskPlanId:1
        },
        historyTasks:[],
        taskList:[],
        showEvaluate:false,
        fujian:false,
        attachmentId:1,
        hasTask:false
     }
    },
  methods:{
    evaluate(){
        this.showEvaluate=!this.showEvaluate;
      },    
    getTeaTask(){
      this.axios.get('/getTeaTask')
            .then(res => {
                // console.log(res)
                this.taskList = res.data.resJson;
        if(Array.isArray(this.taskList)){
            for(let i=0;i<this.taskList.length;i++){
                if(this.taskList[i].state==1){
                  this.newTask = this.taskList[i];
                  this.hasTask=true;
                if(this.newTask.fileName){
                  this.fujian=true;
                }
                // console.log(this.newTask.answer)
                this.params.taskPlanId = this.taskList[i].taskPlanId
                this.attachmentId = this.taskList[i].attachmentId
                }else{
                    this.historyTasks.push(this.taskList[i])
                }
            }
        }else{
            this.$$Message.info('暂无学员提交的任务作业')
        }
            })
            .catch(err => {
                this.$Message.error(err);
            });  
    },
    marking(name){
      this.axios.get('/evaluation',{
        params:this.params
          })
        .then(res => {
            this.$Message.info('打分成功')
        })
        .catch(err => {
            this.$Message.error(err);
        }); 
     },
    cancel(){
      this.params.taskScore=''
      this.params.reason=''
    },
    download(){
      this.axios.get('/fileDownload?attachmentId='+this.attachmentId)
        .then(res => {

        })
        .catch(err => {
            this.$Message.error(err);
        }); 
    }    
  },
 mounted(){
    this.getTeaTask();
  },
}
</script>
<style scoped lang="less">
h2{
    font-size: 20px;
    margin-bottom:20px;
    margin-top:20px;
}
h3{
    font-size:16px;
    font-weight: normal;
    padding:10px 0;
}
.button{
        
        border:none;
        outline: none;
        width: 80px;
        height: 40px;
        border-radius: 5px;
        cursor: pointer;
        color:#fff;
    }
.primary{
    margin-left:20px;
    background-color:#71a2de;
}
.default{
    background-color:#8c9299;
}
.task{
    border-top:1px solid #eee;
    border-bottom: 1px solid #eee;
}
.inner{
    font-size: 14px;
    color:#666;
    background-color:#eee;
    p{
        // height: 30px;
        line-height: 30px;
        padding-top: 10px;
        padding-bottom: 40px;
        text-indent: 2em;
    }
    div{
        float: right;
        position: relative;
        top:-50px;
        right:20px
    }
}
</style>