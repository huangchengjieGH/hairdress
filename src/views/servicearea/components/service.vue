<style lang="less">
    @import '../../../styles/common.less';
    @import '../servicearea.less';
</style>
<template>
    <div>
        <Card shadow>
            <Row>
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">服务类型</p>
                </i-col>
                <i-col span="1">
                <Input v-model="serviceStyle" @on-focus="changeServieStyle" placeholder="例如:剪发" style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">服务名称</p>
                </i-col>
                <i-col span="1">
                <Input v-model="serviceName" placeholder="例如:洗剪吹" style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">价格</p>
                </i-col>
                <i-col span="1">
                <Input v-model="price" placeholder="请输入价格..." style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">VIP价格</p>
                </i-col>
                <i-col span="1">
                <Input v-model="viprice" placeholder="请输入VIP价格..." style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">备注</p>
                </i-col>
                <i-col span="1">
                <Input v-model="marks" placeholder="请输入..." style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-10">
                <div class="confirm">
                    <i-col span="5">
                    <Button @click="onCancelTag" long type="ghost">取消</Button>
                    </i-col>
                    <i-col span="5" class="margin-left-20">
                    <Button @click="oncomfirmTag" long type="primary">确定</Button>
                    </i-col>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    import {sellerId} from '@/tool/const.js';
    export default {
        name: 'service',
        data () {
            return {
                serviceId: '',
                serviceStyle: '',
                serviceName: '',
                price: '',
                viprice: '',
                marks: '',
                service: ''
            };
        },
        methods: {
            init () {
                console.log(this.$route.query);
                this.service = this.$route.query;
                this.serviceStyle = this.service.name;
                this.serviceId = this.service.id;
            },
            /**
             * 检测产品对象各个属性的值
             * @method isValid
             */
            isValid () {
                const that = this;
                let index = 1;
                let msg = '';

                if (!that.serviceStyle) {
                    msg += `${index++}、服务类型不能为空<br/><br/>`;
                }
                if (that.serviceName.length === 0) {
                    msg += `${index++}、服务名称名不能为空<br/><br/>`;
                }
                if (that.price === '') {
                    msg += `${index++}、服务价格不能为空<br/><br/>`;
                }
                if (that.viprice === '') {
                    msg += `${index++}、vip价格不能为空<br/><br/>`;
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
                // this.$Message.info('Clicked ok');
                that.closePage('service');
                // that.$router.push({path: '/product/list'});
                that.$router.push({
                    name: 'servicearea_index'
                });
            },
            oncomfirmTag () {
                // this.$Message.info('Clicked ok');
                const that = this;
                // let url = `/api/admin/service`;
                let url = '/api/admin/service/add';
                let method = 'post';
                let obj = {};
                if (that.isValid()) {
                    obj.sellerId = sellerId;
                    obj.serviceId = that.serviceId;
                    obj.name = that.serviceName;
                    obj.price = that.price;
                    obj.vipprice = that.viprice;
                    obj.msg = that.marks;

                    that.$axios({
                        url: url,
                        method: method,
                        data: obj
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.status === 1) {
                            that.closePage('service');
                            that.$router.push({
                                name: 'servicearea_index'
                            });
                        } else {
                            that.$Message.error(res.data.msg);
                        }
                    }, err => {
                        console.log(err);
                    });
                }
            },
            changeServieStyle () {
                this.$Message.info('服务类型不能更改');
                this.serviceStyle = this.service.name;
            },
            closePage (name) {
                this.$store.commit('removeTag', name);
                this.$store.commit('closePage', name);
            }
        },
        mounted () {
            this.init();
        },
        activated () {
            this.init();
        }
    };
</script>

<style scoped>

</style>