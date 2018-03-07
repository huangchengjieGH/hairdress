<template>
    <div>
        <Card shadow>
            <Row>
                <i-Col span="1" style="padding-top: 5px;">
                <p class="notwrap">电话</p>
                </i-Col>
                <i-Col span="14">
                <Input v-model="inputPhone" icon="search" placeholder="请输入..." style="width: 200px"></Input>
                <Button @click="handleSearch" type="primary">查询</Button>
                <Button @click="handleCancel" type="ghost" >取消</Button>
                </i-Col>
                <Button @click="modal1 = true" style="display: none" type="primary" icon="plus-round">添加会员</Button>
                <Modal
                        v-model="modal1"
                        title="添加会员"
                        @on-ok="ok"
                        @on-cancel="cancel">
                    <p>
                        &nbsp;&nbsp;微&nbsp;信&nbsp;号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input v-model="nickname" placeholder="请输入..." style="width: 200px"></Input>
                    </p>
                    <p class="margin-top-10">
                        &nbsp;&nbsp;电&nbsp;话:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input v-model="phone" placeholder="请输入..." style="width: 200px"></Input>
                    </p>
                    <p class="margin-top-10">
                        &nbsp;&nbsp;余&nbsp;额:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input v-model="balance" placeholder="请输入..." style="width: 200px"></Input>
                    </p>
                    <p class="margin-top-10">
                        &nbsp;&nbsp;积&nbsp;分:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input v-model="points" placeholder="请输入..." style="width: 200px"></Input>
                    </p>
                    <p class="margin-top-10">
                        &nbsp;&nbsp;会&nbsp;员&nbsp;等&nbsp;级:&nbsp;&nbsp;&nbsp;
                        <Input v-model="rank" placeholder="例如：黄金" style="width: 200px"></Input>
                    </p>
                </Modal>
            </Row>
            <Row :gutter="10" class="margin-top-20">
                <i-Col span="18" class="padding-left-10">
                <!--<div class="edittable-con-1">-->
                <can-edit-table refs="table2" @on-delete="handleDel" @on-cell-change="handleCellChange" @on-change="handleChange" v-model="vipCustomerList" :columns-list="editInlineColumns"></can-edit-table>
                <!--</div>-->
                </i-Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    import canEditTable from './components/canEditTable.vue';
    import tableData from './components/table_data.js';
    // import {sellerId} from '@/tool/const.js';
    export default {
        name: 'vipmanage',
        components: {
            canEditTable
        },
        data () {
            return {
                // columnsList: [],
                // tableData: [],
                sellerId: localStorage.getItem('sellerId'),
                inputPhone: '',
                nickname: '',
                phone: '',
                balance: '',
                points: '',
                rank: '',
                modal1: false,
                editInlineColumns: [],
                editInlineData: [],
                vipCustomerList: [],
                vipCustomerData: []
            };
        },
        methods: {
            getData () {
                this.editInlineColumns = tableData.editInlineColumns;
                this.editInlineData = this.initTable = tableData.editInlineData;
            },
            getVipCustomerMsg () {
                const that = this;
                return new Promise(function (resolve, reject) {
                    let url = `/api/admin/customer?sellerId=${that.sellerId}`
                    that.$axios({
                        url: url,
                        method: 'get'
                    }).then(res => {
                        // console.log(res);
                        that.processVipCustomerMsg(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            disableVipCustomerMsg (id) {
                const that = this;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: `/api/admin/customer/${id}`,
                        method: 'post'
                    }).then(res => {
                        console.log(res);
                        that.getVipCustomerMsg();
                        that.$Message.info('删除成功');
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            processVipCustomerMsg (data) {
                const that = this;
                // console.log(data);
                var temp = {};
                var customerList = [];
                for (var idx in data) {
                    temp = {
                        id: data[idx].id,
                        sellerId: data[idx].sellerId,
                        nickName: data[idx].nickName,
                        phone: data[idx].phone,
                        accountPrice: that.toDecimal(data[idx].accountPrice),
                        totalPoints: data[idx].totalPoints,
                        availablePoints: data[idx].availablePoints,
                        vipRank: data[idx].vipRank
                    }
                    customerList.push(temp);
                }
                this.vipCustomerList = this.vipCustomerData = customerList;
                // console.log(customerList);
                // console.log(this.vipCustomerList);
            },
            changeVipCustomerMsg (data) {
                const that = this;
                console.log(data);
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/customer/change',
                        method: 'post',
                        data: data
                    }).then(res => {
                        // console.log(res);
                        that.getVipCustomerMsg();
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            toDecimal (x) {
                var f = parseFloat(x);
                if (isNaN(f)) {
                    return null;
                }
                f = Math.round(x * 100) / 100;
                return f;
            },
            search (data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            handleSearch () {
                this.vipCustomerList = this.vipCustomerData;
                this.vipCustomerList = this.search(this.vipCustomerList, {phone: this.inputPhone});
            },
            handleCancel () {
                this.vipCustomerList = this.vipCustomerData;
            },
            handleNetConnect (state) {
                this.breakConnect = state;
            },
            handleLowSpeed (state) {
                this.lowNetSpeed = state;
            },
            getCurrentData () {
                this.showCurrentTableData = true;
            },
            handleDel (val, index) {
                const that = this;
                this.$Message.success('删除了第' + (index + 1) + '行数据');
                // console.log(that.vipCustomerData);
                // console.log(that.vipCustomerData[index].id);
                this.disableVipCustomerMsg(that.vipCustomerData[index].id);
            },
            handleCellChange (val, index, key) {
                this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
            },
            handleChange (val, index) {
                this.$Message.success('修改了第' + (index + 1) + '行数据');
                // console.log(this.vipCustomerList[index]);
                this.changeVipCustomerMsg(this.vipCustomerList[index]);
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        },
        created () {
            this.getData();
        },
        mounted () {
            // console.log('mounted');
            this.getVipCustomerMsg();
        },
        activated () {
            // this.getService();
        }
    };
</script>
<style scoped>

</style>