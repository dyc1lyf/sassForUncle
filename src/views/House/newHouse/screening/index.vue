<template>
    <div class="searchwrap">
      <el-row class="searchwrap-header" :gutter="12" type="flex" justify="space-between">
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">行政区</div>
          <el-select class="inputSearchItem" v-model="listQuery.areaCode" size="small" placeholder="请选择" @change="getBlock" clearable>
            <el-option :key="item.areaCode"
                        :label="item.areaName"
                        :value="item.areaCode"
                        v-for="item in areaArr"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">商圈</div>
          <el-select class="inputSearchItem" v-model="listQuery.block_id" size="small" placeholder="请选择" clearable>
            <el-option :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        v-for="item in blockArr"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">朝向</div>
          <el-select class="inputSearchItem" v-model="listQuery.towards" size="small" placeholder="请选择" clearable>
            <el-option
            v-for="item in demandData.towards"
            :key="item.id"
            :label="item.label"
            :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">装修</div>
          <el-select class="inputSearchItem" v-model="listQuery.decoration" size="small" placeholder="请选择" clearable>
            <el-option
            v-for="item in demandData.decoration"
            :key="item.id"
            :label="item.label"
            :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">居室</div>
          <el-select class="inputSearchItem" v-model="listQuery.unitType" size="small" placeholder="请选择" clearable>
            <el-option
            v-for="item in demandData.unitType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">总价</div>
          <el-input class="inputSearchItem" v-model.trim="listQuery.total_pre" @change="filterPricePre(listQuery.total_pre)" type = "text" onkeypress="return (((event.which ? event.which : event.keyCode)>=48&&(event.which ? event.which : event.keyCode)<=57) || ((event.which ? event.which : event.keyCode) == 8) || ((event.which ? event.which : event.keyCode)>=37&&(event.which ? event.which : event.keyCode) <= 40))" size="small" :maxlength="6" placeholder="最小预算"></el-input>
          <div class="line">-</div>
          <el-input class="inputSearchItem" v-model.trim="listQuery.total_end" @change="filterPriceEnd(listQuery.total_end)" type = "text" onkeypress="return (((event.which ? event.which : event.keyCode)>=48&&(event.which ? event.which : event.keyCode)<=57) || ((event.which ? event.which : event.keyCode) == 8) || ((event.which ? event.which : event.keyCode)>=37&&(event.which ? event.which : event.keyCode) <= 40))" size="small" :maxlength="6" placeholder="最大预算"></el-input>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">面积</div>
          <el-input class="inputSearchItem" v-model.trim="listQuery.area_pre" @change="(e)=>{dealInput(e,'area_pre',4,2,null)}" type = "text" size="small" placeholder="最小面积"></el-input>
          <div class="line">-</div>
          <el-input class="inputSearchItem" v-model.trim="listQuery.area_end" @change="(e)=>{dealInput(e,'area_end',4,2,null)}" type = "text" size="small" :maxlength="6" placeholder="最大面积"></el-input>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">房屋用途</div>
          <el-select class="inputSearchItem" v-model="listQuery.housing_use" size="small" placeholder="请选择" clearable>
            <el-option
            v-for="item in demandData.housing_use"
            :key="item.id"
            :label="item.label"
            :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem">
          <div class="label">状态</div>
          <el-select class="inputSearchItem" v-model="listQuery.nstatus" size="small" placeholder="请选择" clearable>
            <el-option
            v-for="item in statusArr.nstatusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :md="8" :lg="6" :xl="4" class="searchItem searchItemBtn">
          <slot></slot>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import util from "@/saaslib/util";
import { mapState,mapGetters,mapActions } from 'vuex'
import statusArr from '@/utils/statusArr'

export default {
  directives: {
    
  },
  components: {},
  props: {
    listQuery: {
      type: Object,
      required: true
    } 
  },
  computed: {
    // 赋值demandData
    ...mapGetters('configList', {demandData: '_BackDemandData'}),
  },
  data() {
    return {
      areaArr: [],
      blockArr: [],
      // 状态
      statusArr: [],
      // 获取下拉框列表值 
      getDemandDataValue: 'towards,decoration,nature,unitType,housing_use',
    };
  },
  mounted(){ 
    // 公共筛选项
    this.statusArr = statusArr
    // 获取对应筛选项数组
    this.$store.dispatch('configList/_GetDemandData', this.getDemandDataValue)
    
  },
  created() {
  },
  updated(){
  },
  methods: {
    getAreaCode(areaCode){
      util.ajax.post("/api/Newsapi/getregion",{areaCode: areaCode}).then(
        res=>{
          if(res.errcode == 0){
              this.areaArr = res.data;
          }else {
            this.$message.error(res.errmsg);
          }
        }
      )
    },
    getBlock(e){
      this.listQuery.block_id = ''
      util.ajax.post("/api/Newsapi/getregion",{areaCode: e}).then(
        res=>{
          if(res.errcode == 0){
            this.blockArr = res.data[0].block;
          }else {
            this.$message.error(res.errmsg);
          }
        }
      )
    },
    filterPricePre(e){
        if(e){
            let reg = /\d+/g;
            let result=e.match(reg);
            // this.listQuery.yusuan_pre = e.replace(/[\u4e00-\u9fa5]/g,"").replace(/[\+\-]/,"");
            this.listQuery.total_pre = result? result[0] : "";
        }
    },
    filterPriceEnd(e){
      if(e){
          let reg = /\d+/g;
          let result=e.match(reg);
          // this.listQuery.yusuan_end = e.replace(/[a-zA-Z]/g,"").replace(/\-/g,"");
          this.listQuery.total_end = result? result[0] : "";
      }
      if(parseInt(this.listQuery.total_pre)>parseInt(this.listQuery.total_end)){
        this.$message({
          message: '预算区间输入有误',
          type: "warning"
        });
        this.listQuery.total_end = ''
      }
    },
    filterAreaPre(e){
      if(e){
        let reg = /\d+/g;
        let result=e.match(reg);
        this.listQuery.area_pre = result? result[0] : "";
      }
    },
    dealInput(e, dataName, intLength, floatLength, maxValue) {
        if (e == "") {
            this.listQuery[dataName] = "";
        }
        if (e > maxValue && maxValue) {
            this.listQuery[dataName] = maxValue;
            return;
        }
        let aNow = e.split(".");
        let length1 = aNow[0].length;
        if (length1 > intLength) {
            aNow[0] = aNow[0].slice(0, intLength);
        }
        aNow[0] = aNow[0].replace(/[\D]/g, "");
        if (aNow[1]) {
            let length2 = aNow[1].length;
            aNow[1] = aNow[1].replace(/[\D]/g, "");

            if (length2 > 2) {
            aNow[1] = aNow[1].slice(0, floatLength);
            }
            this.listQuery[dataName] = aNow[1].length>0?aNow[0] + "." + aNow[1]:aNow[0];
        } else {
            this.listQuery[dataName] = aNow[0];
        }
    },
  }
};
</script>
