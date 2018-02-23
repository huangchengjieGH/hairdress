<style lang="less">
    @import '../../styles/common.less';
    @import './servicearea.less';
</style>
<template>
    <div class="servicearea-main">
        <Row class="margin-top-20">
            <Card shadow>
                <Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">服务类型</p>
                </Col>
                <Row>
                    <i-Col span="5">
                    <Select v-model="articleTagSelected" @on-change="handleSelectTag" placeholder="选择服务类型">
                        <Option v-for="item in serviceClassifyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    </i-Col>
                    <i-Col span="3" class="padding-left-10">
                    <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="primary">新建服务类型</Button>
                    </i-Col>
                    <i-Col span="3" class="padding-left-20">
                    <Button @click="handleAddService" type="primary" icon="plus-round">添加服务</Button>
                    </i-Col>
                </Row>
                <transition name="add-new-tag">
                    <div v-show="addingNewTag" class="add-new-tag-con">
                        <i-Col span="5">
                        <Input v-model="newTagName" placeholder="请输入服务类型" />
                        </i-Col>
                        <i-Col span="3" class="padding-left-10">
                        <Button @click="createNewTag" long type="primary">确定</Button>
                        </i-Col>
                        <i-Col span="3" class="padding-left-10">
                        <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                        </i-Col>
                    </div>
                </transition>
                <Row :gutter="10" class="margin-top-20">
                    <Col span="18" class="padding-left-10">
                    <!--<div class="edittable-con-1">-->
                        <can-edit-table refs="table1" @on-delete="handleDel" v-model="serviceList" :columns-list="columnsList"></can-edit-table>
                    <!--</div>-->
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
    import canEditTable from './components/canEditTable.vue';
    import tableData from './components/table_data.js';
    import {sellerId} from '@/tool/const.js';
    export default {
        name: 'servicearea_index',
        components: {
            canEditTable
        },
        data () {
            return {
                serviceClassifyList: [],
                articleTagSelected: '', // 选中的标签
                // articleTagList: [], // 所有标签列表
                addingNewTag: false, // 添加新标签
                newTagName: '', // 新建标签名
                searchConName3: '',
                columnsList: [],
                tableData: [],
                serviceList: [],
                serviceListData: []
            };
        },
        methods: {
            getService () {
                const that = this;
                let url = `/api/admin/service?sellerId=${sellerId}`;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'get'
                    }).then(res => {
                        // console.log(res);
                        that.processServicesData(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            getServiceClassifyList () {
                const that = this;
                let url = `/api/admin/service/classify?sellerId=${sellerId}`
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'get'
                    }).then(res => {
                        console.log(res);
                        that.serviceClassifyList = res.data.data;
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            addServiceClassify () {
                const that = this;
                let obj = {
                    sellerId: sellerId,
                    name: that.newTagName,
                    status: 1
                };
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/service/classify',
                        method: 'post',
                        data: obj
                    }).then(res => {
                        that.serviceClassifyList = res.data.data;
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            deleteService (id) {
                const that = this;
                let url = `/api/admin/service/${id}`;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'post'
                    }).then(res => {
                        that.$Message.info('删除成功');
                        that.getService();
                        resolve();
                    },  err => {
                        that.$Message.info('删除失败');
                    });
                });
            },
            processServicesData (services) {
                var temp = {};
                var serviceList = [];
                for (var idx in services) {
                    for (var idx2 in services[idx].serviceAreas) {
                        var serviceAreas = services[idx].serviceAreas;
                        temp = {
                            id: serviceAreas[idx2].id,
                            sellerId: serviceAreas[idx2].sellerId,
                            servicename: serviceAreas[idx2].name,
                            price: serviceAreas[idx2].price,
                            vipprice: serviceAreas[idx2].vipprice,
                            servicestyle: services[idx].serviceName,
                            serviceId: serviceAreas[idx2].serviceId,
                            remarks: serviceAreas[idx2].msg
                        };
                        serviceList.push(temp);
                    }
                }
                this.serviceList = this.serviceListData = serviceList;
                console.log(serviceList);
            },
            handleAddNewTag () {
                this.addingNewTag = !this.addingNewTag;
            },
            handleSelectTag () {
                localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
                console.log(this.articleTagSelected);
            },
            createNewTag () {
                if (this.newTagName.length !== 0) {
                    this.addServiceClassify();
                    // this.articleTagList.push({value: this.newTagName});
                    this.addingNewTag = false;
                    setTimeout(() => {
                        this.newTagName = '';
                    }, 200);
                } else {
                    this.$Message.error('请输入标签名');
                }
            },
            cancelCreateNewTag () {
                this.newTagName = '';
                this.addingNewTag = false;
            },
            handleDel (val, index) {
                this.deleteService(this.serviceListData[index].id);
                console.log(index);
                console.log(this.serviceListData[index].id);
            },
            handleAddService () {
                let query = {};
                query = null;
                for (var idx in this.serviceClassifyList) {
                    if (this.serviceClassifyList[idx].id === this.articleTagSelected) {
                        query = this.serviceClassifyList[idx];
                        // console.log(query);
                    }
                };
                if (query === null) {
                    this.$Message.info('请选择服务类型');
                } else {
                    this.$router.push({
                        name: 'service_index',
                        query: query
                    });
                }
            },
            getData () {
                this.columnsList = tableData.table1Columns;
                this.tableData = this.initTable3 = tableData.table1Data;
                this.editInlineColumns = tableData.editInlineColumns;
                this.editInlineData = tableData.editInlineData;
                this.editIncellColumns = tableData.editIncellColumns;
                this.editIncellData = tableData.editIncellData;
                this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;
                this.editInlineAndCellData = tableData.editInlineAndCellData;
                this.showCurrentColumns = tableData.showCurrentColumns;
            }
        },
        mounted () {
            console.log('mounted');
            this.getService();
            this.getServiceClassifyList();
        },
        created () {
            console.log('created');
            this.getData();
        },
        activated () {
            this.getService();
            // this.getServiceClassifyList();
        }
    };
</script>

<style scoped>

</style>