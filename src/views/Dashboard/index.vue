<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="user-info-box" style="height:527px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ userInfo.username }}</div>
                            <div>{{userInfo.company_name}} {{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>
                    <el-button class="user-info-edit" type="text" icon="el-icon-edit"  @click="handleEdit()">编辑</el-button>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{user}}</div>
                                    <div>房源管理（二手房）</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{rent}}</div>
                                    <div>房源管理（租房）</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{house}}</div>
                                    <div>客源数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-col :span="12">
                    <el-card shadow="hover" style="height: 403px;">
                        <div slot="header" class="clearfix">
                            <span>最新动态</span>
                        </div>
                        <div :key="item.id" v-for="item in list">
                            <div class="m_left"
                                    style="width: 100%;height: 40px;line-height: 40px;border-bottom: 1px solid #ebeef5;font-size: 13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                <div class="tips">用户：“ <span class="orange">{{item.member.nickname}}</span> ”，
                                    <!-- 订单号“ <span class="orange">{{item.number}}</span> ”-->
                                    <!--  <span>，{{item.type}}-</span>-->
                                    <span >金额：<span class="orange">{{item.amount}}</span></span>，
                                    <span >时间：<span class="orange">{{item.created_at}}</span></span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" style="height:403px;">
                        <div slot="header" class="clearfix">
                            <span>业绩排行</span>
                        </div>经纪人1
                        <el-progress :percentage="71.3" color="#42b983"></el-progress>经纪人2
                        <el-progress :percentage="24.1" color="#f1e05a"></el-progress>经纪人3
                        <el-progress :percentage="13.7"></el-progress>经纪人4
                        <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                    </el-card>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
        <!-- 编辑弹出框 -->
        <el-dialog title="门店编辑" v-dialogDrag :visible.sync="editVisible" width="40%">
            <el-form ref="updateForm" :model="updateForm" label-width="100px" class="el-form-visible">
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
import Schart from 'vue-schart';
import util from "@/saaslib/util";
import cityList from '@/utils/citys'
import uploadImg from "@/components/Upload/upload"

export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: true
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: true
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            },
            house: '',
            user: '',
            rent: '',
            notes:'',
            state:'',
            rent_s:0,
            house_s:0,
            notes_s:0,
            state_s:0,
            list:'',
            chartData: {
                columns: ['日期', '人员数量', '租房会员', '买房会员'],
                rows: [],
            },
            chartDatas: {
                columns: ['device', 'quantity'],
                rows: []
            },
            // 门店编辑弹出框
            cityList: [],
            addressArr: [],
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
            loading: false,
            formLoading: false,

        };
    },
    components: {
        Schart, uploadImg
    },
    computed: {
        role() {
            return this.userInfo.group_id == 12 ? '店长' : '经纪人';
        },
        userInfo() {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            return userInfo
        },
        storeInfo() {
            let storeInfo = JSON.parse(localStorage.getItem('storeInfo'));
            return storeInfo
        }
    },
    created() {
    },
    activated() {
    },
    deactivated() {
    },
    mounted() {
        console.log(this.userInfo)
        console.log(this.storeInfo)
        for(let key in cityList.city_list){
            this.cityList.push({
                areaCode: key,
                city:cityList.city_list[key]
            })
        }
        this.getListData()
    },
    methods: {
        getListData(){
            util.ajax.post("/api/Home").then(
                res=>{
                    if(res.errcode == 0){
                        console.log(res.data)
                        this.rent = res.data.rent;
                        this.user = res.data.user;
                        this.house = res.data.house;
                        this.notes = res.data.notes;
                        this.state = res.data.state;
                        this.rent_s = res.data.rent_s;
                        this.house_s = res.data.house_s;
                        this.notes_s = res.data.notes_s;
                        this.state_s = res.data.state_s;
                        this.list = res.data.list;
                        this.chartData.rows = res.data.facility;
                        this.chartDatas.rows = res.data.device;
                    }
                }
            )
        },
        // 编辑
        handleEdit(){
            this.updateForm = JSON.parse(JSON.stringify(this.storeInfo))
            this.updateForm.areaCode = this.updateForm.areaCode + ''
            this.editVisible = true
        },
        // 表单提交
        formEdit(){
            this.formLoading = true;
            let params = {}
            params = {...params, ...this.updateForm}
            params.app_info = JSON.stringify(params.app_info)
            util.ajax.post('/api/Login/store_registration',params).then(
                res=>{
                    if(res.errcode == 0){
                        this.formClose()
                        this.$message.success('操作成功')
                        // 成功后vuex更改存储信息
                    }else {
                        this.formLoading = false;
                        this.$message.error(res.errmsg);
                    }
                }
            )
        },
        formClose(){
            this.formLoading = false;
            this.editVisible = false
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
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.user-info-box{
    position: relative;
}
.user-info-edit{
    position: absolute;
    right: 15px;
    top: 5px;
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
.orange {
    color: #FF6600;
}
</style>
