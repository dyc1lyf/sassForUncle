/**
 * 2019/10/15, By: fxgao
 * 上传视频插件，参数说明：
 * initialData: String || Array, // 必须值,否则抛出错误。 初始视频数据。
 * callBackName: String || Number, // 父组件中注册的回调函数名，返回以数组组织的视频地址
 * isMultiple: Boolean, // 是否单张视频，true多张，false单张,默认为false
 * limitNum: Number, // 允许上传的最大张数，默认为1张
 * uploadUrl: String, // 上传视频Url地址
 * sizeLimit: Number, // 允许上传视频的限制大小
 * data:Object, // 上传时附带的参数
 * showImgList, // 是否展示组件内的视频列表 (新盘录入视频时为了不展示上传的视频所加)
 */
<template>
  <div class="vfupload-container"> 
    <div class="video-list" >
        <template v-if="previewimgData && previewimgData.length">
          <div class="video-list-item" v-for="(item, index) in previewimgData" :key="index">
            <video
                :key="index"
                :id="'addvideo' + index"
                :src="item.url"
                class="avatar"
            >您的浏览器不支持视频播放</video>
            <div class="play-video"></div>
            <div class="dele-video" @click="handleRemove(index)">
              <i class="el-icon-delete"></i>
            </div>
            <i class="el-icon-video-play play-video-i" @click="playVideo(index)"></i>
          </div>
        </template>
        
        <el-upload
          :file-list="imgUrlsListen"
          :before-remove="handleBeforeRemove"
          :on-success="handleSuccess"
          :on-error="handleErr"
          :before-upload="beforeUpload"
          :on-exceed="exceeedMsg"
          :limit="limitNum"
          :show-file-list="false"
          accept="video/*"
          name="file"
          :action="uploadUrl"
          list-type="picture-card"
          :multiple="isMultiple"
          :data="data"
          :class="{hide:resData&&resData.length>=limitNum}"
          :on-progress="uploadVideoProcess"
        >
            <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="parseInt(videoUploadPercent)"
                style="margin-top: 10px;"
                
            ></el-progress>
            <i class="el-icon-plus" v-if="videoFlag == false"/>
            
        </el-upload>
    </div>
    
  </div>
</template>

