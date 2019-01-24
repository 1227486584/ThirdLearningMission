<template>
    <div>

        <div class="table">
        <div class="btns">
            <button @click="addInfo">新增</button>
            <button @click="updateInfo">修改</button>
            <button @click="deleteInfo">删除</button>
            
        </div>
        <Table
            class="tableClass"
            :columns="columns"
            :highlight-row='true'    
            @on-row-click='getRow'
            :data="studentList"
        ></Table>
        </div>             
   <!-- 新增 -->
    <Modal
      width="450"
      height="261"
      v-model="addModel"
      :mask-closable="false"
      @on-cancel="cancelAdd"
      title="新增"
    >
      <Form
        
        ref="addForm"
        :label-width="130"
        :rules="addStudentRules"
      >
        <Row style="text-align: left">
          <i-col>
            <Form-item label="学员姓名：" prop="studentName">
              <!-- <textarea style="width:100%;resize:none" v-model="addStudent.studentName"></textarea> -->
              <Input style="width:100%;" v-model="addStudent.studentName"/>
            </Form-item>
          </i-col>
        </Row>
        <Row style="text-align: left">
          <i-col>
            <Form-item label="部门：" prop="studentDepartment">
              <Select v-model="addStudent.studentDepartment" placement="top">
                <Option value="" key="">请选择</Option>
                <Option v-for="(value,index) in departments" :value="value" :key="index">{{value}}</Option>    
              </Select>
            </Form-item>
          </i-col>
        </Row>
        <Row style="text-align: left">
          <i-col>
            <Form-item label="导师：" prop="studentTeaId" >
              <Select v-model="addStudent.studentTeaId" placement="top">
                <Option value="" key="">请选择</Option>
                <Option v-for="(item,index) in teacherList" :value="item.teacherId" :key="index">{{item.teacherName}}</Option>    
              </Select>
            </Form-item>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button  @click="add" type="primary">确定</Button>
        <Button @click="cancelAdd" type="default">取消</Button>
      </div>
    </Modal>
     <Modal
      width="450"
      height="261"
      v-model="updateModel"
      :mask-closable="false"
      @on-cancel="cancelUpdate"
      title="修改"
    >
      <Form      
        ref="updateForm"
        :label-width="130"
      >
        <Row style="text-align: left">
          <i-col>
            <Form-item label="学员姓名：" prop="studentName">
               <Input style="width:100%;" v-model="updateStudent.studentName"/>
            </Form-item>
          </i-col>
        </Row>
        <Row style="text-align: left">
          <i-col>
            <Form-item label="密码：" prop="studentPwd">
               <Input style="width:100%;" v-model="updateStudent.studentPwd"/>
            </Form-item>
          </i-col>
        </Row>
        <Row style="text-align: left">
          <i-col>
            <Form-item label="部门：" prop="studentDepartment">
              <Select v-model="updateStudent.studentDepartment" placement="top">
                <Option value="" key="">请选择</Option>
                <Option v-for="(value,index) in departments" :value="value" :key="index">{{value}}</Option>    
              </Select>
            </Form-item>
          </i-col>
        </Row>
        <Row style="text-align: left">
          <i-col>
            <Form-item label="导师：" prop="studentTeaId" >
              <Select v-model="updateStudent.studentTeaId" placement="top">
                <Option value="" key="">请选择</Option>
                <Option v-for="(item,index) in teacherList" :value="item.teacherId" :key="index">{{item.teacherName}}</Option>        
              </Select>
            </Form-item>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button  @click="update('updateForm')" type="primary">确定</Button>
        <Button @click="cancelUpdate" type="default">取消</Button>
      </div>
    </Modal>
    </div>
