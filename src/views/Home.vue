<template>
  <div class="home">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>首页
            </template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>基础管理
            </template>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-price-tag"></i>销售
            </template>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-truck"></i>进货
            </template>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>库存
            </template>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-tools"></i>系统管理
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span> 用户: {{ islog == '' ? islogin : islog }}</span>
        </el-header>
        <el-button 
          :style="{width:'100px',marginLeft:'20px'}"
          type="primary"
          @click="add">
            添加供应商
          </el-button>
        <el-dialog title="添加供应商" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="供应商名称" :label-width="formLabelWidth">
              <el-input v-model="form.supplierName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商联系人" :label-width="formLabelWidth">
              <el-input v-model="form.supplierContact" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" :label-width="formLabelWidth">
              <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confims(isShow)">确 定</el-button>
          </div>
        </el-dialog>
        <el-main>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="供应商" prop="supplierName"> </el-table-column>
            <el-table-column label="联系人" prop="supplierContact"></el-table-column>
            <el-table-column label="联系电话" prop="phone"> </el-table-column>
            <el-table-column label="地址" prop="address"> </el-table-column>
            <el-table-column label="状态" prop="status"> </el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'Home',
  data () {
      return {
        dialogFormVisible: false,
        isShow:true,
        islogin:'',
        form: {
          supplierName: '',
          supplierContact: '',
          phone: '',
          address: '',
          status: 1,
          description: '',
        },
        formLabelWidth: '120px'
      }
  },
  methods: {
    //添加
    add ( ) {
      this.isShow = 1
      this.dialogFormVisible = true
      this.form = {}
    },

    confims  (val ) {
      console.log(val)
      val == true ? this.$store.dispatch('ACTION_ADD', this.form) 
                  : this.$store.dispatch('ACTION_UPDATA', this.form)

      this.dialogFormVisible = false
    },
    //修改
    handleEdit(index, row) {
        console.log(index, row);
        this.isShow = false
        this.dialogFormVisible = true
        Object.assign( this.form , row )
        
    },
    //删除
    handleDelete(index, row) {
        console.log(index, row);
        this.$store.dispatch('ACTION_DEL' , row )
    }
  },
  computed: {
    ...mapState([ 'tableData' ]),
    ...mapState('login',['islog'])
    
  },
  created () {
    this.$store.dispatch("ACTION_DATA")
    this.islogin = localStorage.getItem('token')
  },
}
</script>
