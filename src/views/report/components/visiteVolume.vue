<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: 'visiteVolume',
        data () {
            return {
                columnData: [
                    {value: 100, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 222, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 333, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 444, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 888, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 445, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 233, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 444, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 233, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 111, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 2321, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 323, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 323, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 323, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 323, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 323, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 342, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 2000, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 1000, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 200, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 100, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 50, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 10, itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 90, itemStyle: {normal: {color: '#2d8cf0'}}}
                ]
            };
        },
        mounted () {
            console.log(this.chosedDate)
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
    };
</script>
