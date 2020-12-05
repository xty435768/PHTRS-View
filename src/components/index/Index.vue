<template>
  <div>
    <h2 align="center">On-line pothole tracking and repair system</h2>
    <el-dialog title="新增工单" :visible.sync="dialogFormVisible" width="40%" align='center'> <!-- <el-scrollbar style="height:100%"> -->
        <el-form :model="citizen_form">
          <el-form-item label="街道地址" :label-width="'120px'">
            <el-input v-model="citizen_form.address" auto-complete="off" style="margin-bottom: 22px"></el-input>
          </el-form-item>
          <el-form-item label="大小" :label-width="'120px'" >
            <el-select v-model="citizen_form.size" placeholder="请选择坑洞大小" style="width: 100%;margin-bottom: 22px">
              <el-option v-for="item in size_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部位" :label-width="'120px'" align='left' style="margin-bottom: 22px">
            <el-radio v-model="citizen_form.position" label="center">道路中间</el-radio>
            <el-radio v-model="citizen_form.position" label="side">道路两侧</el-radio>
            <el-radio v-model="citizen_form.position" label="sidewalk">人行道</el-radio>
          </el-form-item>
          <el-form-item label="所在地区" :label-width="'120px'">
            <el-input v-model="citizen_form.district" auto-complete="off" style="margin-bottom: 22px"></el-input>
          </el-form-item>
          <el-form-item label="优先级" :label-width="'120px'">
            <el-select v-model="citizen_form.priority" placeholder="请选择优先级" style="width: 100%">
              <el-option v-for="item in ['Low','Medium-low','Medium','Medium-high','High']" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form> <!-- </el-scrollbar> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="citizen_submit">确 定</el-button>
        </div>
    </el-dialog>
        <el-dialog title="接单" :visible.sync="workerDialogFormVisible" width="40%" align='center'> <!-- <el-scrollbar style="height:100%"> -->
          <el-form :model="modifing_order">
            <el-form-item label="坑洞标识号" :label-width="'120px'">
              <el-input v-model="modifing_order.id" auto-complete="off" style="margin-bottom: 22px" disabled></el-input>
            </el-form-item>
            <el-form-item label="维修人员标识号" :label-width="'120px'" >
              <el-select v-model="modifing_order.workersId" placeholder="请输入标识号，按回车键添加" multiple filterable allow-create style="width: 100%;margin-bottom: 22px"></el-select>
              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
            <el-form-item label="分配设备" :label-width="'120px'" >
              <el-select v-model="modifing_order.device" placeholder="请输入设备名及其数量，按回车键添加" multiple filterable allow-create style="width: 100%;margin-bottom: 22px"></el-select>
              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
            <el-form-item label="维修时间" :label-width="'120px'">
              <el-input v-model="modifing_order.duration" auto-complete="off" style="margin-bottom: 22px"></el-input>
            </el-form-item>
            <el-form-item label="维修材料" :label-width="'120px'" >
              <el-select v-model="modifing_order.material" placeholder="请输入材料名及其数量，按回车键添加" multiple filterable allow-create style="width: 100%;margin-bottom: 22px"></el-select>
              <!-- <el-button @click='ss'>aaa</el-button> -->
            </el-form-item>
            <el-form-item label="维修成本" :label-width="'120px'">
              <el-input v-model="modifing_order.cost" auto-complete="off" style="margin-bottom: 22px"></el-input>
            </el-form-item>
            <el-form-item label="工单状态" :label-width="'120px'">
              <el-select v-model="modifing_order.status" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in statusOption" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-form> <!-- </el-scrollbar> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="workerDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="worker_submit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-dialog title="修改状态" :visible.sync="statusDialogFormVisible" width="40%" align='center'> 
        <el-form :model="modifing_order">
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="statusDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="status_submit">确 定</el-button>
        </div>
    </el-dialog> -->
    <el-dialog title="提交验收状态" :visible.sync="checkResultDialogFormVisible" width="40%" align='center'> <!-- <el-scrollbar style="height:100%"> -->
        <el-form :model="modifing_order">
          <el-form-item label="工单状态" :label-width="'120px'">
            <el-select v-model="modifing_order.status" placeholder="请选择">
              <el-option v-for="item in checkOption" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form> <!-- </el-scrollbar> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="checkResultDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkResult_submit">确 定</el-button>
        </div>
    </el-dialog>

    <!-- <el-button type="primary" plain icon="el-icon-circle-plus" style="float:right">主要按钮</el-button>
    <el-button type="primary" plain style="float:right">主要按钮</el-button> -->
    <div class="filter-container">
      <div
        class="right-items"
        style="float: right;"
      >
        <el-button
          class="filter-item"
          style="margin-left: 30px;"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
        >刷新</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-circle-plus"
          v-if="user_type=='citizen' || true"
          @click="handleCreate"
        >New Record</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 30px;"
          type="primary"
          icon="el-icon-menu"
          @click="to_my"
        >个人中心</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 30px;"
          type="primary"
          icon="el-icon-remove-outline"
          @click="log_out"
        >退出登录</el-button>
      </div>
    </div>
    <div v-if="user_type=='null'">
      <h3>null</h3>
    </div>
    <div v-if="user_type=='citizen'">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="坑洞标识号" sortable width="120px"></el-table-column>
        <el-table-column prop="address" label="街道地址" sortable width="auto"></el-table-column>
        <el-table-column prop="size" label="大小" sortable width="75px"></el-table-column>
        <el-table-column prop="position" label="部位" sortable width="75px"></el-table-column>
        <el-table-column prop="district" label="地区" sortable width="auto"></el-table-column>
        <el-table-column prop="priority" label="维修优先级" sortable width="125px"></el-table-column>
        <el-table-column prop="time" label="创建时间" sortable width="auto"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="auto"></el-table-column>
      </el-table>
    </div>
    <div v-if="user_type=='worker'">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="坑洞标识号" sortable width="200"></el-table-column>
        <el-table-column prop="address" label="街道地址" sortable width="300"></el-table-column>
        <el-table-column prop="size" label="大小" sortable width="100"></el-table-column>
        <el-table-column prop="position" label="部位" sortable width="100"></el-table-column>
        <el-table-column prop="district" label="地区" sortable width="200"></el-table-column>
        <el-table-column prop="priority" label="维修优先级" sortable width="120"></el-table-column>
        <el-table-column prop="time" label="创建时间" sortable width="200"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="100"></el-table-column>
        <el-table-column prop="workersId" label="维修人员识别号" width="200">
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].workersId" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="workers_number" label="维修人数" sortable width="100">
          <template slot-scope="scope">
            {{tableData[scope.$index].workersId.length}}
          </template>
        </el-table-column>
        <el-table-column prop="device" label="分配设备" width="200">
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].device" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="维修花费时长" sortable width="200"></el-table-column>
        <el-table-column prop="material" label="所用材料" sortable width="200">
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].material" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="维修成本" sortable width="200"></el-table-column>
        <el-table-column label="操作" fixed width="200">
          <template slot-scope="scope">
            <div v-if="tableData[scope.$index].status=='已提交'">
              <el-button size="mini" type="primary"
                @click="handleOrderTaking(scope.$index, scope.row)">接单</el-button>
            </div>
            <div v-else-if="tableData[scope.$index].status=='待验收'">
              <el-button size="mini" type="primary" disabled>维修完成</el-button>
            </div>
            <div v-else-if="tableData[scope.$index].status=='验收通过'">
              <el-button size="mini" type="success" disabled>验收通过</el-button>
            </div>
            <!-- <div v-if="tableData[scope.$index].status!='已提交' && tableData[scope.$index].status!='待验收'"> -->
            <div v-else>
              <el-button size="mini" type="primary" plain
                @click="handleModifyingStatus(scope.$index, scope.row)">修改状态</el-button>
              <el-button size="mini" type="primary"
                @click="handleOrderDone(scope.$index, scope.row)">完成施工</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="user_type=='admin'">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="坑洞标识号" sortable width="200"></el-table-column>
        <el-table-column prop="address" label="街道地址" sortable width="300"></el-table-column>
        <el-table-column prop="size" label="大小" sortable width="100"></el-table-column>
        <el-table-column prop="position" label="部位" sortable width="100"></el-table-column>
        <el-table-column prop="district" label="地区" sortable width="200"></el-table-column>
        <el-table-column prop="priority" label="维修优先级" sortable width="120"></el-table-column>
        <el-table-column prop="time" label="创建时间" sortable width="200"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="100"></el-table-column>
        <el-table-column prop="workersId" label="维修人员识别号" width="200">
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].workersId" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="workers_number" label="维修人数" sortable width="100">
          <template slot-scope="scope">
            {{tableData[scope.$index].workersId.length}}
          </template>
        </el-table-column>
        <el-table-column prop="device" label="分配设备" width="200">
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].device" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="维修花费时长" sortable width="200"></el-table-column>
        <el-table-column prop="material" label="所用材料" sortable width="200">
          <template slot-scope="scope">
            <el-tag v-for="item in tableData[scope.$index].material" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="维修成本" sortable width="200"></el-table-column>
        <el-table-column prop="name" label="上报人" sortable width="200" :key="Math.random()"></el-table-column>
        <el-table-column prop="connectingAddress" label="上报人联系地址" sortable width="200"></el-table-column>
        <el-table-column prop="mobile" label="上报人联系电话" sortable width="200"></el-table-column>
        <el-table-column label="操作" fixed width="125">
          <template slot-scope="scope">
            <div v-if="tableData[scope.$index].status=='验收通过'">
              <el-button size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除工单</el-button>
            </div>
            <div v-else-if="tableData[scope.$index].status=='待验收'">
              <el-button size="mini" type="primary"
                @click="handleCheckResultSubmit(scope.$index, scope.row)">提交验收结果</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" disabled>等待施工完成</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!-- <el-button @click="changeRole">切换角色</el-button>
