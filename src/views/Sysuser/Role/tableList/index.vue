<template>
    <div>
        <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
            v-loading="listLoading"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="角色名称" prop="title"></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
            <el-table-column label="创建时间" prop="created_at"></el-table-column>
            <el-table-column label="操作" width="220" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-view"
                        class="color-warning"
                        @click="handleExamine(scope.$index, scope.row)"
                    >权限</el-button>
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="color-danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                    <el-button v-if="scope.row.state==2" type="text" class="el-icon-sort color-success" size="mini" @click="handleState(scope.$index,scope.row)">启用</el-button>
                    <el-button v-if="scope.row.state==1" type="text" class="el-icon-sort color-info" size="mini" @click="handleState(scope.$index,scope.row)">禁用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagination">
            <el-pagination
            :current-page="listQuery.page"
            :page-size="listQuery.length"
            :total="pageTotal"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"/>
        </div>
        <!-- 权限弹出框 -->
        <el-dialog title="权限编辑" v-dialogDrag :visible.sync="editVisible" width="30%" :close-on-click-modal='false'>
            <el-tree
                :data="roleList"
                :default-checked-keys="checkedRoleList"
                node-key="id"
                ref="roleTree"
                show-checkbox>
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import util from "@/saaslib/util";
export default {
    filters: {
    },
    props: {
        listQuery: {
            type: Object,
            required: true
        } 
    },
    data() {
        return {
            listLoading: false,
            // 列表
            tableData: [],
            // 总条数
            pageTotal: 0,
            // 多选数组
            multipleSelection: [],
            // 编辑弹出框
            editVisible: false,
            // 权限列表
            roleList: [
                {
                    id: 16,
                    label: '房源管理',
                    children: [
                        {
                            id: 80,
                            label: '新房管理'
                        },
                        {
                            id: 18,
                            label: '二手房管理'
                        },
                        {
                            id: 17,
                            label: '租房管理'
                        }
                    ]
                },
                 {
                    id: 88,
                    label: '门店合作',
                    children: [
                        {
                            id: 90,
                            label: '二手房合作'
                        },
                        {
                            id: 89,
                            label: '租房合作'
                        }
                    ]
                },
                {
                    id: 65,
                    label: '客源管理',
                    children: [
                        {
                            id: 66,
                            label: '新房客源'
                        },
                        {
                            id: 68,
                            label: '二手房客源'
                        },
                        {
                            id: 69,
                            label: '租房客源'
                        }
                    ]
                },
                {
                    id: 85,
                    label: '人员管理',
                    children: [
                        {
                            id: 85,
                            label: '人员列表'
                        },
                        {
                            id: 81,
                            label: '招聘信息'
                        }
                    ]
                },
                {
                    id: 17,
                    label: '权限设置',
                    children: [
                        {
                            id: 66,
                            label: '门店管理'
                        },
                        {
                            id: 68,
                            label: '角色管理'
                        }
                    ]
                },
            ],
            checkedRoleList: [],
            // 删除数组
            delList: [],
        };
    },
    created() {
        this.handleExamine2()
    },
    methods: {
        // 获取数据
        getListData() {
            this.listLoading = true
            let params = JSON.parse(JSON.stringify(this.listQuery))
            util.ajax.post("/api/Group",params).then(
                res=>{
                    if(res.errcode == 0){
                        this.listLoading = false
                        this.tableData = res.data.list;
                        this.pageTotal = res.data.count
                    }else {
                        this.listLoading = false
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
        // 获取数据
        handleExamine(index, row) {
            util.ajax.post("/api/Group/rule_list",{id: row.id}).then(
                res=>{
                    if(res.errcode == 0){
                        // this.roleList = res.data.list;
                        this.checkedRoleList = res.data.data;
                        this.editVisible = true
                    }else {
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
        // 获取数据
        handleExamine2(index, row) {
            util.ajax.post("/api/Group/rule_info").then(
                res=>{
                    if(res.errcode == 0){
                        console.log(res.data)
                    }else {
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    util.ajax.post("/api/Group/delete",{id:row.id}).then(
                        res=>{
                            if(res.errcode == 0){
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }else {
                                this.$message.error(res.errmsg);
                            }
                        }
                    )
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$emit('handleEdit',row)
        },
        // 表单提交
        updateForm(){
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
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 删除
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.listQuery, 'page', val);
            this.getListData()
        },
        // 分页导航
        handleSizeChange(val) {
            this.$set(this.listQuery, 'length', val);
            this.getListData()
        },
        // 更改状态
        handleState(row,val) {
            util.ajax.post("/api/Group/status", {id: row.id}).then(
                res=>{
                    if(res.errcode == 0){
                        this.$message.success({
                            message: '操作成功！',
                        });
                    } else {
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
        
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
