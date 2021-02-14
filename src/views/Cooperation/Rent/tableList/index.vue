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
            <el-table-column label="行政区" prop="region_name" align="center" width="120"></el-table-column>
            <el-table-column label="商圈" prop="block_name" align="center" width="120"></el-table-column>
            <el-table-column label="门店名称" prop="store_name" align="center" width="120"></el-table-column>
            <el-table-column
                label="居室"
                prop="rhval"
                align="center">
                <div slot-scope="scope">{{scope.row.rhval | roomType}}</div>
            </el-table-column>
            <el-table-column label="租金 /元" prop="price" align="center"></el-table-column>
            <el-table-column label="出租方式" prop="rent_model" align="center"></el-table-column>
            <el-table-column label="付款方式" prop="payment" align="center"></el-table-column>
            <el-table-column label="朝向" prop="house_orient_name" align="center">
            </el-table-column>
            <el-table-column label="出租面积/㎡" prop="area" align="center" width="120">
            </el-table-column>
            <el-table-column
                label="房源维护人"
                prop="true_name"
                align="center"
                width="100">
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
            let params = JSON.parse(JSON.stringify(this.listQuery))
            params.unitType==0?'6':params.unitType
            util.ajax.post("/api/Newsapi/p_list",this.listQuery).then(
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
            this.$router.push({path: '/cooperation/rent/details', query: {id: row.id}});
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
