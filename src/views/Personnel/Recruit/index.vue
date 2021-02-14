<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 招聘信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作类 -->
            <div class="handle-box">
                <el-button @click="handleEdit()" type="primary" size="small">新增职位</el-button>
            </div>
            <!-- 内容类 -->
            <div class="table-box">
                <tableList ref="tableList" :listQuery="listQuery" @handleEdit="handleEdit"></tableList>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-dialogDrag :visible.sync="editVisible" width="40%">
            <el-form ref="updateForm" :model="updateForm" label-width="100px" class="el-form-visible">
                <el-form-item label="职务：">
                    <el-col :span="18">
                        <el-select v-model="updateForm.duties_id" filterable placeholder="请选择">
                            <el-option
                            v-for="item in dutiesArr"
                            :key="item.id"
                            :label="item.duties_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="标题：">
                    <el-col :span="18">
                        <el-input v-model="updateForm.employ_title" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-col :span="18">
                        <el-input type="textarea" v-model="updateForm.employ_content"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="亮点：">
                    <el-col :span="18">
                        <el-input type="textarea" v-model="updateForm.employ_point"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="薪资：">
                    <el-col :span="18">
                         <el-select v-model="updateForm.employ_salary" filterable placeholder="请选择">
                            <el-option
                            v-for="item in salaryArr"
                            :key="item.id"
                            :label="item.swname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="福利待遇：">
                    <el-col :span="18">
                        <el-select v-model="updateForm.employ_welfare" multiple collapse-tags filterable placeholder="请选择">
                            <el-option
                            v-for="item in welfareArr"
                            :key="item.id"
                            :label="item.swname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-col :span="18">
                        <el-input v-model="updateForm.contact" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="联系电话：" prop="phone">
                    <el-col :span="18">
                        <el-input v-model="updateForm.phone"></el-input>
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
import util from "@/saaslib/util";
import tableList from "./tableList/index"; //表格列表
export default {
    name: 'personnelRecruit',
    components: { tableList },
    data() {
        var checkPhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入联系人电话'));
            } else {
                let regPone = null;
                let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; //最新16手机正则
                let tel = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/; //座机
                if (value.charAt(0) == 0) {    // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
                regPone = tel;         
                } else {          
                regPone = mobile;
                }
                if (!regPone.test(value)) {
                return callback(
                    new Error("请填写联系人电话(座机格式'区号-座机号码')")
                );
                }
                callback();        
            }
        }
        return {
            // 查询条件
            listQuery: {
                page: 1,
                pageSize: 10
            },
            // 编辑弹出框
            editVisible: false,
            formLoading: false,
            // 表单
            updateForm: {
                duties_id: '',	//职务id	
                employ_title: '',	//标题	
                employ_content: '',	//内容	
                employ_point: '',	//亮点	3000，五险一金，提成
                employ_salary: '',	//薪资id	
                employ_welfare: [],	//福利待遇	
                contact: '', //联系人
                phone: '',	//联系电话	
            },
            // 职位数组
            dutiesArr: [],
            // 薪资数组
            salaryArr: [],
            // 待遇数组
            welfareArr: [],
            rules:{
                phone: [
                    {required: true,validator: checkPhone, trigger: 'blur'}
                ],
            }
        };
    },
    mounted() {
        this.getListArr()
        this.handleSearch();
    },
    methods: {
         getListArr(){
            util.ajax.post('/api/Employjob/employ_salary_welfare').then(res => {
                if (res.errcode == 0) {
                    this.salaryArr = res.data.salary
                    this.welfareArr = res.data.welfare
                } else {
                    this.$message.error(res.errmsg);
                }

            })
            util.ajax.get('/api/Employjob/employ_duties').then(res => {
                if (res.errcode == 0) {
                    this.dutiesArr = res.data
                } else {
                    this.$message.error(res.errmsg);
                }

            })
            
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.listQuery, 'page', 1);
            this.$set(this.listQuery, 'pageSize', 10);
            // 获取数据
            this.$refs.tableList.getListData();
        },
        // 编辑人员
        handleEdit(row){
            if(row){ //编辑
                // 获取详情
                util.ajax.post('/api/Employjob/employ_mo',{id: row.id}).then(res => {
                    if (res.errcode == 0) {
                        //添加表单
                        this.updateForm = {
                            employ_id: res.data.id,
                            duties_id: res.data.duties,	//职务id	
                            employ_title: res.data.employ_title,	//标题	
                            employ_content: res.data.employ_content,	//内容	
                            employ_point: res.data.employ_point,	//亮点	3000，五险一金，提成
                            employ_salary: res.data.employ_salary+'',	//薪资id	
                            employ_welfare: res.data.employ_welfare,	//福利待遇	
                            contact: res.data.contact, //联系人
                            phone: res.data.tel_phone,	//联系电话	
                        }
                        this.isAdd = false
                        this.editVisible = true
                    }
                })
                
            }else{ //新增
                this.updateForm = {
                    duties_id: '',	//职务id	
                    employ_title: '',	//标题	
                    employ_content: '',	//内容	
                    employ_point: '',	//亮点	3000，五险一金，提成
                    employ_salary: '',	//薪资id	
                    employ_welfare: '',	//福利待遇	
                    phone: '',	//联系电话
                    contact: '' //联系人	
                }
                console.log(this.updateForm)
                this.isAdd = true
                this.editVisible = true
            }
        },
        // 表单提交
        formEdit(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if(this.formLoading){
                    return
                }
                if (valid) {
                    if(this.updateForm.duties_id==''){
                        this.$message.error('职务不能为空');
                    }else if(this.updateForm.employ_title==''){
                        this.$message.error('标题不能为空');
                    }else if(this.updateForm.employ_content==''){
                        this.$message.error('内容不能为空');
                    }else if(this.updateForm.employ_point==''){
                        this.$message.error('亮点不能为空');
                    }else if(this.updateForm.employ_salary==''){
                        this.$message.error('薪资不能为空');
                    }else if(this.updateForm.employ_welfare.length<=0){
                        this.$message.error('福利待遇不能为空');
                    }else if(this.updateForm.contact==''){
                        this.$message.error('联系人不能为空');
                    }else{
                        let url = ''
                        this.formLoading = true;
                        let pream = JSON.parse(JSON.stringify(this.updateForm))
                        if(this.isAdd){
                            url = "/api/Employjob/employ_add"
                        }else{
                            url = "/api/Employjob/employ_edit"
                        }
                        pream.employ_welfare = pream.employ_welfare.join(",")
                        util.ajax.post(url,pream).then(
                            res=>{
                                if(res.errcode == 0){
                                    this.formClose(ruleForm)
                                    this.$message.success('保存成功')
                                    this.handleSearch()
                                }else {
                                    this.formLoading = false;
                                    this.$message.error(res.errmsg);
                                }
                            }
                        )
                    }  
                }
            })
            
        },
        formClose(ruleForm){
            this.$refs[ruleForm].resetFields();
            this.formLoading = false;
            this.editVisible = false
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
