/**
 * 2019/10/15, By: fxgao
 * 上传图片插件，参数说明：
 * initialData: String || Array, // 必须值,否则抛出错误。 初始图片数据。
 * callBackName: String || Number, // 父组件中注册的回调函数名，返回以数组组织的图片地址
 * isMultiple: Boolean, // 是否单张图片，true多张，false单张,默认为false
 * isClear: Boolean, // 是否删除图片提示，true多张，false单张,默认为false
 * limitNum: Number, // 允许上传的最大张数，默认为1张
 * uploadUrl: String, // 上传图片Url地址
 * sizeLimit: Number, // 允许上传图片的限制大小
 * data:Object, // 上传时附带的参数
 * showImgList, // 是否展示组件内的图片列表 (新盘录入图片时为了不展示上传的图片所加)
 */
<template>
  <div class="vfupload-container">
    <el-upload
      :file-list="imgUrlsListen"
      :on-preview="handlePictureCardPreview"
      :before-remove="handleBeforeRemove"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleErr"
      :before-upload="beforeUpload"
      :on-exceed="exceeedMsg"
      :limit="limitNum"
      accept="image/*"
      name="file"
      :action="uploadUrl"
      list-type="picture-card"
      :multiple="isMultiple"
      :data="data"
      :class="{hide:resData&&resData.length>=limitNum}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <ImgPreview ref="imgsPreview" :previewImgData="previewimgData" :previewImgIndex="previewImgIndex" ></ImgPreview>
  </div>
</template>

<script>
import { reject } from "q";
import ImgPreview from "@/components/ImgPreview/preview"
import { setTimeout } from 'timers';
import fileUtil from './fileUtil.js'
export default {
  name: "uploadImage",
  components:{
    ImgPreview
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
    isClear: {
      type: Boolean,
      default: true
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
      previewimgData:[],//预览图片数组[{imgUrl:图片地址,imgDesc:图片描述,groupId:图片分组}]
      imgUrls: null,
      imgUrlsBak: null,
      imgUrlsNoShow:null,
      resData: null,
      previewImgIndex:0,//预览图片的开始索引
      uploadimgErr:false//上传图片是否失败
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
  computed: {
    imgUrlsListen: {
      get() {
        // console.log(this.initialData,this.initialDataBak)
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
      //把需要预览的图片预渲染
      this.previewImgRender(aImgUrls);
      this.initDataWatcher();
    },
    handleSuccess(response, file, fileList) {
      let isFinish = this.judgeIsFinish(fileList);
      if (isFinish) {
        this.$message({
          message: "上传图片成功",
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
        //把需要预览的图片预渲染
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
      this.$message.error("上传图片失败：" + err);
      return;
    },
    handleBeforeRemove(file, fileList) {
      // let isCorrect= this.judgeImg(file);
      // //如果是符合需求的图片，删除时需要确认；不符合需求的图片，直接删除
      // if(isCorrect){
      if(this.uploadimgErr){
        return true;
      }
      else{
        if(this.isClear){
          return this.$confirm("此操作将删除该图片, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {})
            .catch(() => {
              this.$message.error("取消删除");
              return reject();
            });
        }else{
          return true;
        }
      }
    },
    handleRemove(file) {
      if (file.status !== "success") {
        return;
      }
      this.$message({
        message: "移除图片成功",
        type: "success"
      });
      let aImgUrls = this.imgUrlsBak;
      aImgUrls.splice(aImgUrls.findIndex(item => {
        if(Object.prototype.toString.call(item) === '[object Object]'){
          return item.url == file.url
        }else{
          return item.url === file.url
        }}), 1);
      this.imgUrls = aImgUrls;
      //把需要预览的图片预渲染
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
    //把需要预览的图片预渲染
    previewImgRender(curImgArr){ 
      this.previewimgData= curImgArr;
      console.log(this.previewimgData);
      this.$previewRefresh();
    },
    beforeUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLimit = file.size / 1024 / 1024 < this.sizeLimit;
      if (!isJPEG && !isJPG && !isPNG) {
        this.$message.error("只能上传图片格式的文件 jpeg,jpg,png");
        this.uploadimgErr=true;
        return false;
      }
      if (!isLimit) {
        this.$message.error(`上传图片的大小不能超过 ${this.sizeLimit}MB!`);
        this.uploadimgErr=true;
        return false;
      }
      if((isJPEG || isJPEG || isPNG) && isLimit){
        this.uploadimgErr=false;
        return new Promise((resolve) => {
          fileUtil.getOrientation(file).then((orient) => {
              if (orient && orient === 6) {
                  let reader = new FileReader()
                  let img = new Image()
                  reader.onload = (e) => {
                      img.src = e.target.result
                      img.onload = function () {
                          const data = fileUtil.rotateImage(img, img.width, img.height)
                          const newFile = fileUtil.dataURLtoFile(data, file.name)
                          resolve(newFile)
                      }
                  }
                  reader.readAsDataURL(file)
              } else {
                  resolve(file)
              }
          })
        })
      }else{
        this.uploadimgErr=true;
        return (isJPEG || isJPEG || isPNG) && isLimit;
      }
    },
    handlePictureCardPreview(file) {  
      let previewImgIndex=0;
      this.previewimgData.forEach((item,index)=>{ 
        if((file.response&&item.url==file.response.data)||(!file.response&&item.url==file.url) ){ 
          previewImgIndex=index; 
        }
      })
      this.previewImgIndex=previewImgIndex;
      setTimeout(()=>{
        this.$refs.imgsPreview.previewImgClick();
      },200)
    },
    exceeedMsg(files) {
      this.$message.error("上传图片数量超过限制！");
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
</style>