<el-button @click="send_test" disabled>发送测试</el-button>
<el-button @click="test">测试</el-button> -->
  </div>
</template>

<script>
import $ from 'jquery'
//import Vue from 'vue'
import {getCurrentTime} from '../../js/time.js'

export default {
  components:{Vue},
  data () {
    return {
      tableData: [],
      user_type: 'null',
      dialogFormVisible: false,
      workerDialogFormVisible: false,
      statusDialogFormVisible: false,
      checkResultDialogFormVisible: false,
      statusOption: ['维修进行中','已维修','临时维修','未维修'],
      checkOption: ['验收通过','验收不通过'],
      role_index: 0,
      role:['citizen','worker','admin'],

      citizen_form:{
          id: '',
          address: '',
          size: '1',
          position: 'center',
          district: '',
          priority: 'Low',
          time: '',
          status: '已提交',
          workersId: [],
          device: [],
          duration: '4h',
          material: [],
          cost: '$400',
          name: '张三',
          connectingAddress: '番禺区外环东路352号',
          mobile: '110'
        },
      size_options:[],
      modifing_order:{},
      modifing_index:0,
      //value10:[]
    }
  },
  methods: {
    test(){
      console.log(this.tableData);
    },
    changeRole(){
      this.role_index++;
      this.user_type = this.role[this.role_index%3];
      alert(this.role[this.role_index%3]);
    },
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    handleCreate () {
      //alert('新增记录');
      this.$axios.post('/user_info/get',{
        userName: window.sessionStorage.getItem('user')
      }).then(res=>{
        if(res.data.name==''||res.data.mobile==''||res.data.address==''){
          this.$notify.error({title:'添加失败！',message: '用户信息不完善，请先前往个人中心完善个人信息！'})
        }
        else{
          this.dialogFormVisible = true;
        }

      }).catch(failResponse=>{
        this.$notify.error({title: '调取用户信息异常！',message: failResponse.data});
      })
      
    },
    citizen_submit() {
      //处理市民提交表单的动作
      this.citizen_form.time = getCurrentTime();
      if(this.citizen_form.address == ''){
        alert('街道地址不能为空！');
        return;
      }
      if(this.citizen_form.district == ''){
        alert('所在地区不能为空！');
        return;
      }
      this.$axios.post('/workorder/create',{
        address:this.citizen_form.address,
        size:this.citizen_form.size,
        district:this.citizen_form.district,
        position:this.citizen_form.position,
        priority:this.citizen_form.priority,
        time:this.citizen_form.time,
        status:this.citizen_form.status,
        userName:window.sessionStorage.getItem('user')
      }).then(successResponse => {
            if (successResponse.data === 'OK') {
              this.$message({message:'添加成功！',type:'success',center:true,showClose:true})

              console.log(this.citizen_form)
              //this.tableData.push($.extend(true, {}, this.citizen_form));
              console.log(this.tableData)
              //if(success)
              this.dialogFormVisible = false
              this.refresh();
            }
            else
            {
              this.$message({message:'添加失败！'+successResponse.data,type:'error',center:true,showClose:true})
            }
          })
          .catch(failResponse => {
            this.$notify.error({title: '操作异常！',message: failResponse.message});
          })
    },
    worker_submit(){
      //alert("worker submit!");
      this.workerDialogFormVisible = false;
      //if(this.tableData[this.modifing_index].status == '已提交')
      //this.modifing_order.status = '已接单';
      //Vue.set(this.tableData,this.modifing_index,this.modifing_order);
      this.update(this.modifing_order);
      //this.sleep(1000);
      //this.refresh();
      //location.reload();
    },
    status_submit(){
      this.statusDialogFormVisible = false;
      //this.modifing_order.status = '已接单';
      Vue.set(this.tableData,this.modifing_index,this.modifing_order);
    },
    checkResult_submit(){
      this.checkResultDialogFormVisible = false;
      //Vue.set(this.tableData,this.modifing_index,this.modifing_order);
      this.update(this.modifing_order);
      //this.sleep(1000);
      //this.refresh();
      //location.reload();
    },
    to_my () {
      this.$router.replace({ path: '/my/info' })
    },
    handleOrderTaking(index,row){
      this.workerDialogFormVisible = true;
      //row.size++;
      console.log(index,row);
      this.modifing_order = $.extend(true, {}, row);
      this.modifing_index = index;
    },
    handleModifyingStatus(index,row){
      //this.statusDialogFormVisible=true;
      // this.modifing_order = $.extend(true, {}, row);
      // this.modifing_index = index;
      this.handleOrderTaking(index,row);
    },
    
    handleOrderDone(index,row){
      //alert('施工完成！');
      this.$confirm('完成后该工单将等待其他部门验收，确定完成该工单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '工单已完成'
          });
          row.status='待验收';
          this.update(row);
          this.sleep(1000);
          location.reload();
        }).catch(() => {});
    },
    handleDelete(index,row){
      this.$confirm('确定删除这条工单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '工单已删除'
          });
          //this.tableData.splice(index, 1);
          this.$axios.post('/workorder/delete',{id:row.id}).then(res=>{
            if(res.data == 'OK') {
              this.$message({message:'删除成功！',type:'success',center:true,showClose:true});
              this.refresh();
            }else{
              this.$notify.error({title: '删除失败！',message: res.data});
            }
          }).catch(failResponse => {
            this.$notify.error({title: '删除异常！',message: failResponse.message});
          })
        }).catch(() => {});
    },
    handleCheckResultSubmit(index,row){
      this.checkResultDialogFormVisible=true;
      this.modifing_order = $.extend(true, {}, row);
      this.modifing_index = index;
    },
    send_test(){
      this.request_test(this.tableData[0]);
    },
    request_test(record){
      //人数
      this.$axios.post('/temp', {
        address: record.address,
        size: record.size,
        position: record.position,
        district: record.district,
        priority: record.priority,
        time: record.time,
        status: record.status,
        workersId: record.workersId,
        device: record.device,
        duration: record.duration,
        material: record.material,
        cost: record.cost,
        userName: window.sessionStorage.getItem('user')
      }).then(successResponse => {
        if (successResponse.status === 200) {
          this.$message({message:'提交成功！',type:'success',center:true,showClose:true})
        }
        else
        {
          this.$message({message:'提交失败！',type:'error',center:true,showClose:true})
        }
      })
      .catch(failResponse => {
        this.$notify.error({title: '提交异常！',message: failResponse.message});
      })
    },
    refresh(){
      this.tableData.length = 0;
      this.$axios.post('/workorder/getAll',{userName:window.sessionStorage.getItem('user')}).then(
        res=>{
          var d = eval(res.data);
          for (let index = 0; index < d.length; index++) {
            // d[index].device = eval('['+d[index].device+']');
            // d[index].material = eval('['+d[index].material+']');
            // d[index].workersId = eval('['+d[index].workersId+']');
            d[index].device = (d[index].device=="")?[]:d[index].device.split(',');
            d[index].material = (d[index].material=="")?[]:d[index].material.split(',');
            d[index].workersId = (d[index].workersId=="")?[]:d[index].workersId.split(',');
            if(window.sessionStorage.getItem('user_type') == 'admin' || true){
              
              // this.$axios.post('/user_info/get',{userName:d[index].userName}).then(user_res=>{
              //   // $.extend(true,d[index]['name'],user_res.data.name);
              //   // $.extend(true,d[index]['mobile'],user_res.data.mobile);
              //   // $.extend(true,d[index]['connectingAddress'],user_res.data.address);
              //   $.extend(true,d[index],{name:user_res.data.name});
              //   $.extend(true,d[index],{mobile:user_res.data.mobile});
              //   $.extend(true,d[index],{connectingAddress:user_res.data.address});
              // }).catch(fail=>{this.$notify.error({title: '加载表格时调取用户信息异常！',message: fail.message});})
              // try {
              //   let s = this.$axios.post('/user_info/get',{userName:d[index].userName}).result.data;
              //   console.log('haha')
              //   console.log(s.result.data)
              //   $.extend(true,d[index]['name'],s.name);
              //   $.extend(true,d[index]['mobile'],s.mobile);
              //   $.extend(true,d[index]['connectingAddress'],s.address);
                
              // }
              // catch(err) {
              //   this.$notify.error({title: '加载表格时调取用户信息异常！',message: err.message});
              // }
            }
          }
          console.log(d);
          //console.log(window.sessionStorage.getItem('user_type'))
          //this.tableData = d;
          this.tableData = $.extend(true, [], d);
          this.$message({message:'刷新成功！',type:'success',center:true,showClose:true})
        }
      ).catch(failResponse => {
        this.$notify.error({title: '获取表单异常！',message: failResponse.message});
      })
      console.log(this.tableData)
    },
    update(item){
      item.device = item.device.toString();
      item.material = item.material.toString();
      item.workersId = item.workersId.toString();
      this.$axios.post('/workorder/update',item).then(res=>{
        if(res.data === 'OK') {
          this.$message({message:'更新成功！',type:'success',center:true,showClose:true});
          this.refresh();
        }
        else this.$notify.error({title: '更新失败！',message: res.data});
      }).catch(failResponse => {
        this.$notify.error({title: '更新条目异常！',message: failResponse.message});
      })
    },
    log_out(){
      console.log('log out!');
      this.$confirm('确定退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('user_type')
          this.$message({
            type: 'success',
            message: '登录已退出'
          });
          this.$router.replace({ path: '/login' })
        }).catch(() => {});
    },
    sleep(time) {
      var startTime = new Date().getTime() + parseInt(time, 10);
      while(new Date().getTime() < startTime) {}
    }
  },
  mounted () {
      this.user_type = window.sessionStorage.getItem('user_type');
      //console.log(this.user_type)
      for(var i=1;i<=10;i++){
        this.size_options.push({label:i,value:i});
      }
      //console.log(this.size_options)
      //console.log(this.options)
      this.refresh();
    }
}
</script>
<style scoped>
.el-select-dropdown__list {
    list-style: none;
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box;
    height: 200px;
}
</style>