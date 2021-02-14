<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 委托
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作类 -->
            <div class="handle-box">
                <div class="searchwrap">
                    <el-row class="searchwrap-header" :gutter="12" type="flex" justify="space-between">
                        <el-col :md="12" :lg="10" :xl="8" class="searchItem">
                            <div class="label">地区：</div>
                            <regionSelect ref="regionSelect" @fetchCbRegion="fetchCbRegion"></regionSelect>
                        </el-col>
                        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
                            <div class="label">类型：</div>
                            <el-select class="inputSearchItem" v-model="listQuery.type" size="small" placeholder="请选择" clearable>
                                <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :md="8" :lg="6" :xl="4" class="searchItem searchItemBtn">
                            <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
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
import regionSelect from "@/components/regionSelect/index"; //省市区
import tableList from "./tableList/index"; //表格列表
export default {
    components: { regionSelect, tableList },
    name: 'entrust',
    data() {
        return {
            // 查询条件
            listQuery: {
                province: '',
                city: '',
                district: '',
                page: 1,
                length: 10,
                type: ''
            },
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
    mounted() {
        this.handleSearch();
    },
    methods: {
        // 省市区回显
        fetchCbRegion(data){
            this.listQuery.province = data.province
            this.listQuery.city = data.city
            this.listQuery.district = data.district
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            // 获取数据
            this.$refs.tableList.getListData();
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
