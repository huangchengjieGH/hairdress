<style lang="less" src="./account.less" scoped></style>
<template>
    <div class="main">
        <div class="header">
            <div class="item">
                <h2>管理员</h2>
            </div>
            <div class="item" style="display:none">
                <Button type="success" @click="showGroupList=true;">管理员分组</Button>
            </div>
            <div class="item">
                <Button type="success" @click="handleEditModal(1)">新建管理员</Button>
            </div>
        </div>
        <Card class="content">
            <Row slot="title">
                <i-col span="3">登录名</i-col>
                <!--<i-col span="3">管理员分组</i-col>-->
                <!--<i-col span="3">用户姓名</i-col>-->
                <!--<i-col span="3">联系电话</i-col>-->
                <!--<i-col span="3">已有权限数</i-col>-->
                <!--<i-col span="3">角色说明</i-col>-->
                <i-col span="3">状态</i-col>
                <i-col span="3">操作</i-col>
            </Row>
            <Row v-for="(admin,index) in adminList" :key="admin.id" class="content-row">
                <i-col span="3">{{admin.username}}</i-col>
                <!--<i-col span="3">{{admin.roles.length?admin.roles[0].role:''}}</i-col>-->
                <!--<i-col span="3">{{admin.name}}</i-col>-->
                <!--<i-col span="3">{{admin.phone}}</i-col>-->
                <!--<i-col span="3">{{admin.permissions.length}}</i-col>-->
                <!--<i-col span="3">{{admin.instructions}}</i-col>-->
                <i-col span="3">{{admin.status === 1 ? '有效' : '无效'}}</i-col>
                <i-col span="3">
                    <Button @click="handleEditModal(2,index)">编辑</Button>
                </i-col>
            </Row>
            <Row style="text-align: right;">
                <Page @on-change="getAdminList" :current.sync="currentPage" :page-size="pageSize" :total="adminSum"
                      simple></Page>
            </Row>
        </Card>


        <!--管理员编辑-->
        <Modal
                width="65%"
                v-model="showAdminEdit"
                :closable="false"
                :mask-closable="false"
                title="新增/修改管理员">
            <div slot="footer"></div>
            <Card>
                <Row class="margin10">
                    <i-col span="4">登录账号</i-col>
                    <i-col span="16">
                        <i-input v-model="admin.username"></i-input>
                    </i-col>
                </Row>
                <Row class="margin10">
                    <i-col span="4">密码</i-col>
                    <i-col span="16">
                        <i-input type="password" v-model="admin.password"></i-input>
                    </i-col>
                </Row>
                <Row class="margin10">
                    <i-col span="4">确认密码</i-col>
                    <i-col span="16">
                        <i-input type="password" v-model="admin.checkPSW"></i-input>
                    </i-col>
                </Row>
                <!--<Row class="margin10">-->
                    <!--<i-col span="4">姓名</i-col>-->
                    <!--<i-col span="16">-->
                        <!--<i-input v-model="admin.name"></i-input>-->
                    <!--</i-col>-->
                <!--</Row>-->
                <!--<Row class="margin10">-->
                    <!--<i-col span="4">手机号码</i-col>-->
                    <!--<i-col span="16">-->
                        <!--<i-input v-model="admin.phone"></i-input>-->
                    <!--</i-col>-->
                <!--</Row>-->
                <!--<Row class="margin10">-->
                    <!--<i-col span="4">所属分组</i-col>-->
                    <!--<i-col span="16">-->
                        <!--<Select @on-change="setAdminExplain" v-model="admin.roles">-->
                            <!--<Option v-for="(group, index) in groupList" :key="group.id" :value="index">{{group.role}}</Option>-->
                        <!--</Select>-->
                    <!--</i-col>-->
                <!--</Row>-->
                <!--<Row class="margin10">-->
                    <!--<i-col span="4">分组说明</i-col>-->
                    <!--<i-col span="16">-->
                        <!--<div v-html="admin.rolesRemark"></div>-->
                    <!--</i-col>-->
                <!--</Row>-->
                <!--<Row class="margin10">-->
                    <!--<i-col span="4">角色说明</i-col>-->
                    <!--<i-col span="16">-->
                        <!--<i-input v-model="admin.instructions" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>-->
                    <!--</i-col>-->
                <!--</Row>-->
                <Row class="margin10">
                    <i-col span="4">状态</i-col>
                    <i-col span="16">
                        <Checkbox v-model="admin.status">有效</Checkbox>
                    </i-col>
                </Row>
                <Row class="margin10" style="text-align: center;">
                    <i-col span="24">
                        <Button @click="saveAdminInfo(1)" type="success">保存</Button>
                        <Button @click="saveAdminInfo(0)">取消</Button>
                    </i-col>
                </Row>
            </Card>
        </Modal>

        <!--//分组列表-->
        <Modal
                width="80%"
                v-model="showGroupList"
                title="分组编辑">
            <div slot="footer"></div>
            <div style="padding: 10px 20px;">
                <Row style="border:1px solid #e9eaec;" :gutter="16">
                    <i-col style="max-height: 60vh;overflow-y: auto;border-right:1px solid #e9eaec;" span="12">
                        <div @click="setCurrentGroup(index)" class="groupRole" v-for="(group,index) in groupList" :key="group.id">
                            <Checkbox v-model="group.isChoose"></Checkbox>
                            <span :class="group.id===currentGroup.id?'isSelect':''"
                                  style="margin-left: -7px;">{{group.role}}</span>
                        </div>
                    </i-col>
                    <i-col style="padding-left: 20px;" span="12">
                        <div v-if="currentGroup" v-html="currentGroup.explain"></div>
                    </i-col>
                </Row>
                <Row style="text-align: center;margin-top: 20px;">
                    <Button type="success" @click="showAddGroup">添加</Button>
                    <Button @click="setGroupInfo">修改</Button>
                    <Button @click="deleteGroup" type="error">删除</Button>
                </Row>
            </div>
        </Modal>


        <!--//添加分组-->
        <Modal
                width="80%"
                v-model="showGroupEdit"
                title="管理员分组">
            <div slot="footer"></div>
            <Card>
                <Row class="margin10">
                    <i-col span="4">
                        分组名
                    </i-col>
                    <i-col span="12">
                        <Input v-model="group.role"></Input>
                    </i-col>
                </Row>
                <Row class="margin10">
                    <i-col span="4">
                        分组权限
                    </i-col>
                    <i-col span="12">
                        <CheckboxGroup v-model="group.permissions">
                            <Checkbox style="margin:10px 30px;" v-for="item in user.explain" :label="item.id">
                                {{item.name}}
                            </Checkbox>
                        </CheckboxGroup>
                    </i-col>
                </Row>
                <Row class="margin10">
                    <i-col span="24" style="text-align: center;">
                        <Button @click="addGroup" type="success">保存</Button>
                    </i-col>
                </Row>
            </Card>
        </Modal>

    </div>
</template>

<script>
    import {sellerId} from '@/tool/const.js';
    import qs from 'qs';
    export default {
        name: 'account',
        data () {
            return {
                user: {},
                showAdminEdit: false,
                showGroupEdit: false,
                showGroupList: false,
                isEdit: false,

                pageSize: 5,
                currentPage: 1,

                groupList: [],
                currentGroup: null,
                adminList: [],
                adminSum: 0,
                currentAdmin: null,

                admin: {
                    username: '',
                    password: '',
                    checkPSW: '',
                    name: '',
                    phone: '',
                    roles: '',
                    rolesRemark: '',
                    instructions: '',
                    status: false,
                },
                group: {
                    id: '',
                    role: '',
                    permissions: [],
                }
            };
        },
        methods: {
            initPermission () {
                // console.log("initPermission");
                const that = this;
                that.user.explain = [];
                // console.log("hcj");
                // console.log(that.user.roles[0].permissions);
                that.user.roles[0].permissions.forEach((permission, index) => {
                    if (permission.permission.startsWith('dashboard')) {
                        that.user.explain.push({
                            index: index,
                            name: '仪表盘',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                    if (permission.permission.startsWith('staff')) {
                        that.user.explain.push({
                            index: index,
                            name: '员工管理',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                    if (permission.permission.startsWith('service')) {
                        that.user.explain.push({
                            index: index,
                            name: '服务范围',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                    if (permission.permission.startsWith('coupon')) {
                        that.user.explain.push({
                            index: index,
                            name: '优惠管理',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                    if (permission.permission.startsWith('vipmanage')) {
                        that.user.explain.push({
                            index: index,
                            name: '会员管理',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                    if (permission.permission.startsWith('report')) {
                        that.user.explain.push({
                            index: index,
                            name: '营业报表',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                    if (permission.permission.startsWith('account')) {
                        that.user.explain.push({
                            index: index,
                            name: '账号管理',
                            isChoose: false,
                            id: permission.id,
                        });
                    }
                });

            },
            handleEditModal (type, index) {
                const that = this;
                switch (type) {
                    case 1 :
                        that.isEdit = false;
                        that.currentAdmin = null;
                        break;
                    case 2 :
                        that.isEdit = true;
                        that.currentAdmin = that.adminList[index];
                        that.setAdminInfo();
                        break;
                }
                that.showAdminEdit = true;
            },

            /**
             * 根据选择的内容初始化需要修改的管理员信息
             * @method setAdminInfo
             * */
            setAdminInfo () {
                this.admin.username = this.currentAdmin.username;
                this.admin.password = this.currentAdmin.password;
                this.admin.checkPSW = this.currentAdmin.password;
                // this.admin.name = this.currentAdmin.name;
                // this.admin.phone = this.currentAdmin.phone;
                // this.admin.instructions = this.currentAdmin.instructions;
                this.admin.status = this.currentAdmin.status === 1 ? true : false;
                // this.admin.roles = '';
                // for (let i = 0; i < this.groupList.length; i++) {
                //     if (this.currentAdmin.roles.length && this.groupList[i].id === this.currentAdmin.roles[0].id) {
                //         this.admin.roles = i;
                //         this.setAdminExplain(i);
                //         break;
                //     }
                // }
                // if (this.admin.roles === '') {
                //     this.groupList.unshift(this.currentAdmin.roles[0]);
                //     this.admin.roles = 0;
                //     this.setAdminExplain(0);
                // }
            },

            showAddGroup () {
                const that = this;
                that.showGroupEdit = true;
                that.group.role = '';
                that.group.permissions.splice(0, that.group.permissions.length);
            },

            setGroupInfo () {
                const that = this;
                let list = [];
                that.groupList.forEach(group => {
                    if (group.isChoose) {
                        list.push(group);
                    }
                });
                if (list.length === 1) {
                    that.group.id = list[0].id;
                    that.group.role = list[0].role;
                    that.group.permissions.splice(0, that.group.permissions.length);
                    list[0].permissions.forEach(permission => {
                        that.group.permissions.push(permission.id);
                    });
                    that.showGroupEdit = true;
                } else {
                    let msg = '一次只能修改一个分组';
                    if (list.length === 0) {
                        msg = '没有选择要修改的分组';
                    }
                    that.$Notice.warning({
                        title: '提示',
                        desc: msg
                    });
                }
            },

            /**
             * 获取管理员列表
             * @method getAdminList
             * */
            getAdminList (page) {
                const that = this;
                that.currentPage = page || that.currentPage;
                let data = {};
                data.sellerId = sellerId;
                that.$axios({
                    url: `/api/user`,
                    method: 'get',
                    params: {
                        sellerId : sellerId,
                        pageSize: that.pageSize,
                        currentPage: that.currentPage
                    }
                }).then(res => {
                    // console.log(res);
                    if (res.data.status === 1) {
                        that.adminList.splice(0, that.adminList.length, ...res.data.data);
                        that.adminSum = res.data.extra.count || that.adminList.length;
                        // console.log(that.adminList);
                    } else {
                        that.$Notice.error({
                            title: '通知',
                            desc: res.data.msg
                        });
                    }
                }, err => {
                    console.error(err);
                });
            },

            setCurrentGroup (index) {
                this.currentGroup = this.groupList[index];
            },

            deleteGroup () {
                const that = this;
                that.$Modal.confirm({
                    title: '分组删除后不可恢复',
                    content: '删除，请点击确认按钮',
                    onOk: async function () {
                        for (let i = 0; i < that.groupList.length; i++) {
                            let group = that.groupList[i];
                            if (group.isChoose) {
                                await that.$axios({
                                    url: `/api/user/role/${group.id}`,
                                    method: 'delete',
                                }).then(res => {
                                    if (res.data.status === 1) {
                                        that.groupList.splice(i, 1);
                                        i--;
                                    } else {
                                        that.$Notice.error({
                                            title: '通知',
                                            desc: res.data.msg
                                        });
                                    }
                                }, err => {
                                    console.error(err);
                                });
                            }
                        }
                    }
                });
            },

            addGroup () {
                const that = this;
                if (that.group.role) {
                    let permissions = [];
                    // console.log(that.group.permissions);
                    that.group.permissions.forEach(item => {
                        permissions.push({
                            id: item
                        });
                    });
                    // console.log(this.user.explain)

                    let url = 'api/user/role';
                    let method = 'post';
                    let data = {
                        sellerId: sellerId,
                        role: that.group.role,
                        permissions,
                    };
                    // console.log(that.group);
                    if (that.group.id) {
                        url = `api/user/role/update/${that.group.id}`;
                        method = 'put';
                    }
                    // console.log(data);
                    that.$axios({
                        url: url,
                        method: method,
                        data: data,
                    }).then(res => {
                        if (res.data.status === 1) {
                            that.getGroupList();
                            that.$Notice.success({
                                title: '通知',
                                desc: '已新建管理员分组'
                            });
                            that.group.id = '';
                            that.group.role = '';
                            that.group.permissions.splice(0, that.group.permissions.length);
                            that.showGroupEdit = false;
                        } else {
                            that.$Notice.error({
                                title: '通知',
                                desc: res.data.msg
                            });
                        }
                    }, err => {
                        console.error(err);
                    });
                } else {
                    that.$Notice.error({
                        title: '提醒',
                        desc: '分组名不能为空'
                    });
                }
            },

            /**
             * 获取管理员分组列表
             * @method getGroupList
             * */
            getGroupList () {
                const that = this;
                let data = {};
                data.sellerId = sellerId;
                // let url = `/api/user?sellerId=${sellerId}`
                that.$axios({
                    url: '/api/user/role/get',
                    method: 'post',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    data: qs.stringify(data)
                }).then(res => {
                    // console.log("hcj");
                    // console.log(res)
                    if (res.data.status === 1) {
                        that.groupList.splice(0, that.groupList.length, ...res.data.data);
                        that.groupList.forEach((group, index) => {
                            group.isChoose = false;
                            that.setGroupExplain(index);
                        });
                        that.currentGroup = that.groupList[0] || null;
                    } else {
                        that.$Notice.error({
                            title: '通知',
                            desc: res.data.msg
                        });
                    }
                }, err => {
                    console.error(err);
                });
            },

            /**
             * 添加分组权限说明
             * @method setGroupExplain
             * @param {number} index groupList 索引
             * */
            setGroupExplain (index) {
                const that = this;
                let group = that.groupList[index];
                let msg = '';
                let msgIndex = 1;
                group.permissions.forEach(permission => {
                    if (permission.permission.startsWith('dashboard')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、仪表盘</div>`;
                    }
                    if (permission.permission.startsWith('staff')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、员工管理</div>`;
                    }
                    if (permission.permission.startsWith('service')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、服务范围</div>`;
                    }
                    if (permission.permission.startsWith('coupon')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、优惠管理</div>`;
                    }
                    if (permission.permission.startsWith('vipmanage')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、会员管理</div>`;
                    }
                    if (permission.permission.startsWith('report')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、营业报表</div>`;
                    }
                    if (permission.permission.startsWith('account')) {
                        msg += `<div style="width:30%;display:inline-block;margin: 20px;">${msgIndex++}、账号管理</div>`;
                    }
                });
                group.explain = msg;
            },

            /**
             * 根据用户选择的管理员分组，添加分组权限说明
             * @method setAdminExplain
             * @param {number} index groupList 索引
             * */
            setAdminExplain (index) {
                const that = this;
                if (index !== '') {
                    let group = that.groupList[index];
                    that.admin.rolesRemark = '';
                    group.permissions.forEach(permission => {
                        if (permission.permission.startsWith('dashboard')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">仪表盘</span>`;
                        }
                        if (permission.permission.startsWith('staff')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">员工管理</span>`;
                        }
                        if (permission.permission.startsWith('service')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">服务范围</span>`;
                        }
                        if (permission.permission.startsWith('coupon')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">优惠管理</span>`;
                        }
                        if (permission.permission.startsWith('vipmanage')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">会员管理</span>`;
                        }
                        if (permission.permission.startsWith('report')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">营业报表</span>`;
                        }
                        if (permission.permission.startsWith('account')) {
                            that.admin.rolesRemark += `<span style="margin-right: 20px;">账号管理</span>`;
                        }
                    });
                }
            },

            /**
             * 检测对象各个属性的值
             * @method isValidAdmin
             */
            isValidAdmin () {
                const that = this;
                let index = 1;
                let msg = '';

                if (!that.admin.username) {
                    msg += `${index++}、登录账号不能为空<br/><br/>`;
                }

                if (!that.admin.password) {
                    msg += `${index++}、密码不能为空<br/><br/>`;
                }

                if (that.admin.checkPSW !== that.admin.password) {
                    msg += `${index++}、两次密码不一致<br/><br/>`;
                }

                // if (!that.admin.name) {
                //     msg += `${index++}、姓名不能为空<br/><br/>`;
                // }
                //
                // if (!that.admin.phone || !/^\d{11}$/.test(that.admin.phone)) {
                //     msg += `${index++}、手机号码错误<br/><br/>`;
                // }

                // if (that.admin.roles === '') {
                //     msg += `${index++}、所属分组不能为空<br/><br/>`;
                // }

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
             * 请空数据
             * @method clearAdminInfo
             * */
            clearAdminInfo () {
                this.admin.username = '';
                this.admin.password = '';
                this.admin.checkPSW = '';
                this.admin.name = '';
                this.admin.phone = '';
                this.admin.roles = '';
                this.admin.rolesRemark = '';
                this.admin.instructions = '';
                this.admin.status = false;
                for (let i = 0; i < this.groupList.length; i++) {
                    if (!this.groupList[i].available) {
                        this.groupList.splice(i, 1);
                        i--;
                    }
                }
            },

            /**
             * 新增一个管理员
             * @method saveAdminInfo
             * */
            saveAdminInfo (type) {
                const that = this;
                if (type) {
                    // console.log("确定");
                    if (that.isValidAdmin()) {
                        let method = 'post';
                        let url = '/api/user';
                        // let admin = {
                        //     sellerId: sellerId,
                        //     username: that.admin.username,
                        //     password: that.admin.password,
                        //     // name: that.admin.name,
                        //     // phone: that.admin.phone,
                        //     // type: 3,
                        //     // instructions: that.admin.instructions,
                        //     // status: that.admin.status ? 1 : 0,
                        //     roles: [{id: that.groupList[that.admin.roles].id}],
                        //     roles: 'business'
                        // };
                        let params = {
                            sellerId : sellerId,
                            username: that.admin.username,
                            password: that.admin.password,
                            role: 'business',
                            status: that.admin.status ? 1 : 0
                        }
                        if (that.currentAdmin) {
                            url = `/api/user/update/${that.currentAdmin.id}`;
                            method = 'put';
                        }
                        // console.log(admin);
                        // console.log(that.groupList[that.admin.roles]);
                        that.$axios({
                            url: url,
                            method: method,
                            params: params
                        }).then(res => {
                            if (res.data.status === 1) {
                                that.$Notice.success({
                                    title: '消息',
                                    desc: '新增管理员成功'
                                });
                                that.clearAdminInfo();
                                // if (!that.isEdit) {
                                //     that.getAdminList(1);
                                // } else {
                                //     that.getAdminList();
                                // }
                                that.showAdminEdit = false;
                                that.isEdit = false;
                                that.currentAdmin = null;
                            } else {
                                that.$Notice.warning({
                                    title: '消息',
                                    desc: res.data.msg
                                });
                            }
                        }, err => {
                            console.error(err);
                        });
                    }
                } else {
                    // console.log("取消");
                    if (that.isEdit) {
                        that.clearAdminInfo();
                    }
                    that.showAdminEdit = false;
                    that.isEdit = false;
                    that.currentAdmin = null;
                }
            }
        },
        mounted () {
            // this.user = JSON.parse(sessionStorage.getItem('user')) || {};
            this.user = {
                explain : [
                     {
                    id: 1,
                    index:0,
                    isChoose:false,
                    name: '仪表盘'
                     },
                    {
                    id: 2,
                    index:2,
                    isChoose:false,
                    name: '员工管理'
                    },
                   {
                    id: 3,
                    index:3,
                    isChoose:false,
                    name: '服务范围'
                   },
                   {
                    id: 4,
                    index:4,
                    isChoose:false,
                    name: '优惠管理'
                    },
                    {
                    id: 5,
                    index:5,
                    isChoose:false,
                    name: '会员管理'
                   },
                   {
                       id: 6,
                    index:7,
                    isChoose:false,
                    name: '营业报表'
                   },
                   {
                    id: 7,
                    index:10,
                    isChoose:false,
                    name: '账号管理'
                   }
            ],
            permissions:[
                 "dashboard",
                 "staff",
                 "service",
                 "coupon",
                 "vipmanage",
                 "report",
                 "account"
        ],
            roles:[
                {available:false,
                    id:32,
                    permissions:[
                        {
                            available: true,
                            id:1,
                            permission:"dashboard"
                        },
                        {
                            available: true,
                            id:2,
                            permission:"staff"
                        },
                        {
                            available: true,
                            id:3,
                            permission:"service"
                        },
                        {
                            available: true,
                            id:4,
                            permission:"coupon"
                        },
                        {
                            available: true,
                            id:5,
                            permission:"vipmanage"
                        },
                        {
                            available: true,
                            id:6,
                            permission:"report"
                        },
                        {
                            available: true,
                            id:7,
                            permission:"account"
                        }
                        ],
                    role:"admin"
                }

            ],
            userName:"admin"
        };
            // console.log(this.user);
            // console.log(Object.keys(this.user).length);

            if (Object.keys(this.user).length) {
                this.initPermission();
            }
             this.getAdminList();
            // this.getGroupList();
        },
    };
</script>
