<template>
    <div class="editHouseInfoWrap">
        <div class="infoBlock">
            <div class="editTitle">
                <span>基本信息</span>
            </div>
            <div class="editInfoMain">
                <el-form
                    ref="essentialForm"
                    :model="formData"
                    label-width="96px"
                    label-position="right">
                    <!-- 行政区、小区名称 -->
                    <div class="infoRow flex">
                        <el-form-item label="行政区">
                            <el-select v-model="formData.areaCode" placeholder="请选择" @change="areaChange" clearable>
                                <el-option :key="item.areaCode"
                                    :label="item.areaName"
                                    :value="item.areaCode"
                                    v-for="item in areaArr "
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="小区名称">
                            <el-select v-model="formData.comm_id" filterable remote placeholder="请输入小区名称" :remote-method="villageRemindSearch" :loading="loading" size="medium" @change="villageRemindChange" clearable>
                                <el-option
                                    v-for="item in villageArr"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <!-- 房源标题 -->
                    <div class="infoRow flex">
                        <el-form-item label="房源标题" class="w63per">
                            <el-input
                                v-model="formData.long_title"
                                placeholder="请填写房源标题"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <!-- 房源描述 -->
                    <div class="infoRow flex">
                        <el-form-item label="房源描述" class="w63per">
                            <el-input type="textarea" v-model="formData.description"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 业主心态 -->
                    <div class="infoRow flex">
                        <el-form-item label="业主心态" class="w63per">
                            <el-input type="textarea" v-model="formData.owner_mentality"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 服务介绍 -->
                    <div class="infoRow flex">
                        <el-form-item label="服务介绍" class="w63per">
                            <el-input type="textarea" v-model="formData.service_Introduction"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 居室、建筑面积、套内面积 -->
                    <div class="infoRow flex">
                        <el-form-item prop="living_room" label="居室"> 
                            <div class="flex w268">
                                <div class="inline-div">
                                    <el-input v-model="formData.alive" class="w58"></el-input>
                                    <span class="span10 pd-rt0">室</span> 
                                </div>
                                <div class="inline-div">
                                    <el-input v-model="formData.blive" class="w58"></el-input>
                                    <span class="span10 pd-rt0">厅</span>
                                </div>
                                <div class="inline-div">
                                    <el-input v-model="formData.clive" class="w58"></el-input>
                                    <span class="span10 pd-rt0">卫</span>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="area" label="建筑面积">
                            <el-input
                                class="w268"
                                :value="formData.area" 
                                @input="e => formData.area = noChineseOnly (e,3,true)"
                                placeholder="请输入建筑面积"
                            >
                                <template slot="append">㎡</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="floorarea" label="套内面积">
                            <el-input
                                class="w268"
                                :value="formData.floorarea"
                                @input="e => formData.floorarea = noChineseOnly (e,3,true)"
                                placeholder="请输入套内面积"
                            >
                                <template slot="append">㎡</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <!-- 总价、首付、朝向 -->
                    <div class="infoRow flex">
                        <el-form-item prop="price" label="总价"> 
                            <el-input
                                class="w268"
                                v-model="formData.price"
                                placeholder="请输入总价"
                            >
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="price" label="首付"> 
                            <el-input
                                class="w268"
                                v-model="formData.down_payments"
                                placeholder="请输入首付"
                            >
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="房屋朝向">
                            <el-select
                                v-model="formData.towards"
                                collapse-tags
                                filterable
                                placeholder="请选择"
                                class="w268"
                                clearable
                            >
                                <el-option
                                    v-for="item in demandData.towards"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <!-- 所在楼层、楼层高低、总楼层 -->
                    <div class="infoRow flex"> 
                        <el-form-item label="所在楼层">
                            <el-input
                                class="w268"
                                v-model="formData.current_floor"
                                placeholder="请输入所在楼层"
                            >
                                <template slot="append">层</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="floor" label="总楼层"> 
                            <el-input
                                class="w268"
                                v-model="formData.floor"
                                placeholder="请输入总楼层"
                            >
                                <template slot="append">层</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="楼层高低">
                            <el-select v-model="formData.floor_tag" placeholder="请选择" class="w268" clearable>
                                <el-option
                                    v-for="item in demandData.floor"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <!-- 装修情况、供暖方式 、建筑形式  -->
                    <div class="infoRow flex">
                        <el-form-item label="装修情况">
                            <el-select v-model="formData.decoration" placeholder="请选择" class="w268" clearable>
                                <el-option
                                    v-for="item in demandData.decoration"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供暖方式">
                            <el-select v-model="formData.heating" placeholder="请选择" class="w268" clearable>
                                <el-option
                                    v-for="item in demandData.heating"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="建筑形式">
                            <el-select v-model="formData.architectural_form" placeholder="请选择" class="w268" clearable>
                                <el-option
                                    v-for="item in demandData.architectural_form"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        
                    </div>
                    <!-- 配备电梯  -->
                    <div class="infoRow flex">
                        <el-form-item prop="comm_contain_pert" label="有电梯">
                            <el-checkbox v-model="formData.elevator"></el-checkbox>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!-- 图片视频 -->
            <div class="editTitle">
                <span>图片视频</span>
            </div>
            <div class="editInfoMain">
                <el-form
                    ref="essentialForm"
                    :model="formData"
                    label-width="96px"
                    label-position="right"
                >
                    <!-- 室内图 -->
                    <div class="infoRow flex flex-start">
                        <el-form-item label="室内图" prop="room_photos">
                            <uploadImg 
                                :initialData="formData.room_photos" 
                                :isMultiple='true' 
                                :limitNum="9" 
                                :isClear='false' 
                                :sizeLimit='10' 
                                :data="{type: 'image'}"
                                uploadUrl="/api/Newsapi/uplode"
                                callBackName="addRoomPhotosUrl" 
                                @fetchCallback="fetchCbPicUrl" 
                                ref="fetchCbImgPicUrl">
                            </uploadImg>
                        </el-form-item>
                    </div>
                    <!-- 户型图 -->
                    <div class="infoRow flex flex-start">
                        <el-form-item label="户型图" prop="model_photos">
                            <uploadImg 
                                :initialData="formData.model_photos" 
                                :isMultiple='true' 
                                :limitNum="9" 
                                :isClear='false' 
                                :sizeLimit='10' 
                                :data="{type: 'image'}"
                                uploadUrl="/api/Newsapi/uplode"
                                callBackName="addModelPhotosUrl" 
                                @fetchCallback="fetchCbPicUrl" 
                                ref="fetchCbImgPicUrl">
                            </uploadImg>
                        </el-form-item>
                    </div> 
                    <!-- 视频 -->
                    <div class="infoRow flex flex-start">
                        <el-form-item label="视频" prop="description">
                            <uploadVideo 
                                :initialData="formData.video_src" 
                                :isMultiple='true' :limitNum="1" 
                                :sizeLimit='200' 
                                :data="{type: 'video'}"
                                uploadUrl="/api/Newsapi/uplode" 
                                callBackName="addVideoUrl" 
                                @fetchCallback="fetchCbVideo" 
                                ref="fetchCbVideoUrl"></uploadVideo>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!-- 交易信息 -->
            <div class="editTitle">
                <span>交易信息</span>
            </div>
            <div class="editInfoMain">
                <el-form
                    ref="essentialForm"
                    :model="formData"
                    label-width="96px"
                    label-position="right"
                >
                    <!-- 房屋用途、房屋权属 -->
                    <div class="infoRow flex">
                        <el-form-item label="房屋用途">
                            <el-select 
                                v-model="formData.housing_use" 
                                placeholder="请选择" 
                                class="w268"
                                clearable>
                                <el-option
                                    v-for="item in demandData.housing_use"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                    clearable
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="房屋权属">
                            <el-select
                                v-model="formData.property_right"
                                collapse-tags
                                filterable
                                placeholder="请选择"
                                class="w268"
                                clearable
                            >
                                <el-option
                                    v-for="item in demandData.property_right"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div> 
                    <!-- 房屋年限、是否唯一 -->
                    <div class="infoRow flex">
                        <el-form-item label="房屋年限">
                            <el-select 
                                v-model="formData.housing_years" 
                                placeholder="请选择" 
                                class="w268"
                                clearable>
                                <el-option
                                    v-for="item in demandData.housing_years"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                    clearable
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否唯一">
                            <el-select
                                v-model="formData.only_house"
                                collapse-tags
                                filterable
                                placeholder="请选择"
                                class="w268"
                                clearable
                            >
                                <el-option
                                    v-for="item in statusArr.onlyHouseArr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div> 
                </el-form>
            </div>
            <!-- 特色信息 -->
            <div class="editTitle">
                <span>特色信息</span>
            </div>
            <div class="editInfoMain">
                <el-form
                    ref="essentialForm"
                    :model="formData"
                    label-width="96px"
                    label-position="right"
                >
                    <!-- 特色 -->
                    <div class="infoRow flex">
                        <el-form-item label="特色" class="w63per">
                            <el-checkbox-group v-model="formData.features" >
                                <el-checkbox :label="item.id" v-for="item in demandData.features" :key="item.id">{{item.value}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <!-- 核心卖点 -->
                    <div class="infoRow flex">
                        <el-form-item label="核心卖点" class="w63per">
                            <el-input type="textarea" v-model="formData.selling_point"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!-- 销售信息 -->
            <div class="editTitle">
                <span>销售信息</span>
            </div>
            <div class="editInfoMain">
                <el-form
                    ref="essentialForm"
                    :model="formData"
                    label-width="96px"
                    label-position="right"
                >
                    <!-- 维护人、联系方式 -->
                    <div class="infoRow flex">
                        <el-form-item label="维护人姓名">
                            <el-select v-model="formData.broker_id" filterable remote placeholder="请选择" :remote-method="brokerSearch" :loading="loading" size="medium" clearable>
                                <el-option
                                v-for="item in brokerArr"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!-- 业主信息 -->
            <div class="editTitle">
                <span>业主信息</span>
            </div>
            <div class="editInfoMain">
                <el-form
                    ref="essentialForm"
                    :model="formData"
                    label-width="96px"
                    label-position="right"
                >
                    <!-- 业主、联系方式 -->
                    <div class="infoRow flex">
                        <el-form-item label="业主姓名">
                            <el-input
                                v-model="formData.cname"
                                placeholder="请填写业主姓名"
                                maxlength="20"
                                class="w268"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="业主电话">
                            <el-input 
                                v-model="formData.caccount"
                                placeholder="请填写业主电话"
                                class="w268"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="editInfoFooter">
            <el-button type="primary" @click="submitForm" v-loading="isLoading">保存</el-button>
            <el-button plain @click="resetForm()">取消</el-button>
        </div>
    </div>
</template>

<script>
import util from "@/saaslib/util";
import {mapGetters } from 'vuex'
import uploadImg from "@/components/Upload/upload"
import uploadVideo from "@/components/Upload/uploadVideo"
import statusArr from '@/utils/statusArr'

export default {
  components:{
    uploadImg,uploadVideo
  },
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
        videoFlag: false,
        getDemandDataValue: 'housing_years,architectural_form,towards,heating,decoration,housing_use,property_right,features,floor',
        isLoading: false,
        // 行政区列表
        areaArr: [],
        villageArr: [],
        brokerArr: [],
        statusArr: [],
        formData: {
            areaCode: "", //行政区
            comm_id: "", //小区id
            address: "", //详细地址
            lng: "", //维度
            lat: "", //经度
            long_title: "", //标题
            description: "", //描述
            rhval: "", //室厅卫
            alive: "", 
            blive: "", 
            clive: "",
            area: "", //建筑面积
            floorarea: "", //套内面积
            price: "", //买房总价租房租金
            unit_price: "", //单价
            towards: "", //朝向id
            heating: "", //供暖方式（filter_more）id
            decoration: "", //装修(id)
            floor: "", //所在楼层
            floor_tag: "", //共楼层
            elevator: "", //是否有电梯 1是 2否
            room_photos: '', //房屋相片 多张逗号隔开 
            model_photos: '', //户型图 多张逗号
            has_video: "", //是否有视频 有为1 无为2	
            video_src: '', //视频地址

            housing_use: "", //房屋用途
            property_right: "", //房屋年限
            features: [], //特色id
            selling_point: "", //卖点
            broker_id:"", //维护人ID
            true_name:"", //维护人姓名
            phone_number:"", //维护人电话
            cname: "", //业主
            caccount: "", //业主联系方式

            source_type: "", //A是经纪人 B是普通人
            type: 2, //1租房 2二手房
            state: 1, //默认为1 上下架 上架1下架2
            status: 2, //1为公盘 2为私盘
            nstatus: 1,
            id: "", //增加为0 修改传id值
            img: "", //房源默认图片 默认抓第一张	
            owner_mentality: '', //业主心态
            service_Introduction: '', //服务介绍
            down_payments: '', //首付
            architectural_form: '', //建筑形式
            current_floor: '', //所在楼层
            housing_years: '', //房屋年限
            only_house: '', //是否唯一
        }
    };
  },
  mounted () {
    // 公共筛选项
    this.statusArr = statusArr
    if(this.$route.query.id){
        this.getDataInfo(this.$route.query.id)
    }else{
        this.getAreaCode(this.areaCode)
    }
    // 获取对应筛选项数组
    this.$store.dispatch('configList/_GetDemandData', this.getDemandDataValue)
  },
  methods: {
    // 编辑-获取详情
    getDataInfo(id){
        if (id) {
            util.ajax.post('/api/Newsapi/edit', {hid: id,type: '2'}).then(res => {
                if (res.errcode == 0) {
                    this.formData = res.data;
                    // 处理请求接口数据格式
                    this.formData.areaCode = this.formData.areaCode + ''
                    this.getAreaCode(this.formData.areaCode)
                    this.formData.elevator = this.formData.elevator==1?true:false
                    this.villageArr.push({id: this.formData.comm_id,label: this.formData.comm_name})
                    this.formData.alive = this.setTextByJquery(this.formData.rhval).alive
                    this.formData.blive = this.setTextByJquery(this.formData.rhval).blive
                    this.formData.clive = this.setTextByJquery(this.formData.rhval).clive
                    this.formData.room_photos = this.isPic(this.formData.room_photos)
                    this.formData.model_photos = this.isPic(this.formData.model_photos)
                    this.formData.video_src = this.isPic(this.formData.video_src)
                    this.brokerArr.push({id: this.formData.broker_id,label: this.formData.true_name})
                } else {
                    this.$message.error(res.errmsg);
                }
            })
        }
    },
    getAreaCode(cityCode){
      util.ajax.post('/api/Newsapi/getregion', {areaCode: cityCode}).then(res => {
        if (res.errcode == 0) {
            this.areaArr = res.data;
        } else {
            this.$router.push({path: './member'});
        }
      })
    },
    noChineseOnly(value){
        // value = value.replace(/[^0-9.]/g, '');
        value = value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')
        return value
    },
    // 提交
    submitForm() {
        if (this.isLoading) return;
        if (this.formData.areaCode=="") return this.$message({message: '行政区不能为空',type: "warning"});
        if (this.formData.comm_id=="") return this.$message({message: '小区不能为空',type: "warning"});
        if (this.formData.long_title=="") return this.$message({message: '房源标题不能为空',type: "warning"});
        if (this.formData.description=="") return this.$message({message: '房源描述不能为空',type: "warning"});
        if (this.formData.owner_mentality=="") return this.$message({message: '业主心态不能为空',type: "warning"});
        if (this.formData.service_Introduction=="") return this.$message({message: '服务介绍不能为空',type: "warning"});
        if (this.formData.alive=="") return this.$message({message: '居不能为空',type: "warning"});
        if (this.formData.area=="") return this.$message({message: '建筑面积不能为空',type: "warning"});
        if (this.formData.floorarea=="") return this.$message({message: '套内面积不能为空',type: "warning"});
        if (this.formData.price=="") return this.$message({message: '总价不能为空',type: "warning"});
        if (this.formData.towards=="") return this.$message({message: '房屋朝向不能为空',type: "warning"});
        if (this.formData.heating=="") return this.$message({message: '供暖方式不能为空',type: "warning"});
        if (this.formData.decoration=="") return this.$message({message: '装修情况不能为空',type: "warning"});
        if (this.formData.floor_tag=="") return this.$message({message: '楼层高低不能为空',type: "warning"});
        if (this.formData.floor=="") return this.$message({message: '总楼层不能为空',type: "warning"});
        if (this.formData.down_payments=="") return this.$message({message: '首付不能为空',type: "warning"});
        if (this.formData.architectural_form=="") return this.$message({message: '建筑形式图不能为空',type: "warning"});
        if (this.formData.current_floor=="") return this.$message({message: '所在楼层不能为空',type: "warning"});
        if (this.formData.housing_years=="") return this.$message({message: '房屋年限不能为空',type: "warning"});
        if (this.formData.only_house=="") return this.$message({message: '是否唯一不能为空',type: "warning"});
        if (this.formData.room_photos=="") return this.$message({message: '室内图不能为空',type: "warning"});
        if (this.formData.model_photos=="") return this.$message({message: '户型图不能为空',type: "warning"});
        
        this.isLoading = true;
        let oRequest = JSON.parse(JSON.stringify(this.formData));
        oRequest.elevator = oRequest.elevator?1:2
        oRequest.features = oRequest.features.join(',')
        oRequest.has_video = oRequest.video_src!=''?1:2
        oRequest.rhval = this.getTextByJquery(oRequest.alive,oRequest.blive,oRequest.clive,) //室厅卫
        util.ajax.post('/api/Newsapi/house_save', oRequest).then(res => {
            if (res.errcode == 0) {
                this.isLoading = false;
                this.resetForm()
            } else {
                this.isLoading = false;
                this.$message({message: res.errmsg,type: "warning"});
            }
        })
    },
    // 返回
    resetForm() {
        this.$router.push({path: '/house/secondHouse'});
    },
    // 行政区切换
    areaChange(){
        this.formData.comm_id = ''
        this.villageArr = []
    },
    // 小区搜索
    villageRemindSearch(query) {
      if (query !== "") {
        this.loading = true;
        util.ajax.post('/api/Newsapi/comm_list', {comm_name: query,areaCode: this.formData.areaCode!=''?this.formData.areaCode:this.cityCode}).then(res => {
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
        this.formData.lng = this.villageArr.find(function(item){
            if(item.comm_id==e){
                return item
            }else{
                return ''
            }
        }).lng
        this.formData.lat = this.villageArr.find(function(item){
            if(item.comm_id==e){
                return item
            }else{
                return ''
            }
        }).lat
    },
    // 维护人搜索
    brokerSearch(query) {
      if (query !== "") {
        this.loading = true;
        util.ajax.post('/api/Newsapi/broker_save', {true_name: query,type: 1}).then(res => {
            if (res.errcode == 0) {
                this.loading = false;
                res.data.forEach(item => {
                    item.label = item.true_name;
                    item.id = item.broker_id;
                    item.value = item.true_name;
                });
                this.brokerArr = res.data;
            } else {
                this.loading = false;
                this.brokerArr = [];
            }
        })
      } else {
        this.brokerArr = [];
      }
    },
    // 上传室内图图片
    fetchCbPicUrl(cbName, resData) {
        if(cbName=="addRoomPhotosUrl"){  
            // 图片处理逻辑
            this.formData.room_photos = resData.join(',')
        }
        if(cbName=="addModelPhotosUrl"){
            // 图片处理逻辑
            this.formData.model_photos = resData.join(',')
        }
    },
    // 上传视频
    fetchCbVideo(cbName, resData) {
        // 视频处理逻辑
        this.formData.video_src = resData.join(',')
    },
    // 处理居室
    getTextByJquery(alive,blive,clive) {
        var str = [];
        //遍历name为txt的所有input元素
        str.push(alive!=''?alive:'0')
        str.push(blive!=''?blive:'0')
        str.push(clive!=''?clive:'0')
        return str.join(',');
    },
    // 处理居室回显alive blive clive
    setTextByJquery(data) {
        if(data){
            let isObj = {
                alive: '',blive: '',clive: ''
            }
            let array = data.split(",")
            isObj.alive = array[0]&&array[0]!='0'?array[0]:''
            isObj.blive = array[1]&&array[1]!='0'?array[1]:''
            isObj.clive = array[2]&&array[2]!='0'?array[2]:''
            return isObj
        }else{
            return []
        }
    },
    // 处理视频问号
    isPic(data){
        if(data){
            let array = data.split(",")
            for(let i = 0; i < array.length; i ++) {
                array[i] = array[i].split("?")[0]
            }
            return array
        }else{
            return []
        }
    }
  },
  
};
</script>

<style lang="scss">
.editHouseInfoWrap .el-form-item {
    .el-radio ,.el-checkbox{
        margin-right: 15px !important;
    }
    margin-bottom: 24px;
}
.editHouseInfoWrap .el-form-item--medium .el-form-item__content,
.editHouseInfoWrap .el-form-item--medium .el-form-item__label {
    line-height: 36px;
    color: #333 !important;
}
</style>

<style lang="scss" scoped>
.editHouseInfoWrap {
    overflow: hidden;
    // min-width: 1180px;
    // padding: 24px;
    .infoBlock {
        background: #fff;
        border-radius: 8px;
        padding-top: 16px;
        margin-bottom: 24px;
    }
    .editTitle {
        font-size: 16px;
        color: #333333;
        font-weight: 700;
        padding-bottom: 16px;
        padding-left: 24px;
        margin-bottom: 24px;
        border-bottom: 1px solid #dcdfe6;
    }
    .editInfoMain {
        padding: 0 24px;
        .infoRow {
            display: flex;
            align-items: center;
        }
        .infoRow.flex-start {
            align-items: flex-start;
        }
        .border {
            border-top: 1px dashed #e4e7ed;
            border-bottom: 1px dashed #e4e7ed;
            margin-bottom: 20px;
            padding-top: 20px;
        }
        .mgbm-17 {
            margin-bottom: 17px;
            margin-left: 0;
        }
        .formItem.longItem .itemTitle {
            margin: 0px !important;
        }
        .chooseBlock {
            padding-left: 42px;
        }
        .chooseItem .itemTitle {
            margin-left: 0px !important;
            color: #333333;
        }
        .itemInputContainer {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .infoTabpane {
            margin-bottom: 24px;
            margin-left: 12px;
        }
    }
    .w200 {
        width: 200px;
    }
    .w232 {
        width: 232px;
    }
    .w268 {
        width: 268px;
    }
    .w640 {
        width: 640px;
    }
    .w45per {
        width: 45%;
    }
    .w60per {
        width: 60%;
    }
    .w63per {
        width: 63%;
    }
    .w90per {
        width: 90%;
    }
    .editInfoFooter {
        text-align: center;
        width: 100%;
    }
}
::v-deep .el-upload-dragger{
  width: 100%;
  height: 100%;
  border: none;
}
.videoUpload{
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: dashed 1px #ececec;
}
.w58{
	width: 58px;
}
.span10{
	padding: 0 10px;
}
.inline-div{
	display: inline-block;
    display: flex;
    align-content: center;
}
.map_btn{
    cursor: pointer;
}
</style>