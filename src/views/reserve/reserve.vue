<style lang="less">
    @import './reserve.less';
</style>
<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">未确定</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hasread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已确定</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hasreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('recyclebin')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'recyclebin'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已取消</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="recyclebinCount"></Badge></Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"></Table>
                </div>
            </transition>
            <!--<transition name="back-message-list">-->
                <!--<div v-if="!showMesTitleList" class="message-view-content-con">-->
                    <!--<div class="message-content-top-bar">-->
                        <!--<span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>返回</Button></span>-->
                        <!--<h3 class="mes-title">{{ mes.title }}</h3>-->
                    <!--</div>-->
                    <!--<p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.time }}</p>-->
                    <!--<div class="message-content-body">-->
                        <!--<p class="message-content">{{ mes.content }}</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</transition>-->
        </div>
    </div>
</template>

<script>

    export default {
        name: "reserve_index",
        data () {
            // 点击事件
            const markAsreadBtn = (h, params) => {
                return h('Button', {
                    props: {
                        type: 'primary'
                    },
                    style: {
                        margin: '0 5px'
                    },
                    on: {
                        click: () => {
                            this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                            this.$store.commit('setMessageCount', this.unreadMesList.length);
                        }
                    }
                }, '确认');
            };
            const markCondBtn = (h, params) => {
                return h('Button', {
                    props: {
                        type: 'default'
                    },
                    on: {
                        click: () => {
                            // this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                            // this.$store.commit('setMessageCount', this.unreadMesList.length);
                            this.outputHi(this.currentMesList[params.index].name);
                        }
                    }
                }, '驳回');
            };
            const deleteMesBtn = (h, params) => {
                return h('Button', {
                    props: {
                        size: 'small',
                        type: 'error'
                    },
                    on: {
                        click: () => {
                            this.recyclebinList.unshift(this.hasreadMesList.splice(params.index, 1)[0]);
                        }
                    }
                }, '删除');
            };
            const restoreBtn = (h, params) => {
                return h('Button', {
                    props: {
                        size: 'small',
                        type: 'error'
                    },
                    on: {
                        click: () => {
                            this.hasreadMesList.unshift(this.recyclebinList.splice(params.index, 1)[0]);
                        }
                    }
                }, '删除');
            };
            return {
                currentMesList: [],
                unreadMesList: [],
                hasreadMesList: [],
                recyclebinList: [],
                currentMessageType: 'unread',
                showMesTitleList: true,
                unreadCount: 0,
                hasreadCount: 0,
                recyclebinCount: 0,
                noDataText: '暂无未读消息',
                mes: {
                    title: '',
                    time: '',
                    content: ''
                },
                mesTitleColumns: [
                    // {
                    //     type: 'selection',
                    //     width: 50,
                    //     align: 'center'
                    // },
                    {
                        title: '技师',
                        key: 'name',
                        align: 'center',
                        className: 'tableCol',
                        ellipsis: true,
                        // render: (h, params) => {
                        //     return h('a', {
                        //         on: {
                        //             click: () => {
                        //                 this.showMesTitleList = false;
                        //                 this.mes.title = params.row.title;
                        //                 this.mes.time = this.formatDate(params.row.time);
                        //                 this.getContent(params.index);
                        //             }
                        //         }
                        //     }, params.row.title);
                        // }
                    },
                    {
                        title: '职位',
                        key: 'job',
                        align: 'center',
                        ellipsis: true,
                        // render: (h, params) => {
                        //     return h('a', {
                        //         on: {
                        //             click: () => {
                        //                 this.showMesTitleList = false;
                        //                 this.mes.title = params.row.title;
                        //                 this.mes.time = this.formatDate(params.row.time);
                        //                 this.getContent(params.index);
                        //             }
                        //         }
                        //     }, params.row.title);
                        // }
                    },
                    {
                        title: '服务',
                        key: 'service',
                        align: 'center',
                        ellipsis: true,
                        // render: (h, params) => {
                        //     return h('a', {
                        //         on: {
                        //             click: () => {
                        //                 this.showMesTitleList = false;
                        //                 this.mes.title = params.row.title;
                        //                 this.mes.time = this.formatDate(params.row.time);
                        //                 this.getContent(params.index);
                        //             }
                        //         }
                        //     }, params.row.title);
                        // }
                    },
                    {
                        title: '预约时间',
                        key: 'time',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            return h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    },
                                    style: {
                                        margin: '0 5px'
                                    }
                                }),
                                h('span', {
                                    props: {
                                        type: 'android-time',
                                        size: 12
                                    }
                                }, this.formatDate(params.row.time))
                            ]);
                        }
                    },
                    {
                        title: ' ',
                        key: 'asread',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            if (this.currentMessageType === 'unread') {
                                return h('div', [
                                    markAsreadBtn(h, params),
                                    markCondBtn(h,params)
                                ]);
                            } else if (this.currentMessageType === 'hasread') {
                                return h('div', [
                                    deleteMesBtn(h, params)
                                ]);
                            } else {
                                return h('div', [
                                    restoreBtn(h, params)
                                ]);
                            }
                        }
                    }
                ]
            };
        },
        methods: {
            formatDate (time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
            },
            backMesTitleList () {
                this.showMesTitleList = true;
            },
            getProductList () {
                const that = this;
                return new Promise(function (resolve, reject) {
                    that.$axios({
                        url: 'api/admin/goods/classify?sellerId=1',
                        method: 'get'
                    }).then(res => {
                        console.log(res);
                        resolve();
                    }, err => {
                        console.log(err);
                    });
                });
            },
            // 设置当前显示内容,用于切换
            setCurrentMesType (type) {
                if (this.currentMessageType !== type) {
                    this.showMesTitleList = true;
                }
                this.currentMessageType = type;
                if (type === 'unread') {
                    this.noDataText = '暂无未读消息';
                    this.currentMesList = this.unreadMesList;
                } else if (type === 'hasread') {
                    this.noDataText = '暂无已读消息';
                    this.currentMesList = this.hasreadMesList;
                } else {
                    this.noDataText = '回收站无消息';
                    this.currentMesList = this.recyclebinList;
                }
            },
            // getContent (index) {
            //     // you can write ajax request here to get message content
            //     let mesContent = '';
            //     switch (this.currentMessageType + index) {
            //         case 'unread0': mesContent = '这是您点击的《欢迎登录iView-admin后台管理系统，来了解他的用途吧》的相关内容。'; break;
            //         case 'unread1': mesContent = '这是您点击的《使用iView-admin和iView-ui组件库快速搭建你的后台系统吧》的相关内容。'; break;
            //         case 'unread2': mesContent = '这是您点击的《喜欢iView-admin的话，欢迎到github主页给个star吧》的相关内容。'; break;
            //         case 'hasread0': mesContent = '这是您点击的《这是一条您已经读过的消息》的相关内容。'; break;
            //         default: mesContent = '这是您点击的《这是一条被删除的消息》的相关内容。'; break;
            //     }
            //     this.mes.content = mesContent;
            // },
            outputHi (name) {
                this.$Message.info(name);
            }
        },
        mounted () {
            this.currentMesList = this.unreadMesList = [
                {
                    name: '佳佳',
                    job: '店长',
                    service: '发型设计',
                    time: 1507390106000
                },
                {
                    name: '诗诗',
                    job: '总监',
                    service: '特效染发',
                    time: 1507390106000
                },
                {
                    name: '娜娜',
                    job: '高级理发师',
                    service: '洗剪吹',
                    time: 1507390106000
                }
            ];
            this.hasreadMesList = [
                {
                    name: '佳佳',
                    job: '店长',
                    service: '发型设计',
                    time: 1507390106000
                }
            ];
            this.recyclebinList = [
                {
                    name: '佳佳',
                    job: '店长',
                    service: '发型设计',
                    time: 1507390106000
                }
            ];
            this.unreadCount = this.unreadMesList.length;
            this.hasreadCount = this.hasreadMesList.length;
            this.recyclebinCount = this.recyclebinList.length;
            this.getProductList();
        },
        watch: {
            unreadMesList (arr) {
                this.unreadCount = arr.length;
            },
            hasreadMesList (arr) {
                this.hasreadCount = arr.length;
            },
            recyclebinList (arr) {
                this.recyclebinCount = arr.length;
            }
        }
    }
</script>
