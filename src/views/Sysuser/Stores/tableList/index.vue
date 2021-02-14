<template>
    <div>
        <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            v-loading="listLoading"
        >
            <el-table-column prop="title" label="门店名称" align="center"></el-table-column>
                <el-table-column label="门头照片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.store_pic"
                            :preview-src-list="[scope.row.store_pic]"
                        ></el-image>
                    </template>
                </el-table-column>
            <el-table-column label="门店Code" prop="bind_code" width="220"> </el-table-column>
            <el-table-column label="手机号（账号）" prop="phone_number" > </el-table-column>
            <el-table-column label="门店地址" prop="address" > </el-table-column>
            <el-table-column label="微信小程序"> 
                <template slot-scope="scope">
                <span v-for="item in scope.row.app_info" :key="item.id">
                    {{item.type == 1 ? item.appid : ''}}
                </span>
                </template>
            </el-table-column>
            <el-table-column label="头条小程序"> 
                <template slot-scope="scope">
                <span v-for="item in scope.row.app_info" :key="item.id">
                    {{item.type == 2 ? item.appid : ''}}
                </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-view"
                        class="color-info"
                        @click="handleExamine(scope.$index, scope.row)"
                    >查看</el-button>
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
import { isPic } from "@/filters";
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
            util.ajax.post("/api/Store/getlist",params).then(
                res=>{
                    if(res.errcode == 0){
                        this.listLoading = false
                        this.tableData = res.data.info;
                        this.tableData.forEach(item=>{
                            item.store_pic = isPic(item.store_pic).join(",")
                        })
                        this.pageTotal = res.data.count 
                    } else {
                        this.listLoading = false
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
        // 查看
        handleExamine(index, row) {
            this.$message.warning('暂无功能');
        },
        // 删除操作
        handleDelete(index, row) {
            this.$message.warning('暂无功能');
            // 二次确认删除
            // this.$confirm('确定要删除吗？', '提示', {
            //     type: 'warning'
            // })
            //     .then(() => {
            //         util.ajax.post("/api/Newsapi/house_delete",{hid:row}).then(
            //             res=>{
            //                 if(res.errcode == 0){
            //                     this.$message.success('删除成功');
            //                     this.tableData.splice(index, 1);
            //                 }else {
            //                     this.$message.error(res.errmsg);
            //                 }
            //             }
            //         )
            //     })
            //     .catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$emit('handleEdit',row)
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

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
