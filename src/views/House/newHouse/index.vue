<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 二手房列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            暂未开发
        </div>
    </div>
</template>

<script>
import util from "@/saaslib/util";
import { formatDate,roomType } from "@/filters";
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
                type: 2, //房屋类型（1租房 2买房 3新房）
                areaCode: '', // 行政区
                block_id: '', // 商圈
                towards: '', // 朝向
                decoration: '', // 装修
                unitType: '', // 居室： 1，2，3，4，5室
                housing_use: '', // 房屋用途：普通住宅、车位
                nstatus:'', // 状态：已售，在售，有效，无效，暂不售
                yusuan_pre: '',  // 面积：范围
                yusuan_end: '', 
                area_pre: '', // 价格：范围
                area_end: '', 
                store_type: '1', //归属
            }
        };
    },
    created() {
    },
    mounted() {
        // this.getListData();
        // this.getAreaList()
    },
    methods: {
        // 获取数据
        getListData() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            this.$refs.tableList.getListData();
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            this.getListData();
        },
        // 清空搜索项
        emptybtn() {
            this.listQuery = {
                page: 1, //分页码
                length: 10, //分页数
                order_type: 4, //1总价从低到高 2总价从高到弟 3面积从大到下 4最新发布
                type: 2, //房屋类型（1租房 2买房 3新房）
                areaCode: '', // 行政区
                block_id: '', // 商圈
                towards: '', // 朝向
                decoration: '', // 装修
                unitType: '', // 居室： 1，2，3，4，5室
                housing_use: '', // 房屋用途：普通住宅、车位
                nstatus:'', // 状态：已售，在售，有效，无效，暂不售
                yusuan_pre: '',  // 面积：范围
                yusuan_end: '', 
                area_pre: '', // 价格：范围
                area_end: '', 
            },
            this.getlist()
        },
        getAreaList(){
            // this.$refs.screening.getAreaCode(util.cookies.get('areaCode'))
            this.$refs.screening.getAreaCode('110100')

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
