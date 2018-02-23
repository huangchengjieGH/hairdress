<style lang="less" src="./uploadImg.less" scoped></style>
<template>
    <div class="center-flex" style="flex-wrap: wrap;align-items: flex-start;">
        <div class="demo-upload-list" v-for="(img ,index) in coverImgList">
            <template>
                <img :src="img.isLocal?img.url:imgDns+img.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(img.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="deleteImg(index)"></Icon>
                </div>
            </template>
            <Modal title="View Image" v-model="visible">
                <img :src="img.isLocal?img.url:imgDns+img.url" v-if="visible" style="width: 100%">
            </Modal>
        </div>
        <div class="upload">
            <Icon class="upload-icon" type="camera" size="20"></Icon>
            <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="addImg"/>
        </div>
    </div>
</template>

<script>
    /**
     * 图片上传组件
     * @module uploadImg
     */
    import {imgDns} from '@/tool/const.js';
    export default {
        name: 'upload-img',
        data () {
            return {
                imgDns,
                visible: false
            };
        },
        props: {
            coverImgList: {
                type: Array,
                required: true
            }
        },
        methods: {
            /**
             * 从显示图片列表中删除一个元素
             * @method deleteImg
             */
            deleteImg (index) {
                const that = this;
                that.coverImgList.splice(index, 1);
            },
            /**
             * 读取本地图片，添加一个显示图片元素
             * @method addImg
             */
            addImg (e) {
                // console.log('addImg');
                const that = this;
                let file = e.target.files[0];
                let reader = new FileReader();
                if (file.size > 2 * 1024 * 1024) {
                    that.$Modal.warning({
                        title: '提示',
                        content: '图片不能大于2M'
                    });
                } else {
                    reader.onload = () => {
                        that.coverImgList.push({
                            url: reader.result,
                            isMain: false,
                            isLocal: true
                        });
                        reader.onload = null;
                    };
                    reader.readAsDataURL(file);
                }
                // console.log(this.coverImgList);
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            }
        }
    };
</script>

<style scoped>

</style>