<style lang="less">
    @import '../../../styles/common.less';
    @import '../staff.less';
</style>
<template>
    <div class="newStaff-main">
        <Card>
          <Row>
            <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
             <p class="notwrap">姓名</p>
            </i-col>
            <i-col span="1">
             <Input v-model="staffName" placeholder="输入员工名称" style="width: 200px"></Input>
            </i-col>
           </Row>
           <Row class="margin-top-20">
               <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
               <p class="notwrap">职位</p>
               </i-col>
               <i-col span="2">
               <Input v-model="job" placeholder="输入职位，例如：店长" style="width: 200px"></Input>
               </i-col>
           </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">工号</p>
                </i-col>
                <i-col span="2">
                <Input v-model="jobNum" placeholder="输入员工工号" style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                    <p class="notwrap">电话</p>
                </i-col>
                <i-col span="2">
                    <Input v-model="phone" placeholder="输入员工电话" style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">评价</p>
                </i-col>
                <i-col span="2">
                <Input v-model="evaluate" placeholder="例如：100%" style="width: 200px"></Input>
                </i-col>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                 <p class="notwrap">上传头像</p>
                </i-col>
                <Row>
                    <upload-img :coverImgList="AvatarURL"></upload-img>
                </Row>
                </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">服务范围</p>
                </i-Col>
                <i-Col>
                <Card style="width: 600px;margin-left: 120px">
                    <can-edit-table refs="table2" v-model="barberService" :columns-list="editInlineColumns"></can-edit-table>
                    <i-Col style="padding-top: 20px;">
                    <Button @click="addServiceTag" type="primary">添加新服务</Button>
                    </i-Col>
                </Card>
                </i-Col>
            </Row>
            <Row class="margin-top-20">
                <i-Col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">标签</p>
                </i-Col>
                <Row>
                    <i-Col span="10">
                    <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择技师标签">
                        <Option v-for="item in articleTagList" :value="item.tag" :key="item.tag">{{ item.tag }}</Option>
                    </Select>
                    </i-Col>
                    <i-Col span="2" class="padding-left-10">
                    <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="primary">新建标签</Button>
                    </i-Col>
                </Row>
                <transition name="add-new-tag">
                    <div v-show="addingNewTag" class="add-new-tag-con">
                        <i-Col span="5">
                        <Input v-model="newTagName" placeholder="请输入标签名" />
                        </i-Col>
                        <i-Col span="3" class="padding-left-10">
                        <Button @click="createNewTag" long type="primary">确定</Button>
                        </i-Col>
                        <i-Col span="3" class="padding-left-10">
                        <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                        </i-Col>
                    </div>
                </transition>
            </Row>
            <Row class="margin-top-20">
                <i-col span="2" style="margin-left: 20px;margin-top: 5px;">
                <p class="notwrap">上传作品图</p>
                </i-col>
                <Row>
                    <upload-img :coverImgList="coverImgs"></upload-img>
                </Row>
            </Row>
            <Row class="margin-top-10">
                <div class="confirm-con">
                    <i-col span="5" class="margin-left-20">
                    <Button @click="onCancelTag" long type="ghost">取消</Button>
                    </i-col>
                    <i-col span="5" class="margin-left-20">
                    <Button @click="commit" long type="primary">提交</Button>
                    </i-col>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    import canEditTable from './canEditTable.vue';
    import ICol from 'iview/src/components/grid/col';
    import uploadImg from '@/common/uploadImg.vue';
    import {convertBase64UrlToBlob} from '@/tool/transform.js';
    // import {sellerId} from '@/tool/const.js';
    export default {
        name: 'newstaff_index',
        components: {
            ICol,
            canEditTable,
            uploadImg
        },
        data () {
            return {
                sellerId: localStorage.getItem('sellerId'),
                defaultList: [
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                staffName: '',
                job: '',
                jobNum: '',
                phone: '',
                evaluate: '',
                imgName: '',
                visible: false,
                uploadList: [],
                articleTagSelected: [], // 选中的标签
                articleTagList: [], // 所有标签列表
                addingNewTag: false, // 添加新标签
                newTagName: '', // 新建标签名
                editInlineColumns: [],
                barberService: [],   //服务数组
                service: {
                    name: '例如:发型设计',
                    price: '例如:50',
                    vipPrice: '例如:25'
                },
                coverImgList: [],
                coverImgs: [],
                barkWorks: [],     //作品数组
                barberSkills: [],  //标签数组
                AvatarURL: [],
                Avatars: []     //头像数组
            };
        },
        methods: {
            getData () {
                this.editInlineColumns = [
                    {
                        title: '服务名称',
                        align: 'center',
                        key: 'name',
                        editable: true
                    },
                    {
                        title: '价格',
                        align: 'center',
                        key: 'price',
                        editable: true
                    },
                    {
                        title: '会员价格',
                        align: 'center',
                        key: 'vipPrice',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        key: 'handle',
                        handle: ['edit', 'delete']
                    }
                ];
                this.barberService = [
                    {
                        name: '例如:发型设计',
                        price: '例如:50',
                        vipPrice: '例如：25'
                    }
                ];
            },
            /**
             * 上传头像图片
             * @method sumitImageFile
             */
            sumitAvatarFile () {
                const that = this;
                return new Promise(async function (resolve, reject) {
                    let Avatar = {};
                    let imgs = that.AvatarURL;
                    //记录异步上传的图片个数
                    let flag = 0;
                    imgs.forEach(img => {
                        if (img.isLocal) {
                            flag++;
                        }
                    });
                    console.log(imgs);
                    for (let i = 0; i < imgs.length; i++) {
                        //判断图片是否上传过
                        if (imgs[i].isLocal) {
                            console.log('未上传');
                            let formData = new FormData();
                            formData.append('file', convertBase64UrlToBlob(imgs[i].url), 'blob.jpg');
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
                                    Avatar.imgUrl = res.data.data;
                                    flag--;
                                    if (flag === 0) {
                                        resolve();
                                    }
                                }
                            }, err => {
                                console.log(err);
                            });
                        } else {
                            console.log('已上传');
                        }
                        that.Avatars.push(Avatar);
                        Avatar = {};
                    }
                    console.log('Avatars');
                    console.log(that.Avatars);
                    //如果图片都已经上传，则返回
                    if (flag === 0) {
                        resolve();
                    }
                });
            },
            /**
             * 上传产品图片
             * @method sumitImageFile
             */
            sumitImageFile () {
                const that = this;
                return new Promise(async function (resolve, reject) {
                    let barkWork = {};
                    let imgs = that.coverImgs;
                    //记录异步上传的图片个数
                    let flag = 0;
                    imgs.forEach(img => {
                        if (img.isLocal) {
                            flag++;
                        }
                    });
                    console.log(imgs);
                    for (let i = 0; i < imgs.length; i++) {
                        //判断图片是否上传过
                        if (imgs[i].isLocal) {
                            console.log('未上传');
                            let formData = new FormData();
                            formData.append('file', convertBase64UrlToBlob(imgs[i].url), 'blob.jpg');
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
                                    barkWork.name = i;
                                    barkWork.imgUrl = res.data.data;
                                    flag--;
                                    if (flag === 0) {
                                        resolve();
                                    }
                                }
                            }, err => {
                                console.log(err);
                            });
                        } else {
                            console.log('已上传');
                        }
                        that.barkWorks.push(barkWork);
                        barkWork = {};
                    }
                    console.log('barkWorks');
                    console.log(that.barkWorks);
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


                if (that.staffName === '') {
                    msg += `${index++}、员工名字不能为空<br/><br/>`;
                }
                if (that.job === '') {
                    msg += `${index++}、员工职位不能为空<br/><br/>`;
                }
                if (that.jobNum === '') {
                    msg += `${index++}、员工职位不能为空<br/><br/>`;
                }
                if (that.phone === '') {
                    msg += `${index++}、员工电话不能为空<br/><br/>`;
                }
                if (that.evaluate === '') {
                    msg += `${index++}、员工评价不能为空<br/><br/>`;
                }
                // if (that.Avatars.length === 0) {
                //     msg += `${index++}、员工头像不能为空<br/><br/>`;
                // }
                if (that.barberSkills.length === 0) {
                    msg += `${index++}、员工标签不能为空<br/><br/>`;
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
                let url = `/api/admin/barber`;
                let method = 'post';
                let obj = {};

                if (that.isValid()) {
                    await that.sumitAvatarFile();
                    await that.sumitImageFile();
                    obj.sellerId = that.sellerId;
                    obj.name = that.staffName;
                    obj.jobNum = that.jobNum;
                    obj.job = that.job;
                    obj.phone = that.phone;
                    obj.evalutation = that.evaluate;
                    obj.imgUrl = that.Avatars[0].imgUrl;
                    obj.status = 1;
                    obj.services = that.barberService;
                    obj.barberSkills = that.barberSkills;
                    obj.barberWorks = that.barkWorks;
                    // console.log(obj);

                    that.$axios({
                        url: url,
                        method: method,
                        data: obj
                    }).then(res => {
                        console.log(res)
                        if (res.data.status === 1) {
                            that.$Message.success(res.data.msg);
                            that.closePage('newstaff_index');
                            that.$router.push({name: 'staff_index'});
                        } else {
                            that.$Message.error(res.data.msg);
                        }
                    }, err => {
                        console.log(err);
                    });
                }

            },
            handleAddNewTag () {
                this.addingNewTag = !this.addingNewTag;
            },
            handleSelectTag () {
                var temp = {};
                var barberSkill = [];
                localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表

                let barberSkillList = this.articleTagSelected;
                for (var idx in barberSkillList){
                    temp = {
                        "name": barberSkillList[idx]
                    }
                    barberSkill.push(temp);
                }
                this.barberSkills = barberSkill;
            },
            createNewTag () {
                if (this.newTagName.length !== 0) {
                    this.articleTagList.push({tag: this.newTagName});
                    this.addingNewTag = false;
                    setTimeout(() => {
                        this.newTagName = '';
                    }, 200);
                } else {
                    this.$Message.error('请输入标签名');
                }
            },
            cancelCreateNewTag () {
                this.newTagName = '';
                this.addingNewTag = false;
            },
            addServiceTag () {
                this.$Message.info('ok');
                this.barberService.push(this.service);
            },
            onCancelTag () {
                const that = this;
                that.closePage('newstaff_index');
                that.$router.push({
                    name: 'staff_index'
                });
            },
            onComfirmTag () {
                console.log(this.barberService);
            },
            closePage (name) {
                this.$store.commit('removeTag', name);
                this.$store.commit('closePage', name);
            }
        },
        mounted () {
            this.articleTagList = [
                {tag: '理发'},
                {tag: '染发'},
                {tag: '烫发'},
                {tag: '造型'},
                {tag: '按摩'}
            ];
            // this.uploadList = this.$refs.upload.fileList;
        },
        created () {
            this.getData();
        }
    };
</script>

<style scoped>

</style>