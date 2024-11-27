<template>
    <div>
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        <Artplayer @get-instance="getInstance" :option="artplayerObj.option" :free="free" :style="artplayerObj.style" />
    </div>
</template>
 
<script>
import Artplayer from "@/components/artplayer/index";
import { API_URL } from '@/config/public-config'

export default {
    components: {
        Artplayer
    },
    props: {  
    },
    data() {
        return {
            params:{},
            // 视频对象
            artplayerObj: {
                option: {
                    lang: 'zh-cn', // or 'en'
                    url: '',
                    type: ''
                },
                style: {
                    height: '56.25vw',
                    width: '100vw'
                }
            },
        }
    },
    methods: {
        async ajaxData() {
            this.free = this.params.free || ''
            this.artplayerObj.option = {
                fullscreen: true,
                autoOrientation: true,
                lang: 'zh-cn', // or 'en'
                airplay: true,
                url: `${API_URL}api/file/m3u8?path=${encodeURIComponent(this.params.path)}&disk_id=${this.params.disk_id}&username=${this.params.username}&file_type=1`,
                type: 'm3u8'
            }
        },
        getInstance(art) {
           (art);
        },
        onClickLeft() {
            this.$router.back()
        }
    },
    computed: {

    },
    mounted() {
        this.params = this.$route.params
        this.ajaxData()
    }
};
</script>

<style lang="scss" scoped></style>