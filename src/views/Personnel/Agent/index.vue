<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 花名册
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作类 -->
            <div class="handle-box">
                <div class="searchwrap">
                    <el-row class="searchwrap-header" :gutter="12" type="flex" justify="space-between">
                        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
                            <div class="label">姓名：</div>
                            <el-input v-model="listQuery.true_name" placeholder="请输入真实姓名"></el-input>
                        </el-col>
                        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
                            <div class="label">手机号：</div>
                            <el-input v-model="listQuery.phone_number" placeholder="请输入手机号"></el-input>
                        </el-col>
                        <el-col :md="8" :lg="6" :xl="4" class="searchItem"></el-col>
                        <el-col :md="8" :lg="6" :xl="4" class="searchItem searchItemBtn">
                            <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
                            <el-button size="small" @click="handleEdit()" type="primary">新增</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!-- 内容类 -->
            <div class="table-box">
                <tableList ref="tableList" :listQuery="listQuery" @handleEdit="handleEdit"></tableList>
            </div>
        </div>
        
        <!-- 编辑弹出框 -->
        <el-dialog :title="isAdd ? '人员添加' : '人员编辑'" v-dialogDrag :visible.sync="editVisible" width="40%" :close-on-click-modal='false'>
            <el-form ref="updateForm" :model="updateForm" label-width="70px">
                <el-form-item label="姓名">
                    <el-col :span="18">
                        <el-input v-model="updateForm.true_name" placeholder="请输入真实姓名" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                    <el-form-item label="身份证号">
                    <el-col :span="18">
                        <el-input v-model="updateForm.card" placeholder="请输入身份证号" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-col :span="18">
                        <el-input v-model="updateForm.phone_number" placeholder="请输入手机号"  autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码">
                    <el-col :span="18">
                        <el-input v-model="updateForm.pwd" :placeholder="isAdd ? '请输入密码' :'为空不修改密码'" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="级别">
                    <el-col :span="18">
                        <el-select v-model="updateForm.group_id" placeholder="请选择级别" filterable>
                            <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in authList"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="门店">
                    <el-col :span="18">
                        <el-select v-model="updateForm.sid" placeholder="请选择门店" filterable>
                            <el-option :label="item.title" :value="item.id" :key="item.id" v-for="item in storeList"></el-option>
                        </el-select>
                    </el-col>
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
    name: 'personnelAgent',
    data() {
        return {
            // 查询条件
            listQuery: {
                true_name: '',
                page: 1,
                length: 10
            },
            // 门店列表
            storeList: [],
            // 表单
            updateForm: {
                true_name: '',
                card: '',
                type: 1,
                phone_number: '',
                pwd: '',
                sid: '',
                level: 1,
                group_id: '',
            },
            isAdd: true,
            editVisible: false,
            authList:[
                {
                    id: 0,
                    label: '店长',
                    value: 12,
                },
                {
                    id: 1,
                    label: '经纪人',
                    value: 13,
                }
            ]
        };
    },
    created() {
    },
    mounted() {
        this.handleSearch();
        this.getStoreList()
    },
    methods: {
        // 门店下拉框列表
        getStoreList(){
            util.ajax.post("/api/Store/getlist",this.listQuery).then(
                res=>{
                    if(res.errcode == 0){
                        this.storeList = res.data.info.map(item=>{
                            item.store_pic = item.store_pic ? item.store_pic.split("?")[0] : item.store_pic
                            return item
                        })
                    }else {
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
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
                this.updateForm = JSON.parse(JSON.stringify(row))
                this.isAdd = false
                this.editVisible = true
            }else{ //新增
                this.updateForm = {
                    true_name: '',
                    card: '',
                    type: 1,
                    phone_number: '',
                    pwd: '',
                    sid: '',
                    level: 1,
                    group_id: '',
                }
                this.isAdd = true
                this.editVisible = true
            }
        },
        // 表单提交
        formEdit(){
            util.ajax.post("/api/Store/agent_save",this.updateForm).then(
                res=>{
                    if(res.errcode == 0){
                        this.editVisible = false
                        this.$message.success('保存成功')
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

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
