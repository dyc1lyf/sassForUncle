<template>
    <div>
        <div class="container">
            <div class="info-content information">
                <div class="editTitle">
                    <span>基本信息</span>
                </div>
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 项目名称 -->
                        <el-row>
                            <!-- 项目名称 -->
                            <el-col :span="12">
                                <el-form-item label="项目名称：">
                                    <span>{{data.comm_name?data.comm_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            
                        </el-row>
                        <!-- 物业类型、参考价格 -->
                        <el-row >
                            <!-- 物业类型 -->
                            <el-col :span="12">
                                <el-form-item label="物业类型：">
                                    <span>{{data.house_type?data.house_type:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 参考价格 -->
                            <el-col :span="12">
                                <el-form-item label="参考价格：">
                                    <span>{{data.total_price?data.total_price+"万/套":'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 项目特色、区域位置 -->
                        <el-row >
                            <!-- 项目特色 -->
                            <el-col :span="12">
                                <el-form-item label="项目特色：">
                                    <span>{{data.tag?data.tag:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 区域位置 -->
                            <el-col :span="12">
                                <el-form-item label="区域位置：">
                                    <!-- <span>{{data.address?data.address:'暂无数据'}}</span> -->
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 楼盘地址 -->
                        <el-row>
                             <!-- 楼盘地址 -->
                            <el-col :span="24">
                                <el-form-item label="楼盘地址：">
                                    <span>{{data.address?data.address:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 售楼处地址 -->
                        <el-row>
                             <!-- 售楼处地址 -->
                            <el-col :span="24">
                                <el-form-item label="售楼处地址：">
                                    <span>{{data.sales_office?data.sales_office:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 开发商 -->
                        <el-row>
                             <!-- 开发商 -->
                            <el-col :span="24">
                                <el-form-item label="开发商：">
                                    <span>{{data.developers?data.developers:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <!-- 规划信息 -->
                <div class="editTitle">
                    <span>规划信息</span>
                </div>  
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 建筑类型、绿化率 -->
                        <el-row>
                            <!-- 建筑类型 -->
                            <el-col :span="12">
                                <el-form-item label="建筑类型：">
                                    <div>{{data.building_type?data.building_type:'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                            <!-- 绿化率 -->
                            <el-col :span="12">
                                <el-form-item label="绿化率：">
                                    <div>{{data.comm_green_per?data.comm_green_per:'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 占地面积、容积率 -->
                        <el-row>
                            <!-- 占地面积 -->
                            <el-col :span="12">
                                <el-form-item label="占地面积：">
                                    <div>{{data.area_covered?data.area_covered+"㎡":'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                            <!-- 容积率 -->
                            <el-col :span="12">
                                <el-form-item label="容积率：">
                                    <span>{{data.house_orient_name?data.house_orient_name:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 建筑面积、物业类型 -->
                        <el-row>
                            <!-- 建筑面积 -->
                            <el-col :span="12">
                                <el-form-item label="建筑面积：">
                                    <span>{{data.floorage?data.floorage+'㎡':'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 物业类型 -->
                            <el-col :span="12">
                                <el-form-item label="物业类型：">
                                    <span>{{data.house_type?data.house_type:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--规划户数 -->
                        <el-row>
                            <!-- 规划户数 -->
                            <el-col :span="12">
                                <el-form-item label="规划户数：">
                                    <span>{{data.planning?data.planning:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--产权年限 -->
                        <el-row>
                            <!-- 产权年限 -->
                            <el-col :span="12">
                                <el-form-item label="产权年限：">
                                    <span>{{data.years?data.years + '年':'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--最近交房 -->
                        <el-row>
                            <!-- 最近交房 -->
                            <el-col :span="12">
                                <el-form-item label="最近交房：">
                                    <span>{{data.last_house | formatDate}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <!-- 配套信息 -->
                <div class="editTitle">
                    <span>配套信息</span>
                </div>  
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!-- 物业公司、车位配比 -->
                        <el-row>
                            <!-- 物业公司 -->
                            <el-col :span="12">
                                <el-form-item label="物业公司：">
                                    <div>{{data.comm_manage_company?data.comm_manage_company:'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                            <!-- 车位配比 -->
                            <el-col :span="12">
                                <el-form-item label="车位配比：">
                                    <div>{{data.parking_place?data.parking_place:'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 物业费、供暖方式 -->
                        <el-row>
                            <!-- 物业费 -->
                            <el-col :span="12">
                                <el-form-item label="物业费：">
                                    <div>{{data.comm_manage_pay?data.comm_manage_pay+"㎡":'暂无数据'}}</div>
                                </el-form-item>
                            </el-col>
                            <!-- 供暖方式 -->
                            <el-col :span="12">
                                <el-form-item label="供暖方式：">
                                    <span>{{data.heating?data.heating:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 供水方式、供电方式 -->
                        <el-row>
                            <!-- 供水方式 -->
                            <el-col :span="12">
                                <el-form-item label="供水方式：">
                                    <span>{{data.water_supply?data.water_supply+'㎡':'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- 供电方式 -->
                            <el-col :span="12">
                                <el-form-item label="供电方式：">
                                    <span>{{data.power_supply?data.power_supply:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--车位 -->
                        <el-row>
                            <!-- 车位 -->
                            <el-col :span="12">
                                <el-form-item label="车位：">
                                    <span>{{data.carts_nums?data.carts_nums:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <!-- 周边规划 -->
                <div class="editTitle">
                    <span>周边规划</span>
                </div>  
                <div class="editInfoMain">
                    <el-form class="form-box" label-position="left">
                        <!--教育设施 -->
                        <el-row>
                            <!-- 教育设施 -->
                            <el-col :span="12">
                                <el-form-item label="教育设施：">
                                    <span>{{data.education?data.education:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--购物 -->
                        <el-row>
                            <!-- 购物 -->
                            <el-col :span="12">
                                <el-form-item label="购物：">
                                    <span>{{data.shopping?data.shopping:'暂无数据'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--公园 -->
                        <el-row>
                            <!-- 公园 -->
                            <el-col :span="12">
                                <el-form-item label="公园：">
                                    <span>{{data.park?data.park:'暂无数据'}}</span>
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
        mounted() {
            this.grouplist()
        },
        methods: {
            grouplist() {
                if (this.$route.query.id) {
                    console.log(1)
                    util.ajax.get('/api/newsapi/nh_info', {id: this.$route.query.id}).then(res => {
                        if (res.errcode == 0) {
                            // res.data.room_photos = this.isPic(res.data.room_photos)
                            // res.data.model_photos = this.isPic(res.data.model_photos)
                            // res.data.video_src = this.isPic(res.data.video_src)
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
