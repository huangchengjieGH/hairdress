<style lang="less">
    @import '../../../styles/common.less';
    @import '../coupon.less';
</style>
<template>
    <div>
        <Card shadow>
            <Row>
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">类型</p>
                </i-Col>
                <i-Col span="1">
                <!--<Input v-model="value" placeholder="例如:代金券" style="width: 200px"></Input>-->
                    <Select v-model="selectTypeName" style="width:200px" label-in-value @on-change="handleSearch1">
                        <Option v-for="item in couponStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">名称</p>
                </i-Col>
                <i-Col span="2">
                <Input v-model="name" placeholder="例如:剪发券" style="width: 200px"></Input>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">值</p>
                </i-Col>
                <i-Col span="3">
                <Input v-model="couponValue" placeholder="例如：5" style="width: 200px"></Input>
                </i-Col>
                <Tooltip content="代金券代表5元，折扣券代表5折" placement="right-start">
                <Icon type="android-textsms"></Icon>
                </Tooltip>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">条件</p>
                </i-Col>
                <i-Col span="3">
                <Input v-model="base" placeholder="例如：200" style="width: 200px"></Input>
                </i-Col>
                <Tooltip content="200代表消费满200才可使用优惠券" placement="right-start">
                    <Icon type="android-textsms"></Icon>
                </Tooltip>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">数量</p>
                </i-Col>
                <i-Col span="2">
                <Input v-model="num" placeholder="请输入优惠券数量" style="width: 200px"></Input>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                    <p class="notwrap">剩余数量</p>
                </i-Col>
                <i-Col span="2">
                    <Input v-model="leftnum" placeholder="请输入优惠券数量" style="width: 200px"></Input>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">开始日期</p>
                </i-Col>
                <i-Col span="2">
                <DatePicker type="date" v-model="beginTime" placeholder="请选择优惠券开始日期" style="width: 200px"></DatePicker>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">截止日期</p>
                </i-Col>
                <i-Col span="2">
                <DatePicker type="date" v-model="endTime" placeholder="请选择优惠券截止日期" style="width: 200px"></DatePicker>
                </i-Col>
            </Row>
            <Row class="margin-top-10">
                <div class="confirm">
                    <i-Col span="5">
                    <Button @click="onCancelTag" long type="ghost">取消</Button>
                    </i-Col>
                    <i-Col span="5" class="margin-left-20">
                    <Button @click="oncomfirmTag" long type="primary">确定</Button>
                    </i-Col>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    // import {sellerId} from '@/tool/const.js';
    export default {
        name: 'create-coupon',
        data () {
            return {
                sellerId: localStorage.getItem('sellerId'),
                name: '',
                couponValue: '',
                base: '',
                num: '',
                leftnum: '',
                beginTime: '',
                endTime: '',
                typeName: '',
                typeId: '',
                selectTypeName: '',
                couponStatusList: [
                    {
                        value: '1',
                        label: '代金券'
                    },
                    {
                        value: '0',
                        label: '折扣券'
                    },
                    {
                        value: '2',
                        label: '首单立减券'
                    }
                ]
            };
        },
        methods: {
            handleSearch1 (Option) {
                // this.$Message.info();
                this.typeId = Option.value;
                this.typeName = Option.label;
            },
            /**
             * 检测产品对象各个属性的值
             * @method isValid
             */
            isValid () {
                const that = this;
                let index = 1;
                let msg = '';
                if (!that.typeName) {
                    msg += `${index++}、类型不能为空<br/><br/>`;
                }
                if (!that.name) {
                    msg += `${index++}、名称不能为空<br/><br/>`;
                }
                if (that.couponValue === '') {
                    msg += `${index++}、优惠券值不能为空<br/><br/>`;
                }
                if (that.base === '') {
                    msg += `${index++}、优惠券条件不能为空<br/><br/>`;
                }
                if (that.num === '') {
                    msg += `${index++}、优惠券数量不能为空<br/><br/>`;
                }
                if (that.leftnum === '') {
                    msg += `${index++}、优惠券剩余数量不能为空<br/><br/>`;
                }
                if (that.beginTime === '') {
                    msg += `${index++}、开始日期不能为空<br/><br/>`;
                }
                if (that.endTime === '') {
                    msg += `${index++}、截止日期不能为空<br/><br/>`;
                }
                if (msg.length !== 0) {
                    that.$Modal.warning({
                        title: '输入有误',
                        content: msg
                    });
                    return false;
                }
                return true;
            },
            onCancelTag () {
                const that = this;
                that.closePage('create-coupon');
                that.$router.push({
                    name: 'coupon_index'
                });
            },
            oncomfirmTag () {
                // this.$Message.info('Clicked ok');
                const that = this;
                // let url = `/api/admin/service`;
                let url = '/api/admin/sellercoupon/create';
                let method = 'post';
                let obj = {};
                if (that.isValid()) {
                    obj.sellerId = that.sellerId;
                    obj.typeId = that.typeId;
                    obj.typeName = that.typeName;
                    obj.name = that.name;
                    obj.value = that.couponValue;
                    obj.num = that.num;
                    obj.leftNum = that.leftnum;
                    obj.base = that.base;
                    obj.beginTime = that.beginTime;
                    obj.endTime = that.endTime;
                    that.$axios({
                        url: url,
                        method: method,
                        data: obj
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.status === 1) {
                            that.closePage('service');
                            that.$router.push({
                                name: 'coupon_index'
                            });
                        } else {
                            that.$Message.error(res.data.msg);
                        }
                    }, err => {
                        console.log(err);
                    });
                }
            },
            closePage (name) {
                this.$store.commit('removeTag', name);
                this.$store.commit('closePage', name);
            }
        }
    };
</script>

<style scoped>

</style>