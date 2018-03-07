<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
// import {setRoutesShowState} from '@/routerSafe.js';
import {otherRouter, appRouter} from '@/router/router.js';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    created () {
        this.form.userName = localStorage.getItem('userName') || '';
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                const that = this;
                if (valid) {
                    // Cookies.set('user', this.form.userName);
                    // Cookies.set('password', this.form.password);
                    // this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    // if (this.form.userName === 'iview_admin') {
                    //     Cookies.set('access', 0);
                    // } else {
                    //     Cookies.set('access', 1);
                    // }
                    // this.$router.push({
                    //     name: 'home_index'
                    // });
                    that.$axios({
                        url: '/api/user/login',
                        method: 'put',
                        params: {
                            username: that.form.userName,
                            password: that.form.password
                        }
                    }).then(res => {
                        console.log(res);
                        if (res.data.status === 1) {
                            let user = res.data.data;
                            let routeName = '';
                            localStorage.setItem('userName', user.username);
                            localStorage.setItem('sellerId', user.sellerId);
                            sessionStorage.setItem('user', JSON.stringify({
                                userName: user.username,
                                permissions: user.permissions,
                                roles: user.roles
                            }));
                            Cookies.set('user', user.username);
                            Cookies.set('password', that.$md5(user.password));
                            that.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

                            // that.$router.setRoutesShowState();
                            //
                            // if (otherRouter.children[0].meta.isShow) {
                            //     routeName = otherRouter.children[0].name;
                            // } else {
                            //     for (let i = 0; i < appRouter.length; i++) {
                            //         let route = appRouter[i];
                            //         if (route.children[0].meta.isShow) {
                            //             routeName = route.children[0].name;
                            //             break;
                            //         }
                            //     }
                            // }
                            // console.log(routeName);
                            // if (routeName) {
                            //     that.$router.push({
                            //         name: 'home_index'
                            //     });
                            // }
                            console.log('跳转');
                            that.$router.push({
                                name: 'home_index'
                            });
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
            });
        }
    }
};
</script>

<style>

</style>
