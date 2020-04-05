<template>
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-header>学生管理</el-header>
    <el-main>
      <el-table :data="tableData" height="650">
        <el-table-column prop="date" label="日期" width="140"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column fixed="right" width="150">
          <template slot="header">
            <el-button type="primary" size="mini" @click="dialogFormVisible=true;isadd=true">添加</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-footer>
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="20%"
      style="text-align:left"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handle">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogFormVisible = true;
      this.isadd = false;
      this.form = this.tableData[index];
    },
    handleDelete(index, row) {
      //删除
      // console.log(index, row);
      console.log(this.tableData[index].id)
      this.http.post(this.api.deleStdent, { id:this.tableData[index].id }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.tableData;
          this.total = res.data.total;
        }
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.http.post(this.api.getStdent, { page: val, count: 10 }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.tableData;
          this.total = res.data.total;
        }
      });
    },
    handle() {
      this.dialogFormVisible = false;
      if (this.isadd) {
        //添加
        this.http.post(this.api.addStdent, this.form).then(res => {
          if (res.code == 200) {
            this.$message.success(res.data);
          } else {
            this.$message.error(res.data);
          }
        });
      } else {
        //修改
        this.http.post(this.api.updateStdent, this.form).then(res => {
          if (res.code == 200) {
            this.$message.success(res.data);
          } else {
            this.$message.error(res.data);
          }
        });
      }
    },
    close() {
      this.form = this.fo;
      console.log("clean");
    }
  },
  created() {
    // this.http.post(this.api.getStdent, { page: 1, count: 10 }).then(res => {
    //   if (res.code == 200) {
    //     this.tableData = res.data.tableData;
    //     this.total = res.data.total;
    //   }
    // });
  },
  data() {
    const item = {
      id:"1",
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(10).fill(item),
      total: 1000,
      dialogFormVisible: false,
      isadd: true,
      form: {
        id:"",
        date: "",
        name: "",
        address: ""
      },
      fo: {
        id:"",
        date: "",
        name: "",
        address: ""
      }
    };
  }
};
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  font-size: 20px;
}

.el-page-header {
  font-size: 25px;
}

.el-main {
  padding-top: 0px;
}

.el-aside {
  color: #333;
}
</style>