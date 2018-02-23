<template>
    <div>
        <Card>
            <Row class="margin-top-20">
                <span>优惠券状态</span>
                <span class="margin-left-50">
                <Select v-model="model1" style="width:200px" placeholder="全部" label-in-value @on-change="handleSearch1">
                   <Option v-for="item in couponStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </span>
                <span class="padding-left-20">
                <Button @click="createCoupon" type="primary" icon="plus-round">创建优惠券</Button>
                </span>
            </Row>
            <Row class="margin-top-20 searchable-table-con1">
                <i-Col span="20">
                <!--<Table :columns="columns" :data="data1"></Table>-->
                <!--<can-edit-table refs="table2"  v-model="data1" :columns-list="columns"></can-edit-table>-->
                    <can-edit-table refs="table1" @on-delete="handleDel" v-model="couponList" :columns-list="columns"></can-edit-table>
                </i-Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    import {dateFormat} from '@/tool/transform.js';
    import * as table from './data/search';
    import canEditTable from './components/canEditTable.vue';
    import {sellerId} from '@/tool/const.js';
    export default {
        name: 'coupon',
        components: {
            canEditTable
        },
        init () {
            this.data1 = this.initTable1 = table.searchTable1;
        },
        data () {
            return {
                couponStatusList: [
                    {
                        value: '2',
                        label: '全部'
                    },
                    {
                        value: '1',
                        label: '进行中'
                    },
                    {
                        value: '0',
                        label: '已下架'
                    }
                ],
                model1: '',
                data1: [],
                searchConName: '',
                columns: table.columns,
                couponList: [],
                couponData: []
            };
        },
        methods: {
            // init () {
            //     this.data1 = this.initTable1 = table.searchTable1;
            // },
            getCoupons () {
                const that = this;
                let url = `/api/admin/sellercoupon?sellerId=${sellerId}`
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'get'
                    }).then(res => {
                        that.processCouponData(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            disableCoupon (id) {
                const that = this;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: `/api/admin/sellercoupon/${id}`,
                        method: 'post'
                    }).then(res => {
                        that.getCoupons();
                        that.$Message.info('删除成功');
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            processCouponData (data) {
                // const that = this;
                var temp = {};
                var couponList = [];
                var status = '';
                for (var idx in data) {
                    if (data[idx].status === 0) {
                        status = '已下架';
                    } else if (data[idx].status === 1){
                        status = '进行中';
                    }
                    temp = {
                        id: data[idx].id,
                        name: data[idx].name,
                        style: data[idx].typeName,
                        value: data[idx].value,
                        condition: data[idx].base,
                        num: data[idx].num,
                        leftnum: data[idx].leftNum,
                        status: status,
                        beginDate: dateFormat(data[idx].beginTime),
                        endDate: dateFormat(data[idx].endTime)
                    }
                    couponList.push(temp);
                }
                this.couponList = this.couponData = couponList;
                // console.log(this.couponList);
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
            handleSearch1 (Option) {
                this.couponList = this.couponData;
                if (Option.label === '全部') {
                    this.couponList = this.couponData;
                } else {
                    this.couponList = this.search(this.couponList, {status: Option.label});
                }
                // this.couponList = this.search(this.couponList, {status: Option.label});
            },
            createCoupon () {
                this.$router.push({
                    name: 'createcoupon_index'
                });
            },
            handleDel (val, index) {
                const that = this;
                // console.log(index);
                // console.log(this.serviceListData[index].id);
                if (that.couponData[index].status === 1) {
                    this.disableCoupon(that.couponData[index].id);
                } else {
                    this.$Message.info('这个优惠券已经下架');
                }
            }
        },
        mounted () {
            // this.init();
            this.getCoupons();
        },
        activated () {
            this.getCoupons();
            // this.getServiceClassifyList();
        }
    };
</script>

<style scoped>

</style>