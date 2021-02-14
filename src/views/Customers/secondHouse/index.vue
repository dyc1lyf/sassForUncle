<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 二手房客源
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
                    <el-button size="small" @click="handleEdit()" type="primary">新增</el-button>
                </screening>
            </div>
            <!-- 内容类 -->
            <div class="table-box">
                <tableList ref="tableList" :listQuery="listQuery" @handleEdit="handleEdit"></tableList>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="isAdd ? '客源添加' : '客源编辑'" v-dialogDrag :visible.sync="editVisible" width="40%" :close-on-click-modal='false'>
            <el-form ref="form" :model="updataForm" label-width="100px" class="el-form-visible">
                <el-form-item label="客户姓名">
                    <el-col :span="18">
                        <el-input v-model="updataForm.username" placeholder="请输入客户姓名" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="客户电话">
                    <el-col :span="18">
                        <el-input v-model="updataForm.phone_number" placeholder="请输入电话"  autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-col :span="18">
                        <el-input v-model="updataForm.card" placeholder="请输入身份证号" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="位置">
                    <el-col :span="20">
                        <regionSelect ref="regionSelect" @fetchCbRegion="fetchCbRegion"></regionSelect>
                    </el-col>
                </el-form-item>
                <el-form-item label="小区">
                    <el-col :span="11">
                        <el-select v-model="updataForm.community" filterable remote placeholder="请输入小区名称" :remote-method="villageRemindSearch" :loading="loading" @change="villageRemindChange" clearable>
                            <el-option
                                v-for="item in villageArr"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="装修">
                    <el-col :span="11">
                        <el-select v-model="updataForm.decoration" placeholder="请选择">
                            <el-option
                            v-for="item in demandData.decoration"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="户型">
                    <el-col :span="11">
                        <el-select v-model="updataForm.living_room" placeholder="请选择">
                            <el-option
                                v-for="item in demandData.unitType"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="楼层">
                    <el-col :span="11">
                        <el-input v-model="updataForm.floor"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label='总价' prop="rent">
                    <el-col :span="8">
                        <el-input v-model="updataForm.rent" placeholder=""></el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center">-</el-col>
                    <el-col :span="8">
                        <el-input v-model="updataForm.rent_e"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="面积">
                    <el-col :span="8">
                        <el-input v-model="updataForm.area"></el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center">-</el-col>
                    <el-col :span="8">
                        <el-input v-model="updataForm.area_e"></el-input>
                    </el-col>
                </el-form-item>
                 <el-form-item label="目的" prop="unitType">
                    <el-radio-group v-model="updataForm.objective">
                        <el-radio :label="1">换房</el-radio>
                        <el-radio :label="2">结婚</el-radio>
                        <el-radio :label="3">就学</el-radio>
                        <el-radio :label="4">投资</el-radio>
                        <el-radio :label="5">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import util from "@/saaslib/util";
import { mapGetters } from 'vuex'
import screening from "./screening/index"; //筛选条件
import tableList from "./tableList/index"; //表格列表
import regionSelect from "@/components/regionSelect/index"; //省市区
export default {
    components: { screening, tableList,regionSelect },
    name: 'personnelAgent',
    computed: {
        areaCode() {
            let areaCode = JSON.parse(localStorage.getItem('storeInfo')).areaCode;
            return areaCode
        },
        // 赋值demandData
        ...mapGetters('configList', {demandData: '_BackDemandData'}),
    },
    data() {
        return {
            loading: false,
            // 查询条件
            listQuery: {
                type: '2',
                page: 1,
                length: 15,
                rent: "",
                area: "",
                business: "",
            },
            villageArr: [],
            // 表单
            updataForm: {
                username: '',
                phone_number: '',
                card:'',
                type: 2,
                province: null,
                city: null,
                county: null,
                community: '',
                address: '',
                location: '',
                unitType: '',
                floor: '',
                floor_e: '',
                rent: '',
                rent_e: '',
                area: '',
                area_e:'',
                remarks: ''
            },
            // 获取下拉框列表值 
            getDemandDataValue: 'decoration,unitType',
            isAdd: true,
            editVisible: false,
        };
    },
    created() {
    },
    mounted() {
        this.handleSearch();
        // 获取对应筛选项数组
        this.$store.dispatch('configList/_GetDemandData', this.getDemandDataValue)
    },
    methods: {
        // 省市区回显
        fetchCbRegion(data){
            this.updataForm.province = data.province
            this.updataForm.city = data.city
            this.updataForm.district = data.district
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            // 获取数据
            this.$refs.tableList.getListData();
        },
        // 小区搜索
        villageRemindSearch(query) {
        if (query !== "") {
            this.loading = true;
            util.ajax.post('/api/Newsapi/comm_list', {comm_name: query,areaCode: this.updataForm.county}).then(res => {
                if (res.errcode == 0) {
                    this.loading = false;
                    res.data.forEach(item => {
                        item.label = item.comm_name;
                        item.id = item.comm_id;
                        item.value = item.comm_name;
                    });
                    this.villageArr = res.data;
                } else {
                    this.loading = false;
                    this.villageArr = [];
                }
            })
        } else {
            this.villageArr = [];
        }
        },
        // 小区赋值
        villageRemindChange(e) {
            this.updataForm.lng = this.villageArr.find(function(item){
                if(item.comm_id==e){
                    return item
                }else{
                    return ''
                }
            }).lng
            this.updataForm.lat = this.villageArr.find(function(item){
                if(item.comm_id==e){
                    return item
                }else{
                    return ''
                }
            }).lat
        },
        // 编辑人员
        handleEdit(row){
            if(row){ //编辑
                this.form = JSON.parse(JSON.stringify(row))
                this.isAdd = false
                this.editVisible = true
            }else{ //新增
                this.form = {
                    type: '1',
                    page: 1,
                    length: 15,
                    rent: "",
                    area: "",
                    business: "",
                }
                this.isAdd = true
                this.editVisible = true
            }
        },
        // 表单提交
        updateForm(){
            util.ajax.post("/api/Store/agent_save",this.form).then(
                res=>{
                    if(res.errcode == 0){
                        this.editVisible = false
                        this.$message.success('保存成功')
                        this.handleSearch()
                    }else {
                        this.$message.error(res.errmsg);
                    }
                }
            )
        }
    }
};
</script>

<style scoped>

</style>
