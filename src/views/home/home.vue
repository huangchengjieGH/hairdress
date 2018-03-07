<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <i-Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <i-Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <i-Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </i-Col>
                                <i-Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">{{username}}</b>
                                            <p>Seller</p>
                                        </div>
                                    </Row>
                                </i-Col>
                            </Row>
                            <div class="line-gray"></div>
                            <!--<Row class="margin-top-8">-->
                                <!--<Col span="8"><p class="notwrap">上次登录时间:</p></Col>-->
                                <!--<Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>-->
                            <!--</Row>-->
                            <!--<Row class="margin-top-8">-->
                                <!--<Col span="8"><p class="notwrap">上次登录地点:</p></Col>-->
                                <!--<Col span="16" class="padding-left-8">北京</Col>-->
                            <!--</Row>-->
                        </Card>
                    </i-Col>
                </Row>
            </i-Col>
            <!--<Col :md="24" :lg="16">-->
                <!--<Row :gutter="5">-->
                    <!--<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">-->
                        <!--<infor-card-->
                            <!--id-name="user_created_count"-->
                            <!--:end-val="count.createUser"-->
                            <!--iconType="android-person-add"-->
                            <!--color="#2d8cf0"-->
                            <!--intro-text="今日新增用户"-->
                        <!--&gt;</infor-card>-->
                    <!--</Col>-->
                    <!--<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">-->
                        <!--<infor-card-->
                            <!--id-name="visit_count"-->
                            <!--:end-val="count.visit"-->
                            <!--iconType="ios-eye"-->
                            <!--color="#64d572"-->
                            <!--:iconSize="50"-->
                            <!--intro-text="今日浏览量"-->
                        <!--&gt;</infor-card>-->
                    <!--</Col>-->
                    <!--<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">-->
                        <!--<infor-card-->
                            <!--id-name="collection_count"-->
                            <!--:end-val="count.collection"-->
                            <!--iconType="upload"-->
                            <!--color="#ffd572"-->
                            <!--intro-text="今日数据采集量"-->
                        <!--&gt;</infor-card>-->
                    <!--</Col>-->
                    <!--<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">-->
                        <!--<infor-card-->
                            <!--id-name="transfer_count"-->
                            <!--:end-val="count.transfer"-->
                            <!--iconType="shuffle"-->
                            <!--color="#f25e43"-->
                            <!--intro-text="今日服务调用量"-->
                        <!--&gt;</infor-card>-->
                    <!--</Col>-->
                </Row>
                <!--<Row>-->
                    <!--<Card :padding="0">-->
                        <!--<p slot="title" class="card-title">-->
                            <!--<Icon type="map"></Icon>-->
                            <!--今日服务调用地理分布-->
                        <!--</p>-->
                        <!--<div class="map-con">-->
                            <!--<Col span="10">-->
                                <!--<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>-->
                            <!--</Col>-->
                            <!--<Col span="14" class="map-incon">-->
                                <!--<Row type="flex" justify="center" align="middle">-->
                                    <!--<home-map :city-data="cityData"></home-map>-->
                                <!--</Row>-->
                            <!--</Col>-->
                        <!--</div>-->
                    <!--</Card>-->
                <!--</Row>-->
            <!--</i-Col>-->
        <!--</Row>-->
        <Row :gutter="10" class="margin-top-10">
            <i-Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        会员统计
                    </p>
                    <div class="data-source-row">
                        <!--<visite-volume></visite-volume>-->
                        <div style="width:100%;height:100%;" id="visite_volume_con"></div>
                    </div>
                </Card>
            </i-Col>
            <i-Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        会员占比统计
                    </p>
                    <div class="data-source-row">
                        <!--<data-source-pie></data-source-pie>-->
                        <div style="width:100%;height:100%;" id="data_source_con"></div>
                    </div>
                </Card>
            </i-Col>
            <i-Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        营业额统计
                    </p>
                    <div class="data-source-row">
                        <!--<user-flow></user-flow>-->
                        <div style="width:100%;height:100%;" id="user_flow"></div>
                    </div>
                </Card>
            </i-Col>
        </Row>
    </div>
</template>

