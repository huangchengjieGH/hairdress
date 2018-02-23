<style lang="less">
    @import '../../styles/common.less';
    @import './staff.less';
    @import './components/table.less';
</style>
<template>
    <div class="staff-main">
        <Row>
            <Card shadow>
                <Row>
                    <i-Col span="1" style="padding-top: 5px;">
                    <p class="notwrap">姓名</p>
                    </i-Col>
                    <i-Col span="15">
                    <Input v-model="searchConName3" icon="search" placeholder="员工姓名" style="width: 200px"></Input>
                    <Button @click="handleSearch3" type="primary">查询</Button>
                    <Button @click="handleCancel3" type="ghost" >取消</Button>
                    </i-Col>
                    <Button @click="handleAddStaff" type="primary" icon="plus-round">添加员工</Button>
                </Row>
                <Row :gutter="10" class="margin-top-10">
                    <i-Col span="18" class="padding-left-10">
                        <!--<div class="edittable-con-1">-->
                            <can-edit-table refs="table1" @on-delete="handleDel" v-model="barberList" :columns-list="columnsList"></can-edit-table>
                        <!--</div>-->
                    </i-Col>
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
        name: 'staff_index',
        components: {
            canEditTable
        },
        data () {
            return {
                searchConName3: '',
                columnsList: [],
                tableData: [],
                barberList: [],
                barberData: []
            };
        },
        methods: {
            getBarberLists () {
                const that = this;
                let url = `/api/admin/barber/get?sellerId=${sellerId}`;
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
            deleteBarber (id) {
                const that = this;
                let url = `/api/admin/barber/${id}`;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: url,
                        method: 'post'
                    }).then(res => {
                        that.$Message.info('删除成功');
                        that.getBarberLists();
                        resolve();
                    },  err => {
                        that.$Message.info('删除失败');
                    });
                });
            },
            processServicesData (data) {
                const that = this;
                let barbers = [];
                let temp = {};
                for (var idx in data) {
                    temp = {
                        id: data[idx].id,
                        name: data[idx].name,
                        number: data[idx].jobNum,
                        work: data[idx].job,
                        phone: data[idx].phone
                    };
                    barbers.push(temp);
                }
                that.barberList = this.barberData = barbers;
                // console.log(that.barberList);
            },
            getData () {
                this.columnsList = tableData.table1Columns;
                this.tableData = this.initTable3 = tableData.table1Data;
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
            handleSearch3 () {
                this.barberList = this.barberData;
                this.barberList = this.search(this.barberList, {name: this.searchConName3});
            },
            handleCancel3 () {
                this.barberList = this.barberDataZ;
            },
            handleAddStaff () {
                this.$router.push({
                    name: 'newstaff_index'
                });
            },
            handleDel (val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');
                this.deleteBarber(this.barberData[index].id);
            }
        },
        mounted () {
            // console.log('mounted');
            this.getBarberLists();
        },
        created () {
            this.getData();
        }
    };
</script>

<style scoped>

</style>