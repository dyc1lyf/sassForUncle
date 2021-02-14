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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="ID">
                        <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="客户姓名">
                        <span>{{ props.row.username }}</span>
                        </el-form-item>
                        <el-form-item label="证件号">
                        <span>{{ props.row.card }}</span>
                        </el-form-item>
                        <el-form-item label="电话">
                        <span>{{ props.row.phone_number }}</span>
                        </el-form-item>
                        <el-form-item label="地址">
                        <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <!-- <el-form-item label="需求商圈">
                            <span>{{ props.row.address }}</span>
                            </el-form-item> -->
                        <el-form-item label="小区">
                        <span>{{ props.row.community }}</span>
                        </el-form-item>
                        <el-form-item label="楼层范围">
                        <span>{{ props.row.floor }}</span>
                        </el-form-item>
                        <el-form-item label="装修类型">
                        <span>{{ props.row.decoration }}</span>
                        </el-form-item>
                        <el-form-item label="居室">
                        <span>{{ props.row.living_room }}</span>
                        </el-form-item>
                        <el-form-item label="金额范围">
                        <span>{{ props.row.rent }}</span>
                        </el-form-item>
                        <el-form-item label="目的">
                        <span>{{ props.row.objective }}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                        <span>{{ props.row.remarks }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="客户姓名"></el-table-column>
            <el-table-column
                prop="phone_number"
                label="客户电话"
            ></el-table-column>
            <el-table-column prop="decoration" label="装修类型"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" width="200" align="center" fixed="right">
                <template slot-scope="scope">
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
    </div>
</template>

<script>
import util from "@/saaslib/util";
import { formatDate,roomType } from "@/filters";
export default {
    filters: {
        roomType(data){
            return roomType(data)
        },
        formatDate(time) {
            if (time) {
                const date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            } else {
                return "";
            }
        },
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
            delList: [],
        };
    },
    created() {
        
    },
    methods: {
        // 获取数据
        getListData() {
            this.listLoading = true
            let params = JSON.parse(JSON.stringify(this.listQuery))
            util.ajax.post("/api/Admin/tourists_list",params).then(
                res=>{
                    if(res.errcode == 0){
                        this.tableData = res.data;
                        this.pageTotal = res.data.count
                        this.listLoading = false
                    }else {
                        this.listLoading = false
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
                    util.ajax.post("/api/Newsapi/house_delete",{hid:row}).then(
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
        changeState(row,val) {
            util.ajax.post("/api/member/status", {id: row.id,'val':val}).then(
                res=>{
                    if(res.errcode == 0){
                        this.$message.success({
                            message: '修改状态成功！',
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
.demo-table-expand {
font-size: 0;
}
::v-deep .demo-table-expand .el-form-item__label {
width: 90px;
color: #99a9bf;
}
::v-deep .demo-table-expand .el-form-item {
margin-right: 0;
margin-bottom: 0;
width: 50%;
}
</style>
