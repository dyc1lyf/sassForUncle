<template>
    <div class="mapsearch">
        <div class="searchTop">
            <img :src="require('@/assets/img/all.png')" style="height: 50px; padding: 0 5px 0 40px">
            <div style="margin-right: 30px">花蕾好房</div>
            <!-- 选择地区 -->
            <el-popover
                    placement="bottom"
                    width="400"
                    trigger="hover">
                <div>
                    <div>热门城市：<span @click="selectArea()">北京</span></div>
                </div>
                <div slot="reference">北京<i class="el-icon-caret-bottom"></i></div>
            </el-popover>
        </div>

        <div class="slide" v-if="isShowSlide">
            <div style="position: relative">
                <div class="arealist">
                    <div class="topTips" style="font-size: 14px">共找到 {{sourceList.length}} 家</div>
                    <div class="sourceList" v-if="sourceList && sourceList.length" style="padding-top: 10px">
                        <div class="item" v-for="item in sourceList" :key="item.id" style="padding-bottom: 15px; cursor: pointer" @click="getDetail(item.id)">
                            <img :src="'https://app.hualhf.com' + item.img.split(',')[0]" style="width: 60px; height:60px; margin-right: 15px" alt="">
                            <div class="itemRight">
                                <div class="item-title">{{item.long_title | interceptString}}</div>
                                <div class="item-tags">
                                    <div>{{ item.area }}㎡ </div>
                                    <div>{{ item.rhval.split(',')[0] }}室 {{ item.rhval.split(',')[0] }}厅</div>
                                </div>
                                <!-- <div class="item-tags">{{item.more}}</div> -->
                                <div class="item-price">{{type == 1 ? '租金：' : '总价：'}} {{item.price}} {{type == 1 ? '元/月' : '万元'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="empty" v-else>暂无搜索结果</div>
                </div>
                <i class="el-icon-arrow-left positions" v-if="isShowSlide" @click="isShowSlide = !isShowSlide"></i>
                <i class="el-icon-arrow-right positions" v-else @click="isShowSlide = !isShowSlide"></i>
            </div>
        </div>
        <div class="detail" v-if="detailShow">
            <div class="detailImgs">
                <el-carousel height="300px" indicator-position="none">
                    <el-carousel-item v-for="item in details.info.room_photos.split(',')" :key="item">
                        <img :src="'https://app.hualhf.com'+ item" style="width: 100%; height: 100%" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <h4>{{ details.long_title }}</h4>
            <div class="d-details">
                <div class="price" style="display: flex; align-items: baseline">
                    <div class="totalPrice" style="font-size: 18px; color: #f10000;">{{ details.price }} <span style="font-size: 14px">万元</span> </div>
                    <div class="unitPrice" style="color: #999; font-size: 12px; margin-left: 20px">单价：{{ details.info.unit_price }} 元</div>
                </div>
                <div class="detailsContent">
                    <div class="itemsDetail">
                        <div class="itemsLabel">房  型:</div>
                        <div class="itemsValue"></div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">朝  向:</div>
                        <div class="itemsValue">{{ details.house_orient_name }}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">面  积:</div>
                        <div class="itemsValue">{{ details.area }}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">装  修:</div>
                        <div class="itemsValue">{{details.fitment_value}}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">楼  层:</div>
                        <div class="itemsValue">{{ details.floor_tag }}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">建造年代:</div>
                        <div class="itemsValue">{{ details.comm.comm_build_date }}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">物业公司:</div>
                        <div class="itemsValue">{{details.comm.comm_manage_company | interceptString}}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">容积率:</div>
                        <div class="itemsValue">{{details.comm.comm_contain_pert}}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">物业费用:</div>
                        <div class="itemsValue">{{details.comm.comm_manage_pay}}元/㎡ ·月</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">绿 化 率:</div>
                        <div class="itemsValue">{{ details.comm.comm_green_per }} %</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">小  区:</div>
                        <div class="itemsValue">{{ details.comm.comm_name }}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">区域板块:</div>
                        <div class="itemsValue">{{details.region_name + '-' + details.block.name}}</div>
                    </div>
                    <div class="itemsDetail">
                        <div class="itemsLabel">地  址:</div>
                        <div class="itemsValue">{{details.info.address}}</div>
                    </div>
                </div>
            </div>
            <div class="d-info">
                <h5>房屋简介</h5>
                <div>
                    {{details.info.description}}
                </div>
            </div>
            <div class="d-pics"></div>
        </div>
        <div id="container">

        </div>

    </div>
</template>
<script>
import AMap from 'AMap'
import util from "@/saaslib/util";
//   import citys from '@/utils/citys'

  var map
  export default {
    data () {
      return {
        isShowSlide: false,
        detailShow: false,
        infoWindow: '',
        formatName: 'title',
        // northeast坐标
        southwest: '',
        northeast: '',
        center: {
          lat: 39.90923,
          lng: 116.397428
        },
        details:"",
        // 地图等级
        zoom: 10,

        sourceList: [],

        type: 2, // 1 租房， 2二手房, 3新房
        markers: []
      }
    },
    filters: {
      interceptString: function (value) {
        // console.log(value.length)
        return value.length < 12 ? value : value.substring(0,12) + '...'
      }
    },
    mounted: function () {
      this.getCity()
      this.init()

    },
    methods: {
      init: function () {
        let _this = this
        map = new AMap.Map('container', {
          center: [_this.center.lng, _this.center.lat],
          resizeEnable: true,
          zoom: 10
        })
        this.logMapBounds()

        //绑定地图移动与缩放事件
        map.on('moveend', this.logMapBounds)
        map.on('zoomend', this.logMapBounds)

        _this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, 0),
          isCustom: true,
          conent: _this.createInfoWindow()
        })

        // 添加地图控件
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.Scale())
        })
      },

      //显示当前地图边界范围坐标
      logMapBounds () {
        // 获取地图边界
        var bounds = map.getBounds()
        console.log(bounds)
        this.northeast = bounds.northeast
        this.southwest = bounds.southwest

        this.zoom = map.getZoom() //获取当前地图级别

        //获取当前地图中心位置
        this.center = map.getCenter()

        console.log(this.zoom, this.center)
        this.getMarkers()
      },

      // 自定义信息窗口
      createInfoWindow (content, count) {
        let info
        if (this.zoom < 16) {
          info = `<div class="infoClass"> ${content} </div>`
        } else {
          info = `<div class="areaClass"> ${content} | ${count} 套 <i class='i-arr-down'></i></div>`
        }
        return info
      },

      async getMarkers () {
        // 删除覆盖物
        map.clearMap()

        let params = {
          latitude: this.southwest.lat + '_' + this.northeast.lat,
          longitude: this.southwest.lng + '_' + this.northeast.lng,
          location: this.center.lat + ',' + this.center.lng,
          type: this.type,
          zoom: this.zoom
        }
        const res = await util.ajax.post('/api/Newsapi/getList', params)
        this.markers = res.data.map(item => {
          return {
            content: item.district || item.comm_name || item.name,
            lng: item.lng,
            lat: item.lat,
            count: item.coomm_props_num,
            list: item.house ? item.house : ''
          }
        })
        this.addMarkers(this.markers)

      },

      // 添加地图标记
      addMarkers (markers) {
        markers.map((item, index) => {
          var marker = new AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            content: this.createInfoWindow(item.content, item.count),
            position: [item.lng, item.lat],
            map: map
          })
          map.add(marker)
          marker.on('click', e => {
            return this.markerClick(e, item.list)
          })
        })
      },

      markerClick (e, list) {
        let lnglat = e.lnglat
        if (this.zoom <= 12) {
          this.zoom = 14
          map.setZoomAndCenter(this.zoom, [lnglat.lng, lnglat.lat])
        } else if (this.zoom > 12 && this.zoom < 16) {
          this.zoom = 16
          map.setZoomAndCenter(this.zoom, [lnglat.lng, lnglat.lat])
        } else {
          this.isShowSlide = true
          map.setCenter([lnglat.lng, lnglat.lat])
        }
        if (list && list.length) {
          this.sourceList = list
        }
        // this.infoWindow.setContent(this.createInfoWindow(e.target.content));
        // this.infoWindow.open(map, e.target.getPosition());
      },

      async getCity () {
        // citys.map(item=>{
        //   return{
        //     cityIndex:
        //     cityCode: item.cityCode,
        //     cityName: item.cityName
        //   }
        // })
      },
      getDetail(id){
        util.ajax.post(`/api/Newsapi/house_info`,{hid: id, type: 2}).then(res=>{
          this.details = res.data
          this.detailShow = true
        })
      },
    }
  }