</template>
<script>
export default {
  name: 'adminManage',
  data () {
    return {
        columns: [ 
                    {
                        title: '学员姓名',
                        key: 'studentName'
                    },
                    {
                        title: '密码',
                        key: 'studentPwd'
                    },
                    
                    {
                        title: '部门',
                        key: 'studentDepartment'
                    },
                    {
                        title: '岗位',
                        key: 'studentInfo',
                        // renderer(row){
                        //   return row;
                        // }
                    },
                    {
                        title: '导师',
                        key: 'studentTeaName',
                    }
                ],
        departments:['IT信息化部','金融事业部','华东事业部','创新业务事业部','研发中心','小远机器人'],
        teacherList:[],
        studentList: [],
        currentRow:null,
        // 新增模态框
        addStudent:{
            studentName:'',
            studentPwd:'',
            studentDepartment:'',
            studentTeaId:'',
        },
        // addStudentRules:{},
        updateStudent:{
            studentName:'',
            studentPwd:'',
            studentDepartment:'',
            studentTeaId:'',
        },
        addStudentRules:{
          studentName:[{
            required: true,
            message: "请填写学生名称",
            trigger: "blur"
          }],
          studentDepartment:[{
            required: true,
            message: "请选择学生所在部门",
            trigger: "blur"
          }],
          studentPwd:[{
            required: true,
            message: "请填写学生密码",
            trigger: "blur"
          }],
        },
        addModel:false,
        updateModel:false,

    }
 },
  mounted(){
     this.getTeaList()
     this.intData()
  },
  methods:{
    getTeaList(){
      this.axios.get('/getTeaList')
            .then(res => {
              
                this.teacherList = res.data.resJson;
                console.log(this.teacherList)
            })
            .catch(err => {
                this.$Message.error(err);
            });  
    },
    intData() {
      this.axios
        .get('/studentList')
        .then(res => {
          this.studentList = res.data.resJson;
          console.log(this.studentList);
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    //新增
    addInfo(){
      this.addModel = true;
    },
    add(){
      this.axios
            .get('/addStu',{
            params: this.addStudent
        })
            .then(res => {
              
              this.$Message.success("添加成功");
              this.intData();
              this.addModel=false;
            })
            .catch(err => {
              this.$Message.error(err);
             });  
    },
    cancelAdd(){
      this.addModel = false;
    },
    //修改
    updateInfo(){
      if (this.currentRow) {
        this.updateModel = true;
        this.updateStudent.studentName = this.currentRow.studentName;
        this.updateStudent.studentPwd = this.currentRow.studentPwd;
        this.updateStudent.studentDepartment = this.currentRow.studentDepartment;
         } else {
        this.$Message.info("请选择要修改的项");
      } 
    },
    update(name){
       this.$refs[name].validate(valid => {
        if (valid) {
            var params=this.updateStudent
            params.studentAccount = this.currentRow.studentAccount
            params.studentInfo = this.currentRow.studentInfo
            params.studentId = this.currentRow.studentId
            this.axios
            .get('/updateStu',{
            params: params
        })
            .then(res => {
              this.$Message.success("修改成功");
              this.intData();
              this.currentRow = null;
              this.updateModel=false;
            })
            .catch(err => {
              this.$Message.error(err);
             });   
        }else{
           return false;
        }})
    },
    cancelUpdate(){
      this.updateModel = false;
    },
    //删除
    deleteInfo(){
      if (this.currentRow) {
        this.axios
            .get('/delStu?stuId='+this.currentRow.studentId)
            .then(res => {
              this.$Message.success("删除成功");
              this.currentRow=null
              this.intData();
            })
            .catch(err => {
              this.$Message.error(err);
             });  
      } else {
        this.$Message.info("请选择要删除的项");
      } 
    },
    //表格相关方法
    getRow(currentRow){
      this.currentRow = currentRow;
    },
    
  }
}
</script>
<style scoped lang="less">
.btns{
  display:flex;
    flex-direction:row;
    justify-content:center;
    align-items: center;   
    margin-bottom: 26px;
    margin-top: 26px;
  button{
     background-color:#71a2de;
     border:none;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;
      color:#fff;
      margin-right: 100px;
    }
  }
</style>