<template>
    <div class="layout">
        <LayoutHeader></LayoutHeader>
      <div class="content">
        <div class="current">
            <h2>最新任务</h2>
            <div class="task">
                <h3 v-text="newTask.taskName"></h3>
                <div class="inner">
                    <p v-text="newTask.taskContent"></p>
                    <div>
                    <span><b>{{newTask.taskCreater}}</b> {{newTask.taskCreatType}} 于 {{newTask.taskCreateData}} 发布</span> <span>任务截止日期: <b>{{newTask.taskDeadline}}</b> </span><button class="button primary" @click="doTask">完成该任务</button>
                    </div>
                </div>
            <div class="clickShow clearfix" v-show="showDoTask">
                <div class="clearfix">
                    <Upload
                        :before-upload="handleUpload"
                        ref="upload"
                        action="http://10.0.6.83:8888/fileUpload"
                        :on-success='handleSuccess'
                        :data='params'
                        :on-exceeded-size='handleMaxSize'
                        :max-size="10240"
                        style="text-align:center">
                        <Button style="border:none"><i class='iconfont icon-fujian'>点击可上传附件</i></Button>
                        <span v-if="file !== null">Upload file: {{ file.name }}</span>
                    </Upload>
                    
                    <label>答案内容:</label>
                    <textarea name="" v-model="params.answer" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="dibuButton"><button class="button default">取消</button><button class="button primary" @click="submitTask">提交</button></div>
                </div>
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
  name: 'student',
  data () {
    return {
        newTask:{
            taskName:'',
            taskContent:'',
            taskCreateData:'',

        },
        params:{   
            answer:'',
            taskPlanId:1
        },
         file:null,
        // taskSubContent:'',
        historyTasks:[],
        taskList:[],
        showDoTask:false
    }
 },
 computed:{
    Head(){
        if (window.sessionStorage.getItem('token')) {
            return window.sessionStorage.getItem('token');
      }
    }

 },
mounted(){
    this.getTask();
  },
methods:{
    doTask(){
        this.showDoTask=!this.showDoTask;
    },
    handleUpload (file) {
        this.file = file;
        // console.log(this.params.file);
        // debugger;
        return false;
    },
    handleSuccess(){
        this.params.file = null;
        this.loadingStatus = false;
        this.$Message.success('上传成功')
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '超出文件大小范围',
            desc: '文件' + file.name + ' 太大了, 不允许超过10M.'
        });
        return false;
    },
    submitTask(){
        this.$refs.upload.post(this.file);
        this.params.answer=''
         this.showDoTask=!this.showDoTask;
    },
    getTask(){
      this.axios.get('/getStuTask?id='+1)
            .then(res => {
              console.log(res)
                this.taskList = res.data.resJson;
        if(Array.isArray(this.taskList)){
            for(let i=0;i<this.taskList.length;i++){
                if(this.taskList[i].state==1){
                this.newTask = this.taskList[i];
                this.params.taskPlanId = this.taskList[i].taskPlanId
                }else{
                    this.historyTasks.push(this.taskList[i])
                }
            }
        }else{
            this.$$Message.info('暂无任务')
        }
            })
            .catch(err => {
                this.$Message.error(err);
            });  
    },
  }
}
</script>
<style scoped lang="less">
h2{
    font-size: 20px;
    margin-bottom:20px;
    margin-top:20px;
    margin-left: 50px;
}
h3{
    font-size:16px;
    font-weight: normal;
    padding:10px 0;
    text-align: center
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
.clickShow{
    label{
        float: left;
        width:19%;
        font-size:18px;
        text-align: right;
    }
    textarea{
        width:80%;
        resize: none;
        float: right;
    }
}
.clearfix:after{
    content:".";
     display:block; 
     height:0; 
     visibility:hidden; 
     clear:both;
}
.dibuButton{
    float: right;
    margin-top: 20px;
    margin-bottom: 20px;
}
.layout{
    width: 960px;
    margin: 0 auto;
}
</style>
