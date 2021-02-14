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
            <el-table-column
                fixed
                label="标题"
                prop="long_title"
                width="200">
                <template slot-scope="scope">
                    <el-tooltip placement="top-start">
                        <div slot="content">{{scope.row.long_title}}</div>
                        <span class="table_ellipsis color-brand" @click="handleExamine(scope.$index, scope.row)">{{scope.row.long_title}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="行政区" prop="region_name" align="center" width="80"></el-table-column>
            <el-table-column label="商圈" prop="block_name" align="center" width="100"></el-table-column>
                <el-table-column
                label="居室"
                prop="rhval"
                align="center">
                <div slot-scope="scope">{{scope.row.rhval | roomType}}</div>
            </el-table-column>
            <el-table-column label="总价/万" prop="total_price" align="center"></el-table-column>
            <el-table-column label="朝向" prop="house_orient_name" align="center">
            </el-table-column>
            <el-table-column label="装修" prop="fitment_value" align="center">
            </el-table-column>
            <el-table-column label="面积/㎡" prop="area" align="center">
            </el-table-column>
            <el-table-column label="特色" prop="tags" align="center" width="100">
                <template slot-scope="scope">
                    <el-tooltip placement="top-start">
                        <div slot="content">{{scope.row.tags}}</div>
                        <span class="table_ellipsis">{{scope.row.tags}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                label="是否发布"
                prop="state"
                align="center">
                <div slot-scope="scope" >
                    <el-tag type="success" v-if="scope.row.state">已发布</el-tag>
                    <el-tag type="danger" v-else>未发布</el-tag>
                </div>
            </el-table-column>
            <el-table-column
                label="状态"
                prop="nstatus"
                align="center">
                <div slot-scope="scope" >
                    <span>{{scope.row.nstatus | nstatusFun}}</span>
                </div>
            </el-table-column>
            <el-table-column
                label="房源维护人"
                prop="true_name"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                label="发布人"
                prop="publisher"
                align="center">
            </el-table-column>
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
                    <template v-if="scope.row.is_save==1">
                        <el-button v-if="scope.row.status==2" type="text" class="el-icon-sort color-success" size="mini" @click="handleCooperation(scope.$index,scope.row)">发布合作</el-button>
                        <el-button v-if="scope.row.status==1" type="text" class="el-icon-sort color-info" size="mini" @click="handleCooperation(scope.$index,scope.row)">取消合作</el-button>
                    </template>
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
        };
    },
    created() {
        
    },
    methods: {
        // 获取数据
        getListData() {
            this.listLoading = true
            console.log(this.listQuery)
            let params = JSON.parse(JSON.stringify(this.listQuery))
            params.unitType==0?'6':params.unitType
            util.ajax.post("/api/Newsapi/house_list",params).then(
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
        // 查看
        handleExamine(index, row){
            this.$router.push({path: '/house/secondHouse/details', query: {id: row.id}});
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
        // 合作
        handleCooperation(index,row){
            util.ajax.post('/api/Newsapi/house_set',{hid:row.id,status:row.status==2?1:2}).then(
                res => {
                    if (res.errcode == 0) {
                        this.$message.success('操作成功');
                        if(row.status==2){
                            this.tableData[index].status = 1
                        }else{
                            this.tableData[index].status = 2
                        }
                    } else if (res.errcode == 404) {
                        this.$router.push('../systen/error')
                    } else {
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