</script>
<style>
    #container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
    }

    .infoClass {
        width: 100px;
        height: 100px;
        background: rgb(105, 38, 38);
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
    }

    .slide{
        position: absolute;
        width: 300px;
        height: calc(100vh - 60px);
        top: 60px;
        left: 0;
        z-index: 99;
        overflow-y: auto;
    }
    .detail{
        width: 500px;
        padding: 20px;
        height: calc(100vh - 100px);
        position: absolute;
        left: 300px;
        top: 60px;
        overflow-y: auto;
        background: #fff;
        z-index: 99;
        border-left: solid 1px #ddd;
    }

    .areaClass {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        cursor: pointer;
        white-space: nowrap;
        position: absolute;
        z-index: 2;
        border-radius: 15px;
        background: rgb(105, 38, 38);
        box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
        color: #fff;
    }

    .areaClass .i-arr-down {
        width: 0;
        height: 0;
        position: absolute;
        top: 30px;
        left: 21px;
        border-top: 6px solid rgb(105, 38, 38);
        border-left: 6px dashed transparent;
        border-right: 6px dashed transparent;

    }

    .searchTop {
        width: 100vw;
        height: 60px;
        background: #fff;
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
    }

    .arealist {
        width: 300px;
        height: calc(100vh - 60px);
        background: #fff;
        bottom: 0;
        left: 0;
    }

    .topTips {
        text-align: center;
        color: #999;
        line-height: 30px;
        border-top: solid 1px #ddd;
        border-bottom: solid 1px #ddd;
    }

    .sourceList .item {
        display: flex;
        margin: 15px;
        flex-wrap: nowrap;
        border-bottom: solid 1px #ddd;
        font-size: 14px;
    }

    .item-title {
        font-weight: bold;
    }
    .item-tags{
        display: flex;
        color: #666;
        padding: 5px 0;
        align-items: center;
    }
    .item-tags div{
        position: relative;
        text-align: center;
    }
    .item-tags div::after{
        color: #666;
        content: '|';
        font-size: 14px;
        padding: 0 5px;
    }
    .item-tags div:last-child::after{
        content: '';
    }
    .detailsContent{
        overflow: hidden;
    }
    .itemsDetail{
        font-size: 14px;
        width: 50%;
        float: left;
        display: flex;
        line-height: 2.5;
    }
    .itemsLabel{
        width: 80px;
        color: #999;
    }

    .empty {
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #999;
    }

    .positions {
        position: absolute;
        z-index: 999;
        top: 50%;
        right: -20px;
        margin-top: -50px;
        background: #fff;
        height: 100px;
        width: 20px;
        text-align: center;
        line-height: 100px;
    }
</style>
