<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <el-button @click="resetForm()" size="small">返回</el-button>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="info-content information">
                <div class="editTitle">
                    <span>基本信息</span>
                </div>
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 行政区、商圈 -->
                        <el-row>
                            <!-- 行政区： -->
                            <el-col :span="12">
                                <el-form-item label="行政区：">
                                    <span>{{data.region_name?data.region_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 商圈： -->
                            <el-col :span="12">
                                <el-form-item label="商圈：">
                                    <span>{{data.block_name?data.block_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 小区名称、地址 -->
                        <el-row>
                            <!-- 小区名称： -->
                            <el-col :span="12" v-if="data.comm">
                                <el-form-item label="小区名称：">
                                    <span>{{data.comm.comm_name?data.comm.comm_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 地址： -->
                            <el-col :span="12" v-if="data.comm">
                                <el-form-item label="地址：">
                                    <span>{{data.address?data.address:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 标题 -->
                        <el-row>
                            <!-- 标题： -->
                            <el-col :span="24">
                                <el-form-item label="标题：">
                                    <span>{{data.long_title?data.long_title:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 描述 -->
                        <el-row>
                            <!-- 描述： -->
                            <el-col :span="24">
                                <el-form-item label="描述：">
                                    <div>{{data.description?data.description:'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 居室、出租面积 -->
                        <el-row>
                            <!-- 居室 -->
                            <el-col :span="12">
                                <el-form-item label="居室：">
                                    <span>{{data.rhval | roomType}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 出租面积 -->
                            <el-col :span="12">
                                <el-form-item label="出租面积：">
                                    <span>{{data.area?data.area+"㎡":'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 房屋朝向、租金 -->
                        <el-row>
                            <!-- 房屋朝向 -->
                            <el-col :span="12">
                                <el-form-item label="房屋朝向：">
                                    <span>{{data.house_orient_name?data.house_orient_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 租金 -->
                            <el-col :span="12">
                                <el-form-item label="租金：">
                                    <span>{{data.price?data.price+"元/月":'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 出租方式、付款方式 -->
                        <el-row>
                            <!-- 出租方式 -->
                            <el-col :span="12">
                                <el-form-item label="出租方式：">
                                    <span>{{data.rent_model?data.rent_model:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 付款方式 -->
                            <el-col :span="12">
                                <el-form-item label="付款方式：">
                                    <span>{{data.payment?data.payment:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 所在楼层、总楼层 -->
                        <el-row>
                            <!-- 所在楼层 -->
                            <el-col :span="12">
                                <el-form-item label="所在楼层：">
                                    <span>{{data.floor_tag?data.floor_tag:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 总楼层 -->
                            <el-col :span="12">
                                <el-form-item label="总楼层：">
                                    <span>{{data.floor?data.floor+"层":'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--装修状况、 配备电梯  -->
                        <el-row>
                            <!-- 装修状况 -->
                            <el-col :span="12">
                                <el-form-item label="装修状况：">
                                    <span>{{data.fitment_value?data.fitment_value:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 有无电梯 -->
                            <el-col :span="12" v-if="data.info">
                                <el-form-item label="有无电梯：">
                                    <span>{{data.info.elevator==1?'有':'无'}}</span>
                                </el-form-item>
                            </el-col>
                            
                        </el-row>
                    </el-form>
                </div>
                <!-- 图片信息 -->
                <div class="editTitle">
                    <span>图片信息</span>
                </div>
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 室内图 -->
                        <el-row>
                            <!-- 室内图 -->
                            <el-col :span="24">
                                <el-form-item label="室内图：">
                                    <template v-if="data.room_photos && data.room_photos.length>0">
                                        <el-image 
                                            v-for="(item,index) in data.room_photos"
                                            :key="index"
                                            style="width: 100px;height: 100px;margin-right: 10px"
                                            :src="item" 
                                            :preview-src-list="data.room_photos">
                                        </el-image>
                                    </template>
                                    <template v-else>
                                        <div>暂无数据</div>
                                    </template>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                        <!-- 户型图 -->
                        <el-row>
                            <!-- 户型图 -->
                            <el-col :span="24">
                                <el-form-item label="户型图：">
                                    <template v-if="data.model_photos && data.model_photos.length>0">
                                        <el-image 
                                            v-for="(item,index) in data.room_photos"
                                            :key="index"
                                            style="width: 100px;height: 100px;margin-right: 10px"
                                            :src="item" 
                                            :preview-src-list="data.room_photos">
                                        </el-image>
                                    </template>
                                    <template v-else>
                                        <div>暂无数据</div>
                                    </template>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                        <!-- 视频 -->
                        <el-row>
                            <!-- 视频 -->
                            <el-col :span="24">
                                <el-form-item label="视频：">
                                    <template v-if="data.video_src && data.video_src.length>0" class="news-list-imgvideo">
                                        <div class="news-list-imgvideo flexwrap">
                                            <div v-for="(item,indvideo) in data.video_src"
                                                :src="item"
                                                :key="indvideo" class="video-list-item">
                                                <img :src="item+'?x-oss-process=video/snapshot,t_7000,f_jpg,m_fast'" class="imgsPreview">
                                                <div class="play-video"></div>
                                                <i class="el-icon-video-play play-video-i" @click="playVideo(item,1,indvideo)"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div>暂无数据</div>
                                    </template>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <!-- 特色信息 -->
                <div class="editTitle">
                    <span>特色信息</span>
                </div>  
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 特色 -->
                        <el-row >
                            <!-- 特色 -->
                            <el-col :span="12">
                                <el-form-item label="特色：">
                                    <span>{{data.tags?data.tags:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 卧室设备 -->
                        <el-row>
                            <!-- 卧室设备 -->
                            <el-col :span="12">
                                <el-form-item label="卧室设备：">
                                    <span>{{data.bedroom_equipment?data.bedroom_equipment:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 公共设备 -->
                        <el-row>
                            <!-- 公共设备 -->
                            <el-col :span="12">
                                <el-form-item label="公共设备：">
                                    <span>{{data.communal_facilities?data.communal_facilities:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            
                        </el-row>
                    </el-form>
                </div>
                <!-- 销售信息 -->
                <div class="editTitle">
                    <span>销售信息</span>
                </div>  
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 维护人、维护人联系方式 -->
                        <el-row>
                            <!-- 维护人 -->
                            <el-col :span="12">
                                <el-form-item label="维护人：">
                                    <span>{{data.true_name?data.true_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 维护人联系方式 -->
                            <el-col :span="12">
                                <el-form-item label="维护人联系方式：">
                                    <span>{{data.phone_number?data.phone_number:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 门店、门店联系方式 -->
                        <el-row>
                            <!-- 门店 -->
                            <el-col :span="12">
                                <el-form-item label="门店：">
                                    <span>{{data.store_name?data.store_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 门店联系方式 -->
                            <el-col :span="12">
                                <el-form-item label="门店联系方式：">
                                    <span>{{data.store_tel?data.store_tel:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <!-- 业主信息 -->
                <div class="editTitle" v-if="data.is_carts==1">
                    <span>业主信息</span>
                </div>  
                <div class="editInfoMain" v-if="data.is_carts==1">
                    <el-form class="form-box" label-position="left">
                        <!-- 业主、业主联系方式 -->
                        <el-row>
                            <!-- 业主 -->
                            <el-col :span="12">
                                <el-form-item label="业主：">
                                    <span>{{data.cname?data.cname:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 业主联系方式 -->
                            <el-col :span="12">
                                <el-form-item label="业主联系方式：">
                                    <span>{{data.caccount?data.caccount:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
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
            }
        },
        name: "detailsHouse",
        data() {
            return {
                data: {}
            }
        },
        methods: {
            grouplist() {
                if (this.$route.query.id) {
                    util.ajax.post('/api/Newsapi/house_info', {hid: this.$route.query.id,type: '1'}).then(res => {
                        if (res.errcode == 0) {
                            res.data.room_photos = this.isPic(res.data.room_photos)
                            res.data.model_photos = this.isPic(res.data.model_photos)
                            res.data.video_src = this.isPic(res.data.video_src)
                            this.data = res.data;
                        } else {
                            this.$message.error(res.errmsg);
                        }
                    })
                }
            },
            resetForm() {
                this.$router.push({path: '/house/rent'});
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
            },
            playVideo(val, ind, pind) {
                var fullscreen = function (elem) {
                    var prefix = "webkit";
                    if(elem["requestFullscreen"]){
                        return "requestFullscreen"
                    }
                    else if (elem[prefix + "EnterFullScreen"]) {
                        return prefix + "EnterFullScreen";
                    } else if (elem[prefix + "RequestFullScreen"]) {
                        return prefix + "RequestFullScreen";
                    }
                    return false;
                };
                let videoDom = document.createElement('video');
                videoDom.id = "addvideo" + ind + pind;
                videoDom.src = val;
                videoDom.style.position = 'absolute';
                videoDom.style.left = '-1800px';
                videoDom.style.bottom = '-1800px';
                videoDom.style.width = '0px';
                videoDom.style.height = '0px';
                document.body.appendChild(videoDom)
                let id = document.getElementById("addvideo" + ind + pind);

                id[fullscreen(id)]();
                id["onfullscreenchange"] = function(e){
                    console.log('全屏状态变化了！', e.target.webkitDisplayingFullscreen);
                    if(!e.target.webkitDisplayingFullscreen){
                        e.target.pause();
                    }
                }
                id.play();
            },
        },
        created() {
            this.grouplist();
        }
    }
</script>
<style>
.information .el-form-item__label {
    font-size: 14px !important;
    color: #999999;
    letter-spacing: 0;
    line-height: 14px;
}
.information .el-form-item {
    margin-bottom: 15px;
}
.information .el-form-item .el-form-item__content,
.information .el-form-item .el-form-item__label {
    line-height: 21px;
}
</style>
<style scoped lang="scss">
.form-box {
    // padding: 15px 0px;
    span {
        font-size: 14px;
        color: #181818;
        letter-spacing: 0;
        white-space:pre;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    }
    .title {
        font-size: 14px;
        color: #303133;
        letter-spacing: 0;
        line-height: 14px;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    }
}
.content{
    white-space:pre;
}
.title{
    font-size: 14px !important;
    color: #999999;
    letter-spacing: 0;
    line-height: 14px;
}
.editTitle {
    font-size: 16px;
    color: #333333;
    font-weight: 700;
    padding-bottom: 16px;
    margin-bottom: 24px;
    border-bottom: 1px solid #dcdfe6;
}
.editInfoMain{
    padding: 0 24px;
    padding-bottom: 24px;
}
.editInfoFooter {
        text-align: center;
        width: 100%;
    }
.imgVideo image{
    width: 100px;
    height: 100px;
}
.news-list-imgvideo {
    display: flex;
    // flex-wrap: wrap;
    overflow: hidden;

    .imgsPreview {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        border: 1px solid #EDEFF6;
        margin-bottom: 10px;
        margin-right: 10px;
        object-fit: cover;
        flex-shrink: 0;

        img {
            object-fit: cover;
        }
    }

    .video-list-item {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        border: 1px solid #EDEFF6;
        margin-bottom: 10px;
        margin-right: 10px;
        position: relative;

        video {
            width: 158px;
            height: 158px;
        }

        .play-video {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: #000000;
            opacity: .3;
            border-radius: 8px;
        }

        .play-video-i {
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 40px;
            color: #ffffff;
            transform: translate(-50%, -50%);
            cursor: pointer;
        }
    }
    }

    .flexwrap {
    flex-wrap: wrap;
    }
</style>
