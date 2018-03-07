<template>
    <div>
        <Card shadow>
            <Row>
                <p class="margin-top-10">
                    开&nbsp;&nbsp;始&nbsp;&nbsp;时&nbsp;&nbsp;间:&nbsp;&nbsp;&nbsp;&nbsp;
                    <DatePicker type="date" v-model="beginDate" format="yyyy-MM-dd"  confirm @on-ok="handleBeginOk" style="width: 200px"></DatePicker>
                    &nbsp;&nbsp;结&nbsp;&nbsp;束&nbsp;&nbsp;时&nbsp;&nbsp;间:&nbsp;&nbsp;&nbsp;&nbsp;
                    <DatePicker type="date" v-model="endDate" format="yyyy-MM-dd"  confirm @on-ok="handleEndOk" style="width: 200px"></DatePicker>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button @click="handleSearch" type="primary">查询</Button>
                </p>
            </Row>
            <!--<Row class="margin-top-20">-->
                <!--<Col class="count-to">-->
                    <!--<CountTo :endVal="2534" :mainStyle="mainStyle" :countStyle="countStyle" :decimals="2">-->
                        <!--<span slot="leftText">Total:&nbsp;</span>-->
                        <!--<span slot="rightText">&nbsp;元</span>-->
                    <!--</CountTo>-->
                <!--</Col>-->
                <!--<div class="count-to">-->
                    <!--<CountTo :endVal="2534" :mainStyle="mainStyle" :countStyle="countStyle" :decimals="2">-->
                        <!--<span slot="leftText">Total:&nbsp;</span>-->
                        <!--<span slot="rightText">&nbsp;元</span>-->
                    <!--</CountTo>-->
                <!--</div>-->
                <!--<div class="count-to">-->
                    <!--<CountTo :endVal="2534" :mainStyle="mainStyle" :countStyle="countStyle" :decimals="2">-->
                        <!--<span slot="leftText">Total:&nbsp;</span>-->
                        <!--<span slot="rightText">&nbsp;元</span>-->
                    <!--</CountTo>-->
                <!--</div>-->
            <!--</Row>-->
            <Row class="margin-top-20">
                <i-Col span="5" style="margin-left: 20px;margin-top: 5px;">
                <i-Col>
                <CountTo :endVal="count.orderNum" :mainStyle="mainStyle" :countStyle="countStyle" :decimals="2">
                    <span slot="leftText">订单数:&nbsp;</span>
                    <span slot="rightText"></span>
                </CountTo>
                </i-Col>
                </i-Col>
                <i-Col span="5" >
                <CountTo :endVal="count.totalprice" :mainStyle="mainStyle" :countStyle="countStyle" :decimals="2">
                    <span slot="leftText">订单总额:&nbsp;</span>
                    <span slot="rightText">元</span>
                </CountTo>
                </i-Col>
                <i-Col span="5">
                <CountTo :endVal="count.orderprice" :mainStyle="mainStyle" :countStyle="countStyle" :decimals="2">
                    <span slot="leftText">实收金额:&nbsp;</span>
                    <span slot="rightText">元</span>
                </CountTo>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="16">
                <Table :columns="excelColumns" :data="orderPriceList" size="small" ref="tableExcel"></Table>
                </i-Col>
                <i-Col span='6' class="padding-left-10">
                <div class="margin-top-10 margin-left-10">
                    <span>输入文件名：</span>
                    <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
                </div>
                <div class="margin-left-10 margin-top-20">
                    <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
                    <Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>
                </div>
                </i-Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    import CountTo from './components/CountTo.vue';
    import {table2excelData, excelColumns} from './data/table2excel.js';
    import table2excel from '@/libs/table2excel.js';
    import {dateFormat} from '@/tool/transform.js';
    // import {sellerId} from '@/tool/const.js';
    import qs from 'qs';
    export default {
        name: 'account-report',
        components: {
            CountTo
        },
        data () {
            return {
                sellerId: localStorage.getItem('sellerId'),
                beginDate: new Date(),
                endDate: new Date(),
                table2excelData: table2excelData,
                excelColumns: excelColumns,
                mainStyle: {
                    fontSize: '20px'
                },
                countStyle: {
                    fontSize: '20px',
                    color: '#dc9387'
                },
                excelFileName: '',
                orderPriceList: [],
                count: {
                    orderprice: 0,
                    totalprice: 0,
                    orderNum: 0
                }
            };
        },
        methods: {
            getOrderPriceData () {
                const that = this;
                let begindate = dateFormat(that.beginDate);
                let endDate = dateFormat(that.endDate);
                let data = {};
                data.beginDate = begindate;
                data.endDate = endDate;
                data.sellerId = that.sellerId;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/report/orderprice',
                        method: 'post',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data: qs.stringify(data)
                    }).then(res => {
                        // console.log(res.data.data);
                        that.processOrderPriceData(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            getSummaryOrderPriceData () {
                const that = this;
                let begindate = dateFormat(that.beginDate);
                let endDate = dateFormat(that.endDate);
                let data = {};
                data.beginDate = begindate;
                data.endDate = endDate;
                data.sellerId = that.sellerId;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/report/situation',
                        method: 'post',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data: qs.stringify(data)
                    }).then(res => {
                        console.log(res.data.data);
                        that.processSummaryOrderPriceData(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            processSummaryOrderPriceData (data) {
                var temp = {};
                if (data === null) {
                    temp = {
                        orderprice: 0,
                        totalprice: 0,
                        orderNum: 0
                    };
                } else {
                    for (var idx in data) {
                        temp = {
                            orderprice: data[idx].orderprice,
                            totalprice: data[idx].totalPrice,
                            orderNum: data[idx].orderNum
                        };
                    }
                }
                this.count = temp;
            },
            processOrderPriceData (data) {
                var temp = {};
                var orderPrice = [];
                var orderType = '';
                for (var idx in data) {
                    if (data[idx].orderType === 0) {
                        orderType = '买单';
                    } else {
                        orderType = '充值';
                    }
                    temp = {
                        id: data[idx].id,
                        time: dateFormat(data[idx].createdAt, true),
                        num: data[idx].num,
                        totalPrice: data[idx].totalPrice,
                        orderPrice: data[idx].orderPrice,
                        discountPrice: data[idx].discountPrice,
                        orderType: orderType
                    }
                    orderPrice.push(temp);
                }
                this.orderPriceList = orderPrice;
            },
            handleBeginOk () {
                // this.$Message.info('Clicked ok');
            },
            handleEndOk () {
                // this.$Message.info('Clicked ok');
            },
            // exportData (type) {
            //     if (type === 1) {
            //         this.$refs.tableCsv.exportCsv({
            //             filename: '原始数据'
            //         });
            //     } else if (type === 2) {
            //         this.$refs.tableCsv.exportCsv({
            //             filename: '排序和过滤后的数据',
            //             original: false
            //         });
            //     } else if (type === 3) {
            //         this.$refs.tableCsv.exportCsv({
            //             filename: this.csvFileName,
            //             columns: this.columnsCsv.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
            //             data: this.csvData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
            //         });
            //     }
            // },
            exportExcel () {
                table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
            },
            handleSearch () {
                // this.$Message.info('查询');
                this.getOrderPriceData();
                this.getSummaryOrderPriceData();
            }
        },
        mounted () {
            // this.$Message.info(sellerId);
            this.getOrderPriceData();
        }
    };
</script>

<style scoped>

</style>