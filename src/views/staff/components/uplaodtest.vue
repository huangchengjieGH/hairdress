<style lang="less">
    @import '../../../styles/common.less';
    @import '../staff.less';
</style>
<template>
    <div>
    <Card shadow>
        <Row class="center-flex">
            <i-col span="3" style="max-width: 6em">
                <span>产品图片</span>
            </i-col>
            <i-col span="21">
                <Card class="item">
                    <upload-img :coverImgList="coverImgList"></upload-img>
                </Card>
            </i-col>
        </Row>
        <div style="text-align: center">
            <Button type="success" @click="commit">提交</Button>
        </div>
    </Card>
    </div>
</template>

<script>
    import uploadImg from '@/common/uploadImg.vue';
    import {convertBase64UrlToBlob} from '@/tool/transform.js';

    export default {
        name: 'uploadtest_index',
        components: {
            uploadImg
        },
        data () {
            return {
                coverImgList: []
            };
        },
        methods: {
            /**
             * 上传产品图片
             * @method sumitImageFile
             */
            sumitImageFile () {
                const that = this;
                return new Promise(async function (resolve, reject) {
                    let imgs = that.coverImgList;
                    //记录异步上传的图片个数
                    let flag = 0;
                    imgs.forEach(img => {
                        if (img.isLocal) {
                            flag++;
                        }
                    });
                    for (let i = 0; i < imgs.length; i++) {
                        //判断图片是否上传过
                        if (imgs[i].isLocal) {
                            let formData = new FormData();
                            formData.append('file', convertBase64UrlToBlob(imgs[i].url), 'blob.jpg');
                            console.log(convertBase64UrlToBlob(imgs[i].url));
                            console.log(formData);
                            await that.$axios({
                                method: 'post',
                                url: '/api/upload/img',
                                data: formData
                            }).then(res => {
                                console.log(res);
                                if (res.data.status === 0) {
                                    that.$Modal.error(res.data.msg);
                                    reject();
                                }
                                if (res.data.status === 1) {
                                    imgs[i].url = res.data.data;
                                    imgs[i].isLocal = false;
                                    flag--;
                                    if (flag === 0) {
                                        resolve();
                                    }
                                }
                            }, err => {
                                console.log(err);
                            });
                        }
                    }
                    //如果图片都已经上传，则返回
                    if (flag === 0) {
                        resolve();
                    }
                });
            },
            /**
             * 检测产品对象各个属性的值
             * @method isValid
             */
            isValid () {
                const that = this;
                let index = 1;
                let msg = '';

                if (!that.currentCategory.id) {
                    msg += `${index++}、产品类目不能为空<br/><br/>`;
                }
                if (that.productName.length === 0) {
                    msg += `${index++}、商品名不能为空<br/><br/>`;
                }
                if (that.productPrice === '') {
                    msg += `${index++}、商品售价不能为空<br/><br/>`;
                }
                if (that.productRebate === '') {
                    msg += `${index++}、分销佣金不能为空<br/><br/>`;
                }
                if (that.coverImgList.length === 0) {
                    msg += `${index++}、产品图片不能为空<br/><br/>`;
                }
                if (that.addressList.length === 0) {
                    msg += `${index++}、可用地区不能为空<br/><br/>`;
                }

                for (let i = 0; i < that.formatProperties.length; i++) {
                    let property = that.formatProperties[i];
                    if (property.val[0] === '') {
                        msg += `${index++}、产品规格属性值不能为空<br/><br/>`;
                        break;
                    }
                }

                for (let i = 0; i < that.sellProperties.length; i++) {
                    let property = that.sellProperties[i];
                    let flag = false;
                    for (let j = 0; j < property.val.length; j++) {
                        if (property.val[j] === '' || property.name[j] === '') {
                            msg += `${index++}、销售属性值不能为空<br/><br/>`;
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        break;
                    }
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
            /**
             * 提交产品数据
             * @method commit
             */
            async commit () {
                const that = this;
                // let url = `/api/admin/goods`;
                // let method = 'post';
                // let obj = {};
                await that.sumitImageFile();
                // if (that.isValid()) {
                //     await that.sumitImageFile();
                //     obj.name = that.productName;
                //     obj.brief = that.productBrief;
                //     obj.price = that.productPrice;
                //     obj.rebase = that.productRebate;
                //     obj.classifyHot = false;
                //     obj.goodsPhotos = that.coverImgList;
                //     obj.goodsAreas = that.addressList;
                //     obj.classify = {};
                //     obj.classify.id = that.currentCategory.id;
                //     obj.goodsDetails = {};
                //     obj.goodsDetails.content = that.productDetail;
                //     obj.goodsProperties = [];
                //     obj.goodsProperties.push(...that.formatProperties, ...that.sellProperties);
                //     obj.roles = [];
                //     that.ProductRoles.forEach(item => {
                //         obj.roles.push({id: item});
                //     });
                //     if (that.productId) {
                //         // obj.wxPay = that.product.wxPay;
                //         // obj.bankChargeBacks = that.product.bankChargeBacks;
                //         // obj.cashPay = that.product.cashPay;
                //         method = 'put';
                //         obj.id = that.productId;
                //     }
                //     that.$axios({
                //         url: url,
                //         method: method,
                //         data: obj
                //     }).then(res => {
                //         if (res.data.status === 1) {
                //             that.$Message.success(res.data.msg);
                //             that.closePage('product-edit');
                //             that.$router.push({path: '/product/list'});
                //         } else {
                //             that.$Message.error(res.data.msg);
                //         }
                //     }, err => {
                //         console.log(err);
                //     });
                // }

            },
            closePage (name) {
                this.$store.commit('removeTag', name);
                this.$store.commit('closePage', name);
            },
        },
    };
</script>

<style scoped>

</style>