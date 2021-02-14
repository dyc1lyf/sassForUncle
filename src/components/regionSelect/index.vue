<!-- 省市区联动 -->
<template>
    <div>
        <el-col :span="8">
            <el-select v-model="listQuery.province" placeholder="请选择" @change="changeProvince">
                <el-option
                v-for="item in areaList.provinceList"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-select v-model="listQuery.city" placeholder="请选择" @change="changeCity">
                <el-option
                v-for="item in areaList.cityList"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-select v-model="listQuery.county" placeholder="请选择" @change="changeCounty">
                <el-option
                v-for="item in areaList.countyList"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId">
                </el-option>
            </el-select>
        </el-col>
    </div>
</template>
<script>
import util from "@/saaslib/util";
export default {
    name: 'regionSelect',
    computed: {
    },
    data() {
        return {
            // 省市区数组
            areaList:{
                provinceList: [],
                cityList:[],
                countyList:[], 
            },
            // 省市区
            listQuery:{
                province: '',
                city: '',
                county: '',
            }
        };
    },
    created() {

    },
    mounted() {
        this.getProvince('provinceList')
    },
    methods: {
        // 获取地区
        getProvince(label, type) {
            util.ajax.post('/api/AppBasis/linkage', {type: type ? type : 0}).then(res=>{
                this.areaList[label] = res.data
            })
        },
        changeProvince(val){
            this.listQuery.city = ''
            this.listQuery.county = ''
            this.$emit('fetchCbRegion', this.listQuery)
            this.getProvince('cityList', val)
        },
        changeCity(val){
            this.listQuery.county = ''
            this.$emit('fetchCbRegion', this.listQuery)
            this.getProvince('countyList', val)
        },
        changeCounty(){
            this.$emit('fetchCbRegion', this.listQuery)
        },
    }
};
</script>
