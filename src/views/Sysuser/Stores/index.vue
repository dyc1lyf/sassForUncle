<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 门店管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button @click="handleEdit()" type="primary" size="small">新增门店</el-button>
            </div>
            <!-- 内容类 -->
            <div class="table-box">
                <tableList ref="tableList" :listQuery="listQuery" @handleEdit="handleEdit"></tableList>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="isAdd ? '门店添加' : '门店编辑'" v-dialogDrag :visible.sync="editVisible" width="40%">
            <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="rules" class="el-form-visible">
                <el-form-item label="所在城市" prop="title">
                    <el-col :span="18">
                        <el-select v-model="updateForm.areaCode" filterable placeholder="请选择城市">
                            <el-option v-for="item in cityList" :key="item.areaCode" :label="item.city" :value="item.areaCode" clearable></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="门店名称" prop="title">
                    <el-col :span="18">
                        <el-input v-model="updateForm.title" autocomplete="off" placeholder="请输入门店名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="门店logo" prop="store_pic">
                    <uploadImg 
                        :initialData="updateForm.store_pic" 
                        :isMultiple='true' 
                        :limitNum="1" 
                        :isClear='false' 
                        :sizeLimit='10' 
                        :data="{type: 'image'}"
                        uploadUrl="/api/Newsapi/uplode"
                        callBackName="addRoomPhotosUrl" 
                        @fetchCallback="fetchCbPicUrl" 
                        ref="fetchCbImgPicUrl">
                    </uploadImg>
                </el-form-item>
                <el-form-item :label="item.type_name" v-for="(item, index) in updateForm.app_info" :key="index">
                    <el-row>
                        <el-col :span="8">
                            <el-select v-model="item.type" placeholder="请选择小程序类型" @change="function(val){return changeType(val,index)}">
                            <el-option
                                v-for="app in appList"
                                :key="app.value"
                                :label="app.label"
                                :value="app.value">
                            </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="item.appid" autocomplete="off" placeholder="请输入小程序appid"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button icon="el-icon-plus" @click="handlePlus"></el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="门店愿景" prop="company_vision">
                    <el-col :span="18">
                        <el-input v-model="updateForm.company_vision" autocomplete="off" placeholder="请输入愿景"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="门店介绍" prop="store_description">
                    <el-col :span="18">
                        <el-input type="textarea" v-model="updateForm.store_description" autocomplete="off" placeholder="请输入介绍"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-col :span="18">
                        <!-- <el-input v-model="updateForm.address" autocomplete="off" placeholder="请输入详细地址"></el-input> -->
                        <el-select style="width: 100%" v-model="updateForm.address" filterable remote placeholder="请输入详细地址" :remote-method="addressRemindSearch" :loading="loading" @change="addressRemindChange" clearable>
                            <el-option
                                v-for="item in addressArr"
                                :key="item.id"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="门店定位" prop="location">
                    <el-col :span="18">
                        <el-input v-model="updateForm.location" autocomplete="off" placeholder="选择详细地址自动生成"></el-input>
                        <div id="showMap"></div>
                    </el-col>
                </el-form-item> 
                <el-form-item label="管理员姓名" prop="true_name">
                    <el-col :span="18">
                        <el-input v-model="updateForm.true_name" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号(账号)" prop="phone_number">
                    <el-col :span="18">
                        <el-input v-model="updateForm.phone_number" autocomplete="off" placeholder="请输入手机号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-col :span="18">
                        <el-input v-model="updateForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formClose('updateForm')">取 消</el-button>
                <el-button type="primary" @click="formEdit('updateForm')" :loading="formLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import util from "@/saaslib/util";
import cityList from '@/utils/citys'
import uploadImg from "@/components/Upload/upload"
import tableList from "./tableList/index"; //表格列表

