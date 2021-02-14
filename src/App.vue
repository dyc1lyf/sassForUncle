<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
    .color-brand {
      color: #409EFF !important;
    }
    .color-success {
      color: #67C23A !important;
    }
    .color-warning {
      color: #E6A23C !important;
    }
    .color-danger {
      color: #F56C6C !important;
    }
    .color-info {
      color: #909399 !important;
    }
    .mr10{
      margin-right: 10px;
    }
    .flex{
      display: flex;
    }
    .flexwrap {
        flex-wrap: wrap;
    }
    /*表格*/
    .table {
      width: 100%;
      font-size: 14px;
    }
    .table-td-thumb {
      display: block;
      margin: auto;
      width: 40px;
      height: 40px;
    }
    .table_ellipsis{
      width: 100%;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
    } 
    .table-pagination{
      margin-top: 20px;
      text-align: center;
    }
    /* 表单 */
    .el-form-visible{
      max-height: 300px;
      overflow-y: scroll;
    }
</style>
<style lang="scss">
  .container{
    .handle-box {
      margin-bottom: 20px;

    }
    .tabs-box{
      margin-bottom: 15px;
    }
    .table-box{

    }
  }
    
</style>
<style lang="scss">  // upload组件样式重置
  .el-upload-list--picture-card{
      .el-upload-list__item-actions{
          background-color: rgba(0,0,0,0);
          text-align: normal;
          cursor: pointer;
          .el-icon-zoom-in{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2998
          }
          .el-icon-zoom-in:before{
          content:"";
          }
          .el-icon-delete:before{
          position: absolute;
          bottom: 0px;
          right: 0px;
          padding: 5px;
          background: rgba(0,0,0,.3);
          border-radius: 5px 0px 5px 0px;
          z-index: 3000
          }
      }
      .el-upload-list__item-actions:hover span{
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0);
          top: 0;
          left: 0;
          margin-left: 0
      }
      .el-upload-list__item:hover .el-upload-list__item-status-label{
          display: block
      }
      .vfupload-container {
          .hide .el-upload--picture-card {
              display: none;
          }
      }
  } 
</style>
<style lang="scss"> /*筛选项样式*/
  .searchwrap {
    background: #ffffff;
    border-radius: 8px;
    box-sizing: border-box;
    .searchwrap-header{
      flex-wrap:wrap;
      .searchItem {
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        overflow: hidden;
        .label{
          color: #606266;
          font-size: 14px;
          width: 66px;
          box-sizing: border-box;
          text-align: right;
          flex-shrink: 0;
          padding-right: 8px;
        }
        .inputSearchItem{
          width: 100%;
          flex-shrink: 1;
        }
        .line {
          width: 14px;
          text-align: center;
          flex-shrink: 0;
        }
      }
      .searchItemBtn{
        justify-content: flex-end;
      }
    }
  }
  .searchwrap::after {
    content: "";
    clear: both; /*清除浮动*/
    display: block; /*确保该元素是一个块级元素*/
  }
</style>