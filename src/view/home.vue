<template>
    <v-page :footer="!showCalendar&&!showCitySelect" class="hotel-home">
        <v-content>
            <div class="topBanner"></div>
            <div class="toolBox">
                <div class="cellItem">
                    <div class="cityMsg">
                        <i class="rf_icon"></i>
                        <span class="itemName">目的地</span>
                        <span class="checkMsg" @click="showCitySelect=true;">{{data.city}}</span>
                    </div>
                    <div class="locationBtn">
                        <div>
                            <i class="rf_icon"></i>
                            <span>当前位置</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="cellItem hotel">
                    <i class="rf_icon"></i>
                    <span class="itemName">酒店</span>
                    <span class="checkMsg">{{data.hotelName}}</span>
                </div> -->
                <div class="cellItem time">
                    <i class="rf_icon"></i>
                    <span class="itemName">时间</span>
                    <div class="checkMsg" @click="checkTime()">
                        <span>{{data.startTime}}</span>
                        <span style="color:#DDDBDB"> — </span>
                        <span>{{data.endTime}}</span>
                    </div>
                    <i class="rf_icon"></i>
                </div>
                <div class="roomItem person">
                    <i class="rf_icon"></i>
                    <span class="itemName">成人</span>
                    <div>
                        <span class="sub" @click="subCounts('person')"></span>
                        <span>{{data.personCount}}人</span>
                        <span class="add" @click="addCounts('person')"></span>
                    </div>
                </div>
                <div class="roomItem room">
                    <i class="rf_icon"></i>
                    <span class="itemName">客房</span>
                    <div>
                        <span class="sub" @click="subCounts('room')"></span>
                        <span>{{data.hotelCount}}间</span>
                        <span class="add" @click="addCounts('room')"></span>
                    </div>
                </div>
            </div>

            <div class="postBtn" @click="handleNext()">
                立即预定
            </div>
            <transition name="calendarSlide">
            <div class="calendarBox" v-if="showCalendar">
                        <div class="calendarMask" @click="cancleClick()"></div>
                        <Calendar
                        :months="months"
                        :range="range"
                        :begin="begin"
                        :end="end"
                        :completion="completion"
                        :value="value"
                        :lunar="lunar"
                        ref="calendar"
                        />
                        <ButtonBox :cancelText="cancelText" :confirmText="confirmText" :cancelFunction="cancleClick" :confirmFunction="confirmClick"></ButtonBox>
                        
                    </div>
    
            </transition>
            
            <transition name="citySlide">
                <div class="cityPage" v-if="showCitySelect">
                    <mt-index-list :show-indicator="false">
                        <mt-index-section index="">
                            <p class="cityItem" v-for="(item,index) in cityList" :key="index" @click="checkCity(item)">{{item}}</p>
                            <!-- <mt-cell :title="item"></mt-cell> -->
                        </mt-index-section>
                    </mt-index-list>
                </div>
            </transition>
            

            
        </v-content>
        
        <v-footer v-show="!showCalendar&&!showCitySelect">
        <Rf-Footer-Tab :fetching="fetching" :active="0"></Rf-Footer-Tab>
        </v-footer>
    </v-page>
</template>

