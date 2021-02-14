/*
import { setTimeout } from 'timers';
*图片预览插件，参数说明：
*previewImgData:预览图片列表，必须值，包括的属性：{imgUrl:图片地址; imgDesc:图片描述; groupId:图片分组id;}
*checkedImgIndex:选中预览的图片索引
*/
<template>
    <div class="preview-wrap" v-show="previewImgShowState">
      <img :ref="item.imgUrl.substring(item.imgUrl.lastIndexOf('/')+1,item.imgUrl.lastIndexOf('.'))" v-for="(item,index) in curImgArr" :key="index" :src="item.imgUrl" :preview="item.groupId" :preview-text="item.imgDesc" width="100%" height="100%" alt>
    </div>
</template>
<script>
export default {
  name: "imgPreview",
  props: {
    previewImgData: {
      type: [Array, String],
      required: true
    },
    previewImgIndex: {
      type: Number,
      required: false,
      default: 0
    },
    previewImgShowState:{//预览图显示状态
      type:Boolean,
      default:false
    },
    groupId: {
      type: Number
    }
  },
  computed:{
    curImgArr:{
      get: function() {
        let aCurImg;
        let aResArr = [];
        let nRandomGroupId = Math.ceil(Math.random()*100000);
        if(Object.prototype.toString.call(this.previewImgData) == "[object Array]"){
          aCurImg = this.previewImgData;
          aCurImg.forEach((item,index)=>{
            if(item.maskUrl){
              aResArr.push(
                {
                  imgUrl:item.maskUrl,
                  imgDesc:'',
                  // groupId:item.url.substring(item.url.lastIndexOf('/')+1,item.url.lastIndexOf('.'))
                  groupId:this.groupId?this.groupId:nRandomGroupId
                }
              );
            }
            else if(item.url){
              aResArr.push(
                {
                  imgUrl:item.url,
                  imgDesc:'',
                  // groupId:item.url.substring(item.url.lastIndexOf('/')+1,item.url.lastIndexOf('.'))
                  groupId:this.groupId?this.groupId:nRandomGroupId
                }
              );
            }else {
              aResArr.push(
                {
                  imgUrl:item,
                  imgDesc:'',
                  // groupId:item.url.substring(item.url.lastIndexOf('/')+1,item.url.lastIndexOf('.'))
                  groupId:this.groupId?this.groupId:nRandomGroupId
                }
              );
            }
          })
        }
        else if(Object.prototype.toString.call(this.previewImgData) == "[object String]" ){
          aCurImg = this.previewImgData == ""?[]:this.previewImgData.split(',');
          aCurImg.forEach((item,index)=>{
            aResArr.push(
              {
                imgUrl:item,
                imgDesc:'',
                // groupId:item.url.substring(item.url.lastIndexOf('/')+1,item.url.lastIndexOf('.'))
                groupId:this.groupId?this.groupId:nRandomGroupId
              }
            );
          })
        }
        return aResArr
      }
    }
    
  },
  methods: {
    previewImgClick() {
      var _this = this;
      _this.$nextTick(function() {
        let refid = _this.previewImgData[
          _this.previewImgIndex
        ].url.substring(
          _this.previewImgData[_this.previewImgIndex].url.lastIndexOf("/") +
            1,
          _this.previewImgData[_this.previewImgIndex].url.lastIndexOf(".")
        );
        
        if(_this.$refs[refid]){
          _this.$refs[refid][0].click();
        }else {
          let refMaskid = _this.previewImgData[
            _this.previewImgIndex
          ].maskUrl.substring(
            _this.previewImgData[_this.previewImgIndex].maskUrl.lastIndexOf("/") +
              1,
            _this.previewImgData[_this.previewImgIndex].maskUrl.lastIndexOf(".")
          );
          _this.$refs[refMaskid][0].click();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .preview-wrap{
    width: 150px;
    height: 150px;
    border-radius: 6px;
    border: 1px solid #c0ccda;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .preview-wrap:hover:after{
    content: "点击查看大图";
    position: absolute;
    width: 100%;
    height: 28px;
    background: rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
    left:0;
    bottom: 0;
    // height: 28px;
    color: #409EFF;
    font-size:12px;
  }
</style>


