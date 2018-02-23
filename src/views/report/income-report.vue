<style lang="less">
    @import '../../styles/common.less';
    @import './report.less';
</style>
<template>
    <div>
        <Card shadow>
            <Row>
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">日期</p>
                </i-Col>
                <i-Col span="2">
                <DatePicker type="date" v-model="chosedDate" format="yyyy-MM-dd"  confirm @on-ok="handleOk"  style="width: 200px"></DatePicker>
                </i-Col>
            </Row>
            <Row :gutter="5" class="margin-top-20">
                <i-Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="user_created_count"
                        :end-val="count.orderprice"
                        iconType="android-person-add"
                        color="#2d8cf0"
                        intro-text="实收金额"
                ></infor-card>
                </i-Col>
                <i-Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="visit_count"
                        :end-val="count.totalprice"
                        iconType="ios-eye"
                        color="#64d572"
                        :iconSize="50"
                        intro-text="订单总额"
                ></infor-card>
                </i-Col>
                <i-Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="collection_count"
                        :end-val="count.discountPrice"
                        iconType="upload"
                        color="#ffd572"
                        intro-text="优惠金额"
                ></infor-card>
                </i-Col>
                <i-Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="transfer_count"
                        :end-val="count.orderNum"
                        iconType="shuffle"
                        color="#f25e43"
                        intro-text="订单数"
                ></infor-card>
                </i-Col>
            </Row>
            <Row :gutter="10" class="margin-top-10">
                <Card>
                    <p slot="title" class="cardreport">
                    <Icon type="android-map"></Icon>
                      时段营业趋势
                    </p>
                    <i-Col class="data-source">
                    <!--<visite-volume></visite-volume>-->
                        <div style="width:100%;height:100%;" id="visite_volume_con"></div>
                    </i-Col>
                </Card>
            </Row>

        </Card>
    </div>
</template>

<script>
    import inforCard from './components/inforCard.vue';
    // import visiteVolume from './components/visiteVolume.vue';
    import {dateFormat} from '@/tool/transform.js';
    import qs from 'qs';
    import echarts from 'echarts';
    import {sellerId} from '@/tool/const.js';
    export default {
        name: 'income-report',
        components: {
            inforCard
        },
        data () {
            return {
                chosedDate: new Date(),
                todaySituation: [],
                count: {
                    orderprice: 0,
                    totalprice: 0,
                    discountPrice: 0,
                    orderNum: 0
                },
                columnData: []
            };
        },
        methods: {
            initColumnData () {
                this.columnData = [
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 0, itemStyle: {normal: {color: '#2d8cf0'}}}
                ];
            },
            getTodaySituationData () {
                const that = this;
                let sdate = dateFormat(that.chosedDate);
                let data = {};
                data.beginDate = sdate;
                data.endDate = sdate;
                data.sellerId = sellerId;
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
                        that.todaySituation = res.data.data;
                        that.processTodaySituationData(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            getTimeTurnOverData () {
                const that = this;
                let sdate = dateFormat(that.chosedDate);
                let data = {};
                data.date = sdate;
                data.sellerId = sellerId;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: '/api/admin/report/turnover',
                        method: 'post',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data: qs.stringify(data)
                    }).then(res => {
                        // console.log(res.data.data);
                        that.processTimeTurnOverData(res.data.data);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            processTimeTurnOverData (data) {
                // var temp = {};
                // var columnDataList = [];
                this.initColumnData();
                for (var idx in data) {
                    var i = parseInt(data[idx].time);
                    this.columnData[i] = {
                        value: data[idx].orderPrice,
                        itemStyle: {normal: {color: '#2d8cf0'}}
                    };
                }
                // console.log(this.columnData);
                this.colomnData();
            },
            processTodaySituationData (data) {
                var temp = {};
                if (data === null) {
                    temp = {
                        orderprice: 0,
                        totalprice: 0,
                        discountPrice: 0,
                        orderNum: 0
                    };
                } else {
                    for (var idx in data) {
                        temp = {
                            orderprice: data[idx].orderprice,
                            totalprice: data[idx].totalPrice,
                            discountPrice: data[idx].discountPrice,
                            orderNum: data[idx].orderNum
                        };
                    }
                }
                this.count = temp;
            },
            handleOk () {
                this.getTodaySituationData();
                this.getTimeTurnOverData();
            },
            colomnData () {
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
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        // xAxis
                        xAxis: {
                            type: 'category',
                            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                            nameTextStyle: {
                                color: '#c3c3c3'
                            }
                        },
                        series: [
                            {
                                name: '元',
                                type: 'bar',
                                data: this.columnData
                            }
                        ]
                    };

                    visiteVolume.setOption(option);

                    window.addEventListener('resize', function () {
                        visiteVolume.resize();
                    });
                });
            }
        },
        mounted () {
            // 柱状图
            this.initColumnData();
            this.colomnData();
        },
        created () {
            this.getTodaySituationData();
            this.getTimeTurnOverData();
        }
    };
</script>

<style scoped>


</style>