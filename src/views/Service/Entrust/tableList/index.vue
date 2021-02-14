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
            <el-table-column prop="nickname" label="姓名" ></el-table-column>
            <el-table-column prop="phone_number" label="手机号" ></el-table-column>
            <el-table-column prop="community" label="小区" ></el-table-column>
            <el-table-column prop="type" label="类型" >
             <template slot-scope="scope">
                    <span v-for="item in typeList" :key="item.id">
                        <span v-if="scope.row.type == item.id">{{item.text}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" >
                <template slot-scope="scope">
                    <el-button type="text" @click="getOrder(scope.row)">抢单</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" width="200" align="center" fixed="right">
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
            </el-table-column> -->
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
        nstatusFun(data){
            if(data==1){
                return '有效'
            }else if(data==2){
                return '无效'
            }else if(data==3){
                return '暂不租'
            }else if(data==4){
                return '已租'
            }else if(data==5){
                return '重点推荐'
            }else if(data==6){
                return '推荐'
            }else{
                return ''
            }
        }
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
            // 委托类型
            typeList:[
                {
                    id: 1,
                    label: '出租'
                },
                {
                    id: 2,
                    label: '出售'
                },
                {
                    id: 3,
                    label: '求租'
                },
                {
                    id: 4,
                    label: '求购'
                }
            ],
        };
    },
    created() {
        
    },
    methods: {
        // 获取数据
        getListData() {
            this.listLoading = true
            let params = JSON.parse(JSON.stringify(this.listQuery))
            util.ajax.post("/api/Newsapi/lease_list",params).then(
                res=>{
                    if(res.errcode == 0){
                        console.log(res.data)
                        this.tableData = res.data.info;
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

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