<script>
import {} from '@/api/index.js'
import {saveData, getData} from '@/utils/tools.js';
import RfFooterTab from '@/components/Footer.vue';
import { Toast,IndexList, IndexSection,Cell  } from 'mint-ui';
import ButtonBox from '@/components/buttonBox.vue';
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/browser-style.css'
export default {
    name:"hotelList",
    data(){
        return {
            fetching:false,
            data:{
                city:"广州",
                startTime:"",
                endTime:"",
                personCount:1,
                hotelCount:1,
                nightCount:1,
            },
            showCalendar:false,
            showCitySelect:false,
            lunar:true,
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            range:true,
            value:[],
            postValue:[],
            begin:[],
            end:[],
            completion:false,
            almanacs: {},
            cancelText:"取消",
            confirmText:"确认",
            cityList:[
                '广州',
                '北京',
                '天津',
                '厦门',
                '成都',
                '武汉',
                '西安',
                '长沙',
                '佛山',
                '东莞',
                '珠海',
                '惠州',
                '广州',
                '北京',
                '天津',
                '厦门',
                '成都',
                '武汉',
                '西安',
                '长沙',
                '佛山',
                '东莞',
                '珠海',
                '惠州',
            ],
        }
    },
    watch:{
        postValue(val){
            // console.log(val)
            this.data.startTime=`${val[0][0]}-${val[0][1]}-${val[0][2]}`;
            this.data.endTime=`${val[1][0]}-${val[1][1]}-${val[1][2]}`;
        }
    },
    methods:{
        addCounts(query){
            if(query=="person"){
                this.data.personCount++;
            }else if(query=="room"){
                this.data.hotelCount++;
            }
        },
        subCounts(query){
            if(query=="person"){
                if(this.data.personCount==1) return;
                this.data.personCount--;
            }else if(query=="room"){
                if(this.data.hotelCount==1) return;
                this.data.hotelCount--;
            }
        },
        checkTime(){
            this.showCalendar=true;
        },
        setCalendar(){
            let nowTime=new Date();
            let nowYear = nowTime.getFullYear();
            let nowMonth = nowTime.getMonth()+1;
            let nowDay = nowTime.getDate();
            this.begin=[nowYear,nowMonth,nowDay];
            let endTime= new Date(nowYear+1,0,1).getTime()-1000*60*60*24;
            endTime=new Date(endTime);
            // console.log(endTime.getMonth())
            let endYear=endTime.getFullYear();
            let endMonth=endTime.getMonth()+1;
            let endDay=endTime.getDate();
            this.end=[endYear,endMonth,endDay]
            // console.log(this.end)
            let tomorrow=new Date(nowTime.getTime()+1000*60*60*24);
            let tomorrowYear=tomorrow.getFullYear();
            let tomorrowMonth=tomorrow.getMonth()+1;
            let tomorrowDay=tomorrow.getDate();
            this.value=[[nowYear,nowMonth,nowDay],[tomorrowYear,tomorrowMonth,tomorrowDay]];
            this.postValue=[[nowYear,nowMonth,nowDay],[tomorrowYear,tomorrowMonth,tomorrowDay]];
        },
        cancleClick(){
            this.showCalendar=false;
            this.value=JSON.parse(JSON.stringify(this.postValue));
        },
        confirmClick(){
            let selectArr=document.querySelectorAll(".selected");
            console.log(selectArr.length)
            if(selectArr.length<2){
                Toast({
                    message: '请选择结束时间',
                    position: 'middle',
                    duration: 3000
                    });
            }else{
                this.showCalendar=false;
                this.data.nightCount=selectArr.length-1;
                this.postValue=JSON.parse(JSON.stringify(this.value));
            }
        },
        handleNext(){
            this.$router.push({ name: 'hotelList', params: { ...this.data }});
        },
        checkCity(city){
            this.showCitySelect=false;
            this.data.city=city;
        }
    },
    mounted(){
        const data=getData();
        if(data&&data.hotelCount){
            this.data=data
        }
        this.setCalendar();
    },
    beforeDestroy(){
        saveData(this.data);
    },
    components: {
        RfFooterTab,
        Calendar,
        ButtonBox,
        'mt-index-list':IndexList,
        'mt-index-section':IndexSection,
        'mt-cell':Cell,
    },
}
</script>

<style lang="less">
@import "~@/style/base.less";
.calendarSlide-enter-active {
  transition: all .3s ease;
}
.calendarSlide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.calendarSlide-enter, .calendarSlide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(50px);
  opacity: 0;
}

.citySlide-enter-active {
  transition: all .3s ease;
}
.citySlide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.citySlide-enter, .citySlide-leave-to {
  transform: translateX(50px);
  opacity: 0;
}