<script>
import { reject } from "q";
export default {
  name: "uploadVideo",
  components:{
  },
  props: {
    initialData: {
      type: [Array, String]
    },
    callBackName: {
      type: [Number, String],
      default: "uploadCb"
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    limitNum: {
      type: Number,
      default: 1
    },
    uploadUrl: {
      type: String,
      default: "vfang/house/upload/image"
    },
    sizeLimit: {
      type: Number,
      default: 10
    },
    data: {
      type: Object
    },
    showImgList:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      initDataWatcher: null,
      initialDataBak: null,
      isUrlChange:false,
      changeFirstTime:true,
      videoFlag: false,
      videoUploadPercent: 0,
      previewimgData:[],//预览视频数组[{imgUrl:视频地址,imgDesc:视频描述,groupId:视频分组}]
      imgUrls: null,
      imgUrlsBak: null,
      imgUrlsNoShow:null,
      resData: null,
      previewImgIndex:0,//预览视频的开始索引
      uploadimgErr:false//上传视频是否失败
    };
  },
  created() {
    this.initDataWatcher = this.$watch("initialData", function(newVal, oldVal) {
      if (
        (oldVal == undefined && newVal != undefined) ||
        (oldVal.length == 0 && newVal.length == 0)
      ) {
        this.initData();
      }
    });
  },
  mounted(){
  },
  computed: {
    imgUrlsListen: {
      get() {
        if (
          (this.initialData && this.initialDataBak) ||
          (this.initialData == "" && this.initialDataBak == "")
        ) {
          let initialData = Array.isArray(this.initialData)
            ? this.initialData
            : this.initialData == ""
            ? []
            : this.initialData.split(",");
          let nowinitialData = [];
          for (let i = 0; i < initialData.length; i++) {
            if (initialData[i].url) {
              nowinitialData.push(initialData[i].url);
            } else {
              nowinitialData.push(initialData[i]);
            }
          }
          let bSame = this.judgeIsSame(nowinitialData, this.initialDataBak);
          if (bSame) {
            if (this.imgUrls) {
              let aResData = [];
              this.imgUrlsBak.forEach((item, index) => {
                if (item.maskUrl) {
                  let oResData = {};
                  oResData['url'] = item.url;
                  oResData['maskUrl'] = item.maskUrl;
                  aResData.push(oResData);
                }else {
                  aResData.push(item.url);
                }
              });
              this.resData = aResData;
              // this.initialData = aResData;
              this.initialDataBak = aResData;
              this.$emit("fetchCallback", this.callBackName, this.resData);
              if (this.isUrlChange) {
                if (!this.changeFirstTime) {
                  this.isUrlChange = false;
                  this.changeFirstTime = true;
                }else{
                  this.changeFirstTime = false;
                }
                if(!this.showImgList){
                  this.imgUrlsNoShow = [];
                  return []
                }
                if(this.showImgList){
                  return this.imgUrls;
                }
              }else{
                if(!this.showImgList){
                  return []
                }
                if(this.showImgList){
                  return this.imgUrlsBak;
                }
              }
            }
          } else {
            this.initData();
            this.$emit("fetchCallback", this.callBackName, this.resData);
            return this.imgUrls;
          }
        }
        else if((this.initialData&&this.initialData.length) == 0 && !this.initialDataBak){
          this.initData();
          this.$emit("fetchCallback", this.callBackName, []);
          return this.imgUrlsBak;
        }
        else if (this.initialData == "" && (this.initialDataBak && this.initialDataBak.length)) {
          if(!this.showImgList){
            // 处理楼盘录入相册及视频上传失败问题
            let resData = [];
            for (let i = 0; i < this.imgUrlsNoShow.length; i++) {
              if (this.imgUrlsNoShow[i].url) {
                if (this.imgUrlsNoShow[i].maskUrl) {
                  let oResData = {};
                  oResData['url'] = this.imgUrlsNoShow[i].url;
                  oResData['maskUrl'] = this.imgUrlsNoShow[i].maskUrl;
                  resData.push(oResData);
                }else {
                  resData.push(this.imgUrlsNoShow[i].url);
                }
              } else {
                resData.push(this.imgUrlsNoShow[i]);
              }
            }
            this.initData();
            this.$emit("fetchCallback", this.callBackName, resData);
          }else {
            this.initData();
            this.$emit("fetchCallback", this.callBackName, []);
            return this.imgUrlsBak;
          }
        }else{
          this.initData();
          return this.imgUrlsBak;
        }
      }
    }
  },
  methods: {
    initData() {
      if (
        Object.prototype.toString.call(this.initialData) !== "[object Array]" &&
        typeof this.initialData !== "string"
      ) {
        throw new Error("初始数据类型错误！预期值为数组或字符串");
      }
      const nowData = Array.isArray(this.initialData)
        ? this.initialData
        : (this.initialData == "" ? [] : this.initialData.split(",")).concat();
      let aImgUrls = [];
      let aResData = [];
      nowData.forEach((item, index) => {
        if(item.videoPicUrl){
          let oData={};
          oData["url"] = item.originVideoPicUrl;
          oData["maskUrl"] = item.videoPicUrl;
          aImgUrls.push(oData);
          aResData.push(oData);
        }else {
          if (item.url) {
            aImgUrls.push(item);
            aResData.push(item.url);
          } else {
            let oData = {};
            oData["url"] = item;
            aImgUrls.push(oData);
            aResData.push(item);
          }
        }
      });
      this.imgUrls = aImgUrls;
      this.imgUrlsBak = aImgUrls;
      this.resData = aResData;
      this.initialDataBak = aResData;
      //把需要预览的视频预渲染
      this.previewImgRender(aImgUrls);
      this.initDataWatcher();
    },
    handleSuccess(response, file, fileList) {
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      let isFinish = this.judgeIsFinish(fileList);
      if (isFinish) {
        this.$message({
          message: "上传视频成功",
          type: "success"
        });
        let aResData = [];
        fileList.forEach((item, index) => { 
          let oResData = {};
          let responseData = item.response ? item.response.data : item;
          if(Object.prototype.toString.call(responseData) === '[object Object]'){
            oResData['url'] = responseData.url ?responseData.url : responseData.originVideoPicUrl;
            oResData['maskUrl'] = responseData.maskUrl ? responseData.maskUrl : responseData.videoPicUrl;
          }else {
            oResData['url'] = item.response ? item.response.data : item.url
          }
          aResData.push(oResData);
        });
        //把需要预览的视频预渲染
        this.previewImgRender(aResData);

        this.imgUrlsBak = aResData;
        this.$emit('reloadData',this.callBackName,aResData)
        if(!this.showImgList){
          this.imgUrlsNoShow = aResData;
        }
        this.isUrlChange = true;
      }
    },
    handleErr(err, file) {
      this.$message.error("上传视频失败：" + err);
      return;
    },
    // 上传视频
    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleBeforeRemove(file, fileList) {
      // let isCorrect= this.judgeImg(file);
      // //如果是符合需求的视频，删除时需要确认；不符合需求的视频，直接删除
      // if(isCorrect){
      if(this.uploadimgErr){
        return true;
      }
      else{
        return this.$confirm("此操作将删除该视频, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {
            this.$message.error("取消删除");
            return reject();
          });
      }
      // }
      // else{
      //   return true
      // }
      
    },
    handleRemove(index) {
      this.$message({
        message: "移除视频成功",
        type: "success"
      });
      let previewimgData = this.previewimgData;
      let aImgUrls = this.imgUrlsBak;
      console.log(previewimgData)
      console.log(aImgUrls)
      aImgUrls.splice(index,1);
      previewimgData.splice(index, 1);
      this.previewimgData = previewimgData;
      this.imgUrls = aImgUrls;
      // this.initialData = aImgUrls;
      //把需要预览的视频预渲染
      this.previewImgRender(aImgUrls);

      this.isUrlChange = true;
      if(this.initialData != this.initialDataBak){
        this.$emit('reloadData',this.callBackName,aImgUrls)
      }
      this.$emit("removeCallBackName", this.callBackName);
      this.initDataWatcher = this.$watch("initialData", function(newVal, oldVal) {
        if (
          (oldVal == undefined && newVal != undefined) ||
          (oldVal.length == 0 && newVal.length == 0)
        ) {
          this.initData();
        }
      });
    },
    //把需要预览的视频预渲染
    previewImgRender(curImgArr){ 
      this.previewimgData= curImgArr;
      console.log(this.previewimgData);
      this.$previewRefresh();
    },
    beforeUpload(file) {
      console.log(file.size)
      console.log(this.sizeLimit)
        const isLt10M = file.size / 1024 / 1024 < this.sizeLimit;
        if (
            [
                "video/mp4",
                "video/ogg",
                "video/flv",
                "video/avi",
                "video/wmv",
                "video/rmvb",
            ].indexOf(file.type) == -1
        ) {
            this.$message.error("请上传正确的视频格式");
            this.uploadimgErr=true;
            return false;
        }
        if (!isLt10M) {
            this.$message.error("上传视频大小不能超过100MB!");
            this.uploadimgErr=true;
            return false;
        }
    },
    exceeedMsg(files) {
      this.$message.error("上传视频数量超过限制！");
    },
    judgeIsFinish(filedata) {
      let bFinish = true;
      for (let i = 0; i < filedata.length; i++) {
        if (
          !filedata[i].response &&
          filedata[i].status == "success" &&
          filedata[i].url != ""
        ) {
          continue;
        }
        if (!filedata[i].response || !filedata[i]) {
          bFinish = false;
          break;
        }
      }
      return bFinish;
    },
    judgeIsSame(data1, data2) {
      let bSame = true;
      if (data1.length != data2.length) {
        bSame = false;
      } else {
        data1 = data1.sort((a, b) => {
          return a - b;
        });
        data2 = data2.sort((a, b) => {
          return a - b;
        });
        for (let i = 0; i < data1.length; i++) {
          if(Object.prototype.toString.call(data1[i]) === '[object Object]' || Object.prototype.toString.call(data2[i]) === '[object Object]' ){
            continue;
          }
          if (data1[i] != data2[i]) {
            bSame = false;
          }
        }
      }
      return bSame;
    },
    playVideo(ind){
      var fullscreen = function(elem) {
        var prefix = 'webkit';
        if ( elem[prefix + 'EnterFullScreen'] ) {
            return prefix + 'EnterFullScreen';
        } else if( elem[prefix + 'RequestFullScreen'] ) {
            return prefix + 'RequestFullScreen';
        };
        return false;
      };
      let id = document.getElementById('addvideo' + ind)
      id[fullscreen(id)]()
      id.play();
    }
  }
};
</script>
<style lang="scss" scoped>
.vfupload-container {
  display: flex;
  flex-wrap: wrap;
  .el-upload {
    width: auto !important;
  }
  .hide .el-upload--picture-card {
    display: none;
  }
  .upload__tip{
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    line-height: 36px!important;
    width: 100%;
  }
}
.video-list{
    display: flex;
    flex-wrap: wrap;
    .video-list-item{
        position: relative;
        width: 146px;
        height: 146px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        overflow: hidden;
        .avatar{
          width: 100%;
          height: 100%;
        }
        .dele-video{
            position: absolute;
            top: 0;
            right: 5px;
            color: crimson;
            font-size: 20px;
            cursor: pointer;
        }
        .play-video{
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: #000000;
          opacity: .3;
        }
        .play-video-i{
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 40px;
          color: #ffffff;
          transform: translate(-50%,-50%);
          cursor: pointer;
        }
    }
}  
</style>