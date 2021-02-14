<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="searchwrap">
                <el-row class="searchwrap-header" :gutter="12" type="flex" justify="space-between">
                    <el-col :md="8" :lg="6" :xl="4" class="searchItem">
                        <div class="label">角色：</div>
                        <el-input v-model="listQuery.true_name" placeholder="请输入角色名称"></el-input>
                    </el-col>
                    <el-col :md="8" :lg="6" :xl="4" class="searchItem searchItemBtn">
                        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
                        <el-button size="small" @click="handleEdit()" type="primary">新增</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 内容类 -->
            <div class="table-box">
                <tableList ref="tableList" :listQuery="listQuery" @handleEdit="handleEdit"></tableList>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="isAdd ? '角色添加' : '角色编辑'" v-dialogDrag :visible.sync="editVisible" width="30%" :close-on-click-modal='false'>
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.title" placeholder="请输入角色名称" autocomplete="off"></el-input>
                </el-form-item>
                    <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="formEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import util from "@/saaslib/util";
import tableList from "./tableList/index"; //表格列表
export default {
    components: { tableList },
    name: 'sysuser',
    data() {
        return {
            // 查询条件
            listQuery: {
                true_name: '',
                page: 1,
                length: 10
            },
            // 列表
            tableData: [],
            // 总条数
            pageTotal: 0,
            // 多选数组
            multipleSelection: [],
            delList: [],
            // 表单
            form: {
                title: '',
                remark: ''
            },
            isAdd: true,
            editVisible: false,
        };
    },
    mounted() {
        this.handleSearch();
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            // 获取数据
            this.$refs.tableList.getListData();
        },
        // 编辑人员
        handleEdit(row){
            if(row){ //编辑
                this.form = JSON.parse(JSON.stringify(row))
                this.isAdd = false
                this.editVisible = true
            }else{ //新增
                this.form = {
                    title: '',
                    remark: ''
                }
                this.isAdd = true
                this.editVisible = true
            }
        },
        // 表单提交
        formEdit(){
            let url
            if(this.form.id && this.form.id!=''){
                url = "/api/Group/edit"
            }else{
                url = '/api/Group/add'
            }
            util.ajax.post(url,this.form).then(
                res=>{
                    if(res.errcode == 0){
                        this.editVisible = false
                        this.$message.success('操作成功')
                        this.handleSearch()
                    }else {
                        this.$message.error(res.errmsg);
                    }
                }
            )
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
