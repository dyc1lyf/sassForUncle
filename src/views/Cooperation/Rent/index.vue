<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 租房合作
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作类 -->
            <div class="handle-box">
                <screening
                    ref="screening"
                    :listQuery="listQuery"
                >
                    <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
                    <el-button size="small" @click="emptybtn">清空</el-button>
                </screening>
            </div>
            <!-- 内容类 -->
            <div class="table-box">
                <tableList ref="tableList" :listQuery="listQuery"></tableList>
            </div>
        </div>
    </div>
</template>

<script>
import util from "@/saaslib/util";
import screening from "./screening/index"; //筛选条件
import tableList from "./tableList/index"; //表格列表
export default {
    components: { screening, tableList },
    name: 'secondHouse',
    data() {
        return {
            // 查询条件
            listQuery: {
                page: 1, //分页码
                length: 10, //分页数
                order_type: 4, //1总价从低到高 2总价从高到弟 3面积从大到下 4最新发布
                type: 1, //房屋类型（1租房 2买房 3新房）
                areaCode: '', // 行政区
                block_id: '', // 商圈
                towards: '', // 朝向
                decoration: '', // 装修
                unitType: '', // 居室： 1，2，3，4，5室
                manner: '', // 出租方式
                payment: '', // 付款方式
                yusuan_pre: '',  // 面积：范围
                yusuan_end: '', 
                area_pre: '', // 价格：范围
                area_end: '', 
                store_name: ''
            }
        };
    },
    created() {
    },
    mounted() {
        this.handleSearch();
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            this.$refs.tableList.getListData()
        },
        // 清空搜索项
        emptybtn() {
            this.listQuery = {
                page: 1, //分页码
                length: 10, //分页数
                order_type: 4, //1总价从低到高 2总价从高到弟 3面积从大到下 4最新发布
                type: 1, //房屋类型（1租房 2买房 3新房）
                areaCode: '', // 行政区
                block_id: '', // 商圈
                towards: '', // 朝向
                decoration: '', // 装修
                unitType: '', // 居室： 1，2，3，4，5室
                manner: '', // 出租方式
                payment: '', // 付款方式
                yusuan_pre: '',  // 面积：范围
                yusuan_end: '', 
                area_pre: '', // 价格：范围
                area_end: '', 
                store_name: ''
            },
            this.$nextTick(()=>{
                this.$refs.tableList.getListData()
            })
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
