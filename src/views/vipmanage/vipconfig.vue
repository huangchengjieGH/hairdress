<style lang="less">
    @import '../../styles/common.less';
    @import './vipmanage.less';
</style>
<template>
    <div>
        <Row :gutter="10" class="margin-top-10">
            <i-Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-map"></Icon>
                    会员等级配置
                </p>
                <i-Col class="data-source-row">
                    <!--<visite-volume></visite-volume>-->
                    <can-edit-table refs="table2" @on-cell-change="handleCellChange" @on-change="handleChange" v-model="vipRankList" :columns-list="editInlineColumns"></can-edit-table>
                </i-Col>
            </Card>
            </i-Col>
            <i-Col :md="24" :lg="9" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-pulse-strong"></Icon>
                    充值优惠配置
                </p>
                <Row>
                    <p><Button @click="showInfo = true" type="primary">添加优惠选项</Button></p>
                </Row>
                <Modal width="700" v-model="showInfo" @on-ok="modal_ok" @on-cancel="modal_cancel" title="添加充值优惠信息">
                    <Row>
                        <i-col span="3" style="margin-left: 20px;margin-top: 5px;">
                            <p class="notwrap">充值金额</p>
                        </i-col>
                        <i-col span="1">
                            <Input v-model="inputPrice" placeholder="例如:200" style="width: 200px"></Input>
                        </i-col>
                    </Row>
                    <Row class="margin-top-20">
                        <i-col span="3" style="margin-left: 20px;margin-top: 5px;">
                            <p class="notwrap">优惠金额</p>
                        </i-col>
                        <i-col span="1">
                            <Input v-model="discountValue" placeholder="例如:50" style="width: 200px"></Input>
                        </i-col>
                    </Row>
                </Modal>
                <div class="data-source-row">
                    <!--<data-source-pie></data-source-pie>-->
                    <can-edit-table refs="table2" @on-delete="handleRechargeDel" @on-change="handleRechargeChange" v-model="rechargeDiscountList" :columns-list="rechargeDiscountColumns"></can-edit-table>
                </div>
            </Card>
            </i-Col>
        </Row>
    </div>
</template>

<script>
    import tableData from './components/table_data.js';
    import canEditTable from './components/canEditTable.vue';
    import {sellerId} from '@/tool/const.js';
    export default {
        name: 'vipconfig',
        components: {
            canEditTable
        },
        data () {
            return {
                editInlineColumns: [],
                rechargeDiscountColumns: [],
                vipRankList: [],
                vipRankData: [],
                rechargeDiscountList: [],
                rechargeDiscountData: [],
                showInfo: false,
                inputPrice: '',
                discountValue: ''
            };
        },
        methods: {
            getData () {
                this.editInlineColumns = tableData.table2Columns;
                this.rechargeDiscountColumns = tableData.table3Columns;
            },
            getVipDiscountRate () {
                const that = this;
                let url = `api/admin/viprank?sellerId=${sellerId}`;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'get'
                    }).then(res => {
                        // console.log(res);
                        that.processVipRankMsg(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            getRechargeDiscountMsg () {
                const that = this;
                return new Promise(function (resolve, reject) {
                    let url = `/api/admin/recharge?sellerId=${sellerId}`
                    that.$axios({
                        url: url,
                        method: 'get'
                    }).then(res => {
                        // console.log(res);
                        that.processRechargeDiscount(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            changeVipRankMsg (obj) {
                const that = this;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/viprank/change',
                        method: 'post',
                        data: obj
                    }).then(res => {
                        // console.log(res);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            changeRechargeDiscountMsg (obj) {
                const that = this;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/recharge/change',
                        method: 'post',
                        data: obj
                    }).then(res => {
                        // console.log(res);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            delRechargeDiscountMsg (id) {
                const that = this;
                let url = `/api/admin/recharge/${id}`;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'post'
                    }).then(res => {
                        // console.log(res);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            addRechargeDiscountMsg (obj) {
                const that = this;
                let url = '/api/admin/recharge/add';
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'post',
                        data: obj
                    }).then(res => {
                        // console.log(res);
                        that.getRechargeDiscountMsg();
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            processVipRankMsg (data) {
                this.vipRankList = this.vipRankData = data;
                // console.log(this.vipRankList);
            },
            processRechargeDiscount (data) {
                this.rechargeDiscountList = this.rechargeDiscountData = data;
                // console.log(this.rechargeDiscountList);
            },
            handleDel (val, index) {
                const that = this;
                this.$Message.success('删除了第' + (index + 1) + '行数据');
                // console.log(that.vipCustomerData);
                // console.log(that.vipCustomerData[index].id);
                // this.disableVipCustomerMsg(that.vipCustomerData[index].id);
            },
            handleRechargeDel (val, index) {
                const that = this;
                this.$Message.success('删除了第' + (index + 1) + '行数据');
                // console.log(that.vipCustomerData);
                // console.log('haha');
                // console.log(that.rechargeDiscountData[index].id);
                this.delRechargeDiscountMsg(that.rechargeDiscountData[index].id);
            },
            handleCellChange (val, index, key) {
                this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
            },
            handleChange (val, index) {
                this.$Message.success('修改了第' + (index + 1) + '行数据');
                // console.log(this.vipCustomerList[index]);
                this.changeVipRankMsg(this.vipRankList[index]);
            },
            handleRechargeChange (val, index) {
                this.$Message.success('修改了第' + (index + 1) + '行数据');
                // console.log(this.vipCustomerList[index]);
                // console.log(this.rechargeDiscountList[index]);
                this.changeRechargeDiscountMsg(this.rechargeDiscountList[index]);
            },
            modal_ok () {
                // this.$Message.info('Clicked ok');
                const that = this;
                let obj = {
                    sellerId: 2,
                    rechargeValue: that.inputPrice,
                    discountValue: that.discountValue,
                    status: 1
                };
                this.addRechargeDiscountMsg(obj);
            },
            modal_cancel () {
                // this.$Message.info('Clicked cancel');
            }
        },
        created () {
            this.getData();
            this.getVipDiscountRate();
            this.getRechargeDiscountMsg();
        }
    };
</script>

<style scoped>

</style>