<template>
    <v-page class="hotel-detail">
        <v-content>
            <div class="topSwiper">
                <mt-swipe :show-indicators="false" :speed=500>
                    <mt-swipe-item>
                        <img src="~@/assets/img/hotelImg.png">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="~@/assets/img/hotelImg.png">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="~@/assets/img/hotelImg.png">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="main">
                <div class="hotelInfo">
                    <p class="hotelName">广州柏悦酒店</p>
                    <p class="starBox"><span></span><span></span><span></span><span></span><span></span></p>
                    <p class="hotelPosition">广州市天河区珠江新城华夏路16号</p>
                    <a class="hotelNumber" href="tel:400-0000-688">020-37691234</a>
                </div>
                <div class="roomInfo">
                    <div class="title">房型</div>
                    <div class="priceList">
                        <div class="priceItem">
                            <p>豪华套房</p>
                            <p>大床|含早</p>
                            <div class="checkBtn" @click="checkRoom('123')">预定</div>
                            <div class="price"><span style="font-size:0.6rem;margin-right:-0.1rem;">￥</span><span style="font-size:0.9rem;">1000</span>均</div>
                        </div>
                        <div class="priceItem">
                            <p>豪华套房</p>
                            <p>大床|含早</p>
                            <div class="checkBtn" @click="checkRoom('123')">预定</div>
                            <div class="price"><span style="font-size:0.6rem;margin-right:-0.1rem;">￥</span><span style="font-size:0.9rem;">1000</span>均</div>
                        </div>
                        <div class="priceItem">
                            <p>豪华套房</p>
                            <p>大床|含早</p>
                            <div class="checkBtn" @click="checkRoom('123')">预定</div>
                            <div class="price"><span style="font-size:0.6rem;margin-right:-0.1rem;">￥</span><span style="font-size:0.9rem;">1000</span>均</div>
                        </div>
                        <div class="priceItem">
                            <p>豪华套房</p>
                            <p>大床|含早</p>
                            <div class="checkBtn" @click="checkRoom('123')">预定</div>
                            <div class="price"><span style="font-size:0.6rem;margin-right:-0.1rem;">￥</span><span style="font-size:0.9rem;">1000</span>均</div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </v-content>
        
        
    </v-page>
</template>

<script>
import {} from '@/api/index.js'
import {saveData, getData} from '@/utils/tools.js';
import RfFooterTab from '@/components/Footer.vue';
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    name:"hotelDetail",
    data(){
        return {
            data:{},
        }
    },
    methods:{
        checkRoom(type){
            this.data.hotelType=type;
            this.$router.push({name:"bookingInfo",params:{...this.data}})
        },
    },
    mounted(){
        const data=this.$route.params;
        if(!data.hotelCount){
            this.data=getData();
        }else{
            this.data={...data,roomeType:null};
        }
        
    },
    beforeDestroy(){
        saveData(this.data);
    },
    components: {
        'mt-swipe':Swipe,
        'mt-swipe-item':SwipeItem
    },
}
</script>

<style lang="less">
@import "~@/style/base.less";
.hotel-detail {
    .v-content {
        background-color: #f4f4f4;
    }
    .topSwiper {
        width: 100%;
        height: 10rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .main {
        width: 17.75rem;
        margin: 0 auto;
        position: relative;
        border-radius: 5px;
        top: -0.5rem;
        background-color: #fff;
    }
    .hotelInfo {
        padding: 0.5rem 0.75rem 0.75rem 0.75rem;
        height: 7rem;
        border-bottom: 1px solid #E4E5E7;
        &>p {
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
        }
        .hotelName {
            color: #25272D;
            font-size: 1rem;
            padding-left: 1.375rem;
            line-height: 1.8rem;
            background: url('~@/assets/icons/hotel_name.png') no-repeat left center/0.8rem;
        }
        .starBox {
            padding-left: 1.25rem;
            span {
                width: 0.65rem;
                height: 0.65rem;
                margin-right: 0.1rem;
                display: inline-block;
                background: url('~@/assets/icons/star.png') no-repeat center/cover;
            }
        }
        .hotelPosition {
            color: #454854;
            padding-left: 1.375rem;
            font-size: 0.75rem;
            line-height: 1.3rem;
            background: url('~@/assets/icons/position.png') no-repeat left center/0.8rem;
        }
        .hotelNumber {
            color: #454854;
            padding-left: 1.375rem;
            font-size: 0.75rem;
            line-height: 1.3rem;
            background: url('~@/assets/icons/phone.png') no-repeat left center/0.7rem;
        }
    }
    .roomInfo {
        padding: 0.65rem 0.8rem;
        .title {
            font-size: 1rem;
            width: 5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            background: url('~@/assets/img/button.png') no-repeat center/15rem 1.5rem;
            text-align: center;
            color: #fff;
            margin-bottom: 0.4rem;
        }
        .priceItem {
            height: 3rem;
            padding: 0.4rem 0 0.4rem 0.2rem;
            border-bottom: 1px solid #E4E5E7;
            position: relative;
            &>p:nth-of-type(1) {
                color: #25272D;
                font-size: 0.8rem;
            }
            &>p:nth-of-type(2) {
                color: #A5B0C3;
                font-size: 0.7rem;
            }
            .checkBtn {
                position: absolute;
                width: 3.5rem;
                height: 1.5rem;
                text-align: center;
                line-height: 1.5rem;
                background-color: #FFE365;
                border-radius: 2px;
                color: #1C1C1E;
                font-size: 0.75rem;
                top: 0.75rem;
                right: 0;
            }
            .price {
                position: absolute;
                top: 1rem;
                right: 4.1rem;
                color: #A5B0C3;
                &>span {
                    color: #FE4967;
                }
            }
            &:last-of-type {
                border: none;
            }
        }
    }
    
}



</style>

