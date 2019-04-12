<template>
    <v-page class="detailList">
        <div id="container">
        <div id="top" style="text-align:center;">
            <div style="height:1.2rem;line-height:1.2rem;color:#A5B0C3;font-size:0.8rem">
            <span class="cityLine"></span> <span>{{data.city}}</span> <span class="cityLine"></span>
            </div>
        </div>
        <div id="main">
                <ul>
                    <li>
                        <div class="hotelItem" @click="checkHotel('aabbcc123')">
                            <img src="~@/assets/logo.png">
                            <p class="hotelName">广州柏悦酒店</p>
                            <p class="hotelPosition">广州市天河区珠江新城华夏路16号</p>
                            <p class="hotelNumber">020-37691234</p>
                            <span class="hotelPrice"><span style="font-size:0.8rem;margin-right:-0.2rem;color:#FE4967;">￥</span><span style="font-size:1rem;color:#FE4967;">1000</span>起</span>
                        </div>
                    </li>
                    <li>
                        <div class="hotelItem">
                            <img src="~@/assets/logo.png">
                            <p class="hotelName">广州柏悦酒店</p>
                            <p class="hotelPosition">广州市天河区珠江新城华夏路16号</p>
                            <p class="hotelNumber">020-37691234</p>
                            <span class="hotelPrice"><span style="font-size:0.8rem;margin-right:-0.2rem;color:#FE4967;">￥</span><span style="font-size:1rem;color:#FE4967;">1000</span>起</span>
                        </div>
                    </li>
                </ul>
        </div>

    </div>
    </v-page>
</template>

<script>
import { getHotelList } from '@/api/index.js'
import {saveData, getData} from '@/utils/tools.js';
export default {
    name:"hotelList",
    data(){
        return {
            data:{
                
            },

        }
    },
    methods:{
        checkHotel(id){
            this.$router.push({name:"hotelDetail",params:{...this.data},query:{hotelId:id}})
        },
    },
    mounted(){
        const data=this.$route.params;
        
        if(!data.hotelCount){
            this.data=getData();
        }else{
            this.data={...data,hotelName:null};
        }
    },
    beforeDestroy(){
        saveData(this.data);
    },
    components:{
        
    }
}
</script>

<style lang="less">
@import "~@/style/base.less";
.detailList {
    .cityLine {
        display: inline-block;
        margin: 0 0.5rem;
        width: 5rem;
        height: 1.2rem;
        background: url(~@/assets/img/line.png) no-repeat center/5rem 2px;
        vertical-align: middle;
    }
    #top {
        padding-top: 20px;
        font-size: 18px;
    }
    #main {
        padding: 0 0.4rem;
        &>ul>li:last-of-type {
            .hotelItem {
                border: none;
            }
        }
        .hotelItem {
        height: 5.325rem;
        padding: 0.75rem 0;
        width: 100%;
        position: relative;
        border-bottom: 1px solid #E4E5E7;
        &>p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        img {
            width: 3.5rem;
            height: 3.825rem;
            border-radius: 4px;
            float: left;
            margin-right: 0.35rem;
        }
        .hotelName {
            color:#25272D;
            font-size: 0.8rem;
            line-height: 1.5rem;
        }
        .hotelPosition {
            color:#454854;
            padding-left: 1rem;
            font-size: 0.6rem;
            line-height: 1.2rem;
            background: url('~@/assets/icons/position.png') no-repeat left center/0.8rem;
        }
        .hotelNumber {
            color: #454854;
            padding-left: 1rem;
            font-size: 0.6rem;
            line-height: 1.2rem;
            background: url('~@/assets/icons/phone.png') no-repeat left center/0.7rem;
        }
        .hotelPrice {
            position: absolute;
            color: #A5B0C3;
            font-size: 0.6rem;
            bottom: 0.7rem;
            right: 0;

        }
        
    }
    }
    



}

</style>

