<template>
    <v-page :foot="true" class="hotel-history">
        <v-content>
            <div class="main">
                <div class="ordersItem">
                    <div class="hotelInfo">
                        <div class="blueTitle">广州柏悦酒店</div>
                        <p class="timeBox">
                            <span>入住：</span><span>3月25日</span>
                            <span>离店：</span><span>3月28日</span>
                        </p>
                        <div class="room">
                            <p>豪华大床房</p>
                            <p><span>大床|含早|无烟</span> <span>2间 × 3晚</span></p>
                        </div>
                        <div class="price">
                            <p><span>总金额</span><span style="color:#FE4967;font-size:0.9rem;"><span style="margin-right:-0.05rem;font-size:0.6rem"><span style="color:#A5B0C3;">参考价</span>￥</span>5928</span></p>
                        </div>
                    </div>
                    <div class="resultBox">
                        <div class="resultText">
                            <span style="color:#25272D">商家反馈：</span>冯晓晓预定的2019年3月25日豪华大床房，2间3晚，房源不足。当天仅剩1间豪华套房。请修改订单重新预定。
                        </div>
                    </div>
                    <div class="buttonBox">
                        <div class="radiusBtn">取消预定</div>
                        <div class="radiusBtn">删除订单</div>
                    </div>
                </div>
            </div>
            
                
        </v-content>
        
        <v-footer>
            <Rf-Footer-Tab :fetching="fetching"  :active="1"></Rf-Footer-Tab>
        </v-footer>
    </v-page>
</template>

<script>
import {} from '@/api/index.js'
import RfFooterTab from '@/components/Footer.vue';
export default {
    name:"historyList",
    data(){
        return {
            fetching:false
        }
    },
    mounted(){
        const {query}=this.$route;
        
    },
    components: {
        RfFooterTab,
    },
}
</script>

<style lang="less">
@import "~@/style/base.less";
.hotel-history {
    .main {
        margin: 0.75rem 0.5rem;
    }
    .ordersItem {
        border-radius: 6px;
        overflow: hidden;
        background-color: #fff;
        .hotelInfo {
            border-radius: 5px;
            background-color: #fff;
            border-radius: 6px;
            overflow: hidden;
            .blueTitle {
                background:linear-gradient(70deg,rgba(63,142,253,1) 0%,rgba(89,158,255,1) 100%);
                color: #fff;
                font-size: 0.75rem;
                font-weight: 500;
                height: 2.15rem;
                line-height: 2.15rem;
                padding-left: 0.9rem;
            }
            .timeBox {
                padding: 0.8rem 0.9rem 0.1rem;
                font-size: 0.75rem;
                &>span:nth-of-type(2n){
                    color: #333;
                    margin-right: 1rem;
                }
                &>span:nth-of-type(2n+1){
                    color: #A5B0C3;

                }
            }
            .room {
                padding: 0.5rem 0.9rem 0.9rem;
                border-bottom: 1px solid #E4E5E7;
                &>p:first-child {
                    color: #333;
                    font-size: 0.8rem;
                    line-height: 1.5rem;
                }
                &>p:last-of-type {
                    color: #A5B0C3;
                    font-size: 0.7rem;
                    // line-height: 1rem;
                    display: flex;
                    justify-content: space-between;
                    &>span:last-of-type {
                        color: #547AFD
                    }
                }
            }
            .price {
                padding: 0.5rem 0.9rem;
                font-size: 0.8rem;
                color: #333;
                border-bottom: 1px solid #E4E5E7;
                
                &>p {
                    line-height: 1.2rem;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .resultBox {
            width: 16rem;
            margin: 0.5rem auto;
            .resultText {
                background-color: #F6F7FA;
                color: #595D6D;
                padding: 0.4rem 0.35rem;
                line-height: 1.1rem;
                font-size: 0.7rem;
            }
        }
        .buttonBox {
            height: 3.6rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 0.4rem;
            .radiusBtn {
                width: 4rem;
                height: 1.5rem;
                margin-right: 0.5rem;
                text-align: center;
                line-height: 1.5rem;
                background-color: #F4F4F4;
                border-radius: 1.5rem;
                color: #53558B;
                font-size: 0.65rem;
                // float: right;
            }
        }
    }
    .blueTitle {
        background:linear-gradient(70deg,rgba(63,142,253,1) 0%,rgba(89,158,255,1) 100%);
        color: #fff;
        font-size: 0.75rem;
        font-weight: 500;
        height: 2.15rem;
        line-height: 2.15rem;
        padding-left: 0.9rem;
    }
}

</style>