export default {
    components: { uploadImg, tableList },
    name: 'basetable',
    data() {
        return {
            listQuery: {
                ispage: 1,
                page: 1,
                length: 10
            },
            appList:[{
                label: '微信小程序',
                value: 1
            },{
                label: '头条小程序',
                value: 2
            }],
            cityList: [],
            addressArr: [],
            rules:{
                title:[
                    {required: true, message: '请输入门店名称', trigger: 'blur' }
                ],
                address:[
                    {required: true, message: '请输入详细地址', trigger: 'blur' }
                ],
                location:[
                    {required: true, message: '请点击获取定位', trigger: 'blur' }
                ]
            },
            // 列表多选数组
            multipleSelection: [],
            delList: [],
            editVisible: false,
            updateForm:{
                title: '',
                store_pic: '',
                company_vision:'',
                store_description: '',
                tel_phone: '',
                remark: '',
                true_name: '',
                phone_number: '',
                group_id: 12,
                pwd: '',
                address: '',
                app_info:[{
                    appid: '',
                    type: 1,
                    type_name:'小程序'
                }]
            },
            formLoading: false,
            loading: false,
            isAdd: false
        };
    },
    mounted() {
        for(let key in cityList.city_list){
            this.cityList.push({
                areaCode: key,
                city:cityList.city_list[key]
            })
        }
        this.handleSearch();
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'length', 10);
            // 获取数据
            this.$refs.tableList.getListData();
        },
        // 编辑
        handleEdit(row){
            if(row){ //编辑
                this.updateForm = JSON.parse(JSON.stringify(row))
                this.updateForm.areaCode = this.updateForm.areaCode+''
                this.isAdd = false
                this.editVisible = true
            }else{ //新增
                this.updateForm = {
                    title: '',
                    store_pic: '',
                    company_vision:'',
                    store_description: '',
                    tel_phone: '',
                    remark: '',
                    true_name: '',
                    phone_number: '',
                    group_id: 12,
                    pwd: '',
                    app_info:[{
                        appid: '',
                        type: 1,
                        type_name:'小程序'
                    }]
                }
                this.isAdd = true
                this.editVisible = true
            }
        },
        // 表单提交
        formEdit(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(this.formLoading){
                    return
                }
                if (valid) {
                    this.formLoading = true;
                    let params = {}
                    params = {...params, ...this.updateForm}
                    params.app_info = JSON.stringify(params.app_info)
                    util.ajax.post('/api/Login/store_registration',params).then(
                        res=>{
                            if(res.errcode == 0){
                                this.formClose(ruleForm)
                                this.$message.success('操作成功')
                                this.handleSearch()
                            }else {
                                this.formLoading = false;
                                this.$message.error(res.errmsg);
                            }
                        }
                    )
                } else {
                    return false;
                }
            });
        },
        formClose(ruleForm){
            this.$refs[ruleForm].resetFields();
            this.formLoading = false;
            this.editVisible = false
        },
        
        handlePlus(){
            this.updateForm.app_info.push({
                appid: '',
                type: '',
                type_name:'小程序'
            })
        },
        changeType(val, index){
            let obj = this.appList.find(item=>{
                return item.value == val
            })
            this.updateForm.app_info[index].type_name = obj.label
        },
        // 上传图片
        fetchCbPicUrl(cbName, resData) {
            this.updateForm.store_pic = resData.join(',')
        },
        // 地址搜索
        addressRemindSearch(query) {
            if (query !== "") {
                let that = this 
                that.loading = true;
                AMap.plugin('AMap.Autocomplete',function(){
                    var autoOptions = {
                        city: that.updateForm.areaCode, //城市，默认全国
                        radius: 1000
                    };
                    var geocoder = new AMap.Autocomplete(autoOptions)
                    geocoder.search(query, function(status, result){
                        result.tips.forEach((element,index) => {
                            element.value = element.district + element.name
                        });
                        that.addressArr = result.tips;
                        that.loading = false;
                    })
                })
            } else {
                this.addressArr = [];
            }
        },
        // 地址赋值
        addressRemindChange(e) {
            if(e){
                let data = this.addressArr.find(function(item){
                    if(item.value==e){
                        return item
                    }else{
                        return ''
                    }
                })
                this.updateForm.location = data.location.lng + ',' + data.location.lat
            }else{
                this.updateForm.location = ''
            }
            
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