<script>
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import {dateFormat} from '@/tool/transform.js';
import qs from 'qs';
import echarts from 'echarts';
// import {sellerId} from '@/tool/const.js';

const option = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: '入流量',
            type: 'gauge',
            min: 0,
            max: 100,
            detail: {
                formatter: '{value}K',
                fontSize: 18,
                offsetCenter: [0, '50px']
            },
            data: [{value: 50, name: '上周营业额'}],
            center: ['25%', '50%'],
            radius: '80%',
            title: {
                offsetCenter: [0, '80px']
            },
            axisLine: {
                lineStyle: {
                    // color: [],
                    width: 20
                }
            },
            splitLine: {
                length: 20
            }
        },
        {
            name: '出流量',
            type: 'gauge',
            min: 0,
            max: 100,
            detail: {
                formatter: '{value}K',
                fontSize: 18,
                offsetCenter: [0, '50px']
            },
            data: [{value: 50, name: '上月营业额'}],
            center: ['75%', '50%'],
            radius: '80%',
            title: {
                offsetCenter: [0, '80px']
            },
            axisLine: {
                lineStyle: {
                    // color: [],
                    width: 20
                }
            },
            splitLine: {
                length: 20
            }
        }
    ]
};
export default {
    name: 'home',
    components: {
        serviceRequests,
        userFlow,
        countUp,
        inforCard
    },
    data () {
        return {
            sellerId: localStorage.getItem('sellerId'),
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            showAddNewTodo: false,
            newToDoItemValue: '',
            vipCustomerNum: [],
            vipRankData: [],
            pieDataList: [],
            VipRank: [],
            username: [],
            lastWeekData : {},
            lastMonthData : {}
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        getCurrentUser () {
            const that = this;
            return new Promise(function (resolve, reject) {
                that.$axios({
                    url: '/api/user/current'
                }).then(res => {
                    // console.log(res);
                    that.username = res.data.data.username;
                    resolve();
                }, err => {
                    console.log(err);
                });
            });
        },
        getVipCustomerNumData () {
            const that = this;
            return new Promise(function (resolve, reject) {
                that.$axios({
                    url: '/api/admin/report/vip',
                    method: 'post',
                    params: {
                        sellerId: that.sellerId
                    }
                }).then(res => {
                    // console.log(res);
                    that.processVipCustomerNumData(res.data.data);
                    resolve();
                }, err => {
                    console.log(err);
                });
            });
        },
        getLastWeekTurnOverData () {
            const that = this;
            // let sdate = dateFormat(that.chosedDate);
            let data = {};
            // data.beginDate = sdate;
            // data.endDate = sdate;
            data = this.getDate(2);
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
                    // console.log(res);
                    if (res.data.data === null)
                        that.lastWeekData.orderprice = 0;
                    else {
                        that.lastWeekData = res.data.data[0];
                    }
                    that.userFlowData();
                    resolve();
                }, err => {
                    console.log(err);
                });
            });
        },
        getLastMonthTurnOverData () {
            const that = this;
            let data = {};
            data = this.getDate(4);
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
                    // console.log(res);
                    if(res.data.data === null)
                        that.lastMonthData.orderprice = 0;
                    else {
                        that.lastMonthData = res.data.data[0];
                    }
                    that.userFlowData();
                    resolve();
                }, err => {
                    console.log(err);
                });
            });
        },
        processVipCustomerNumData (data) {
            var vipNum = [];
            var colorList = [
                '#9bd598',
                '#ffd58f',
                '#abd5f2',
                '#ab8df2',
                '#e14f60'
            ]
            for (var idx in data) {
                this.vipRankData[idx] = {
                    value: data[idx].vipRank,
                    itemStyle: {normal: {color: colorList[idx]}}
                };
                this.pieDataList[idx] = {
                    value: data[idx].num,
                    name: data[idx].vipRank,
                    itemStyle: {normal: {color: colorList[idx]}}
                }
                vipNum[idx] = data[idx].num;
                this.VipRank[idx] = data[idx].vipRank;
            }
            // console.log(this.vipRankData);
            // console.log(vipNum);
            this.vipCustomerNum = vipNum;
            this.columnData();
            this.pieData();
        },
        formatDate (date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();
            if (mymonth < 10) {
                mymonth = '0' + mymonth;
            }
            if (myweekday < 10) {
                myweekday = '0' + myweekday;
            }
            return (myyear + '-' + mymonth + '-' + myweekday);
        },
        getMonthDays (myMonth) {
            var now = new Date(); // 当前日期
            var nowYear = now.getYear(); // 当前年
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        getQuarterStartMonth () {
            var now = new Date();
            var nowMonth = now.getMonth(); // 当前月
            var quarterStartMonth = 0;
            if (nowMonth < 3) {
                quarterStartMonth = 0;
            }
            if (2 < nowMonth && nowMonth < 6) {
                quarterStartMonth = 3;
            }
            if (5 < nowMonth && nowMonth < 9) {
                quarterStartMonth = 6;
            }
            if (nowMonth > 8) {
                quarterStartMonth = 9;
            }
            return quarterStartMonth;
        },
        /******
         * 1 :本周开始时间，结束时间   2：上周开始时间，结束时间   3：本月开始时间，结束时间
         * 4：上月开始时间，结束时间   5：本季度开始时间，结束时间
         * @param data
         * @returns {{}}
         */
        getDate (data) {
            var date = {};
            var beginDate = '';
            var endDate = '';
            var now = new Date(); // 当前日期
            var nowDayOfWeek = now.getDay(); // 今天本周的第几天
            var nowDay = now.getDate(); // 当前日
            var nowYear = now.getYear();
            var nowMonth = now.getMonth(); // 当前月
            nowYear += (nowYear < 2000) ? 1900 : 0; //
            var lastMonthDate = new Date(); // 上月日期
            lastMonthDate.setDate(1);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            // var lastYear = lastMonthDate.getYear();
            var lastMonth = lastMonthDate.getMonth();
            switch (data) {
                case 1:
                    beginDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
                    endDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
                    break;
                case 2:
                    beginDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
                    endDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
                    break;
                case 3:
                    beginDate = new Date(nowYear, nowMonth, 1);
                    endDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth));
                    break;
                case 4:
                    beginDate = new Date(nowYear, lastMonth, 1);
                    endDate = new Date(nowYear, lastMonth, this.getMonthDays(lastMonth));
                    break;
                case 5:
                    beginDate = new Date(nowYear, this.getQuarterStartMonth(), 1);
                    var quarterEndMonth = this.getQuarterStartMonth() + 2;
                    endDate = new Date(nowYear, quarterEndMonth,
                        this.getMonthDays(quarterEndMonth));
                    break;
            }
            date.beginDate = this.formatDate(beginDate);
            date.endDate = this.formatDate(endDate);
            return date;
        },
        columnData () {
            this.$nextTick(() => {
                let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
                let xAxisData = [];
                let data1 = [];
                let data2 = [];
                for (let i = 0; i < 20; i++) {
                    xAxisData.push('类目' + i);
                    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }

                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: 0,
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    // yAxis
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    // xAxis
                    yAxis: {
                        type: 'category',
                        data: this.vipRankData,
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'bar',
                            data: this.vipCustomerNum
                        }
                    ]
                };

                visiteVolume.setOption(option);
                window.addEventListener('resize', function () {
                    visiteVolume.resize();
                });
            });
        },
        pieData () {
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: this.VipRank
                    },
                    series: [
                        {
                            name: '会员',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data: this.pieDataList,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            });
        },
        userFlowData () {
            let userFlow = echarts.init(document.getElementById('user_flow'));
            option.series[0].data[0].value = (this.lastWeekData.orderprice / 1000).toFixed(3);
            option.series[1].data[0].value = (this.lastMonthData.orderprice / 1000).toFixed(3);
            userFlow.setOption(option);

            window.addEventListener('resize', function () {
                userFlow.resize();
            });
        }
    },
    mounted () {
        // 柱状图
        // var datell = {};
        this.getCurrentUser();
        this.getVipCustomerNumData();
        this.columnData();
        this.pieData();
        // this.userFlowData();
        this.getLastWeekTurnOverData();
        this.getLastMonthTurnOverData();
        // datell = this.getDate(3);
        // console.log(datell);
    }
};
</script>