.hotel-home {
    @media screen and (max-width: 420px){
.mpvue-calendar .lunarStyle span {
    line-height: 1.6!important;
}
}
.mpvue-calendar .lunarStyle .mc-text {
    bottom: 8px!important;
}
.selected {
    // background-color: transparent!important;
}
.mc-range-select-one.month-last-date.mc-range-begin .mc-range-bg{
    background-color: transparent;
}
.mc-range-begin.mc-range-second-to-last {
    background-color: transparent;
}
.mpvue-calendar .mc-range-mode .mc-range-select-one div.mc-range-bg {
    display: none;
} 
.mpvue-calendar td {
    width: 2.4rem;
    height: 2.4rem;
}
.mpvue-calendar .mc-range-mode .mc-range-begin span.calendar-date,.mpvue-calendar .mc-range-mode .mc-range-end span.calendar-date, {
    background-color: #589EFE !important;
    border-radius: 5px;
}
.mpvue-calendar .mc-range-mode .mc-range-row-last .calendar-date, .mpvue-calendar .mc-range-mode .mc-range-row-first .calendar-date {
    background-color: #DDEBFF;
}
.mpvue-calendar .mc-range-mode .mc-range-month-first.selected .calendar-date, .mpvue-calendar .mc-range-mode .mc-range-month-last.selected .calendar-date {
    background-color: #DDEBFF;
}
.mpvue-calendar .mc-range-mode .selected.mc-range-second-to-last span {
    background-color: #DDEBFF;
}

.mc-range-mode .selected .mc-range-bg {
    background-color: #DDEBFF;
}
.mc-range-mode .mc-range-month-last .mc-range-bg {
    background-color: transparent !important;
}
.mc-range-end:after {
    content: "\7ED3\675F";
}
.mc-range-begin:after {
    content: "\5F00\59CB";
}
.mc-range-begin:after, .mc-range-end:after {
    display: block;
    box-sizing: border-box;
    height: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    bottom: 8px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    z-index: 4;
    color: #fff;
}
.mc-range-begin .mc-text, .mc-range-end .mc-text {
    display: none!important;
}
    .v-content {
    background: #F4F4F4;
    .centerMsg {
        display: flex;
        flex: 1;
        align-items: center;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        box-align: center;
    }
    .rf_icon {
        width: 1rem;
        height: 1rem;
        display: inline-block;
    }
    .toolBox {
        padding: 0.5rem;
        .cellItem {
            width: 17.75rem;
            height: 2.5rem;
            margin: 0 auto;
            margin-bottom: 0.5rem;
            background: #fff;
            padding: 0 0.5rem;
            font-size: 0.75rem;
            line-height: 2.5rem;
            position: relative;
            .centerMsg;
            .itemName {
                color: #4179DF;
                padding-left: 0.35rem;
            }
            .checkMsg {
                width: 7.5rem;
                margin-left: 0.55rem;
                font-size: 0.9rem;
                color: #25272D
            }
            .cityMsg {
                .centerMsg;
                float: left;
                width: 12rem;
                height: 100%;
                position: relative;
                .rf_icon {
                    background: url('~@/assets/icons/home_position.png') no-repeat center/cover;
                }
                &:after {
                    content: "";
                    display: block;
                    width: 1px;
                    height: 1.4rem;
                    background-color: #A5B0C3;
                    position: absolute;
                    top: 0.55rem;
                    right: 0
                }
            }
            .locationBtn {
                float: left;
                width: 4.75rem;
                height: 100%; 
                font-size: 0.55rem;
                color:#A5B0C3;
                div {
                    width: 2.5rem;
                    height: 2.5rem;
                    margin: 0 auto;
                    display: flex;
                    flex-direction:column;
                    justify-content: center;
                    align-items: center;
                    .rf_icon {
                        background: url('~@/assets/icons/home_location.png') no-repeat center/cover;
                    }
                    span {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        margin-top: 0.2rem
                    }
                }
            }
            &.hotel {
                .rf_icon {
                        background: url('~@/assets/icons/home_hotel.png') no-repeat center/cover;
                    }
                .checkMsg {
                    display: inline-block;
                    height: 100%;
                    width: 12.5rem;
                }
            }
            &.time {
                .checkMsg {
                    width: 13rem;
                    font-size: 0.8rem;
                    color: #25272D;
                }
                .rf_icon:first-of-type {
                        background: url('~@/assets/icons/home_time.png') no-repeat center/cover;
                    }
                .rf_icon:last-of-type {
                    margin-left: -1rem;
                    pointer-events: none;
                    background: url('~@/assets/icons/home_calendar.png') no-repeat center/cover;
                }
            }
        }
        .roomItem {
            .cellItem;
            &:nth-of-type(3) {
                margin-bottom: 1px;
                margin-top: 1rem;
            }
            &.person {
                .rf_icon {
                    background: url('~@/assets/icons/home_person.png') no-repeat center/cover;
                }
            }
            &.room {
                .rf_icon {
                    background: url('~@/assets/icons/home_room.png') no-repeat center/cover;
                }
            }
            &>div {
                width: 5.5rem;
                position: absolute;
                right: 0;
                height: 100%;
                float: right;
                display: flex;
                align-items: center;
                &>span {
                    width: 2rem;
                    display: inline-block;
                    text-align: center;
                }
            }
            .sub {
                width: 1.5rem;
                height: 1.5rem;
                background: url('~@/assets/icons/sub.png') no-repeat center/0.85rem 0.85rem;
            }
            .add {
                width: 1.5rem;
                height: 1.5rem;
                background: url('~@/assets/icons/add.png') no-repeat center/0.85rem 0.85rem;
            }
        }
        
    }
}
.calendarBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    .calendarMask {
        width: 100%;
        height: 150%;
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        bottom: 0
    }
    .mpvue-calendar {
        position: absolute;
        bottom: 2.25rem;
    }
    
}
.cityPage {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    padding-left: 0.5rem;
    -webkit-overflow-scrolling: touch;
    .cityItem {
        background-color: #fff;
        box-sizing: border-box;
        color: inherit;
        height: 2.25rem;
        line-height: 2.25rem;
        padding-left: 5px;
        border-bottom: 1px solid #e5e6e7;
        display: block;
        overflow: hidden;
        position: relative;
        text-decoration: none;
    }
}
.topBanner {
    width: 100%;
    height: 7.5rem;
    background: url("~@/assets/img/homebanner.png") no-repeat center/cover;
}
.postBtn {
    width: 13.3rem;
    height: 2.15rem;
    margin: 0 auto;
    margin-top: 2rem;
    background: url("~@/assets/img/button.png") no-repeat center/cover;
    text-align: center;
    line-height: 2.15rem;
    font-size: 0.9rem;
    color: #fff;

}
}




</style>

