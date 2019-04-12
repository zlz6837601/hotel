<template>
    <v-page class="hotel-booking">
        <v-content>
            <div class="hotelInfo">
                <div class="blueTitle">{{data.hotelName}}</div>
                <p class="timeBox">
                    <span>入住：</span><span>3月25日</span>
                    <span>离店：</span><span>3月28日</span>
                </p>
                <div class="room">
                    <p>豪华大床房</p>
                    <p><span>大床|含早|无烟</span> <span>{{data.hotelCount}}间 × {{data.nightCount}}晚</span></p>
                </div>
                <div class="price">
                    <!-- <p><span>增值税</span><span style="color:#FE4967;font-size:0.9rem;"><span style="font-size:0.6rem;margin-right:-0.05rem">￥</span>0</span></p> -->
                    <p><span>总金额</span><span style="color:#FE4967;font-size:0.9rem;"><span style="margin-right:-0.05rem;font-size:0.6rem"><span style="color:#A5B0C3;">参考价</span>￥</span>5928</span></p>
                </div>
                
            </div>
            <div class="personInfo">
                <div class="blueTitle">宾客信息</div>
                
                <div class="infoBox">
                    <div class="personCell"><span class="cellTitle">预订人</span><span class="cellText">{{bookingUser}}</span></div>
                    
                    <div class="personCell">
                        <span class="cellTitle">房间数</span>
                        <div class="cellText" style="margin-left:-0.3rem;">
                            <span class="sub" @click="subCounts('room')"></span>
                            <span style="width:2rem;text-align:center;">{{data.hotelCount}}间</span>
                            <span class="add" @click="addCounts('room')"></span>
                        </div>
                    </div>
                    
                    <div class="personCell userItem firstUser"><span class="cellTitle"></span><span class="cellText">{{bookingUser}}</span><span class="userIcon" @click="openUserList()"></span></div>

                    <!-- <div class="mint-cell-wrapper personCell userItem" v-for="(item,index) in postPersonList" :key="index">
                        <div class="mint-cell-title cellTitle"><span class="mint-cell-text"></span></div> 
                        <div class="mint-cell-value cellText">
                            <input placeholder="1间填1人姓名（不可重复）" type="text" class="mint-field-core" :value="item.name" > 
                        </div> 
                    </div> -->
                    <div class="personCell userItem" v-for="(item,index) in postPersonList" :key="index">
                        <div class="cellTitle"></div><div class="cellText"><input type="text" v-model="item.name" placeholder="1间填1人姓名（不可重复）"></div>
                    </div>
                    <!-- <div class="mint-cell-wrapper personCell" style="border-bottom:none;">
                        <div class="mint-cell-title cellTitle"><span class="mint-cell-text">手机</span></div> 
                        <div class="mint-cell-value cellText">
                            <input placeholder="请输入联系方式" type="number" class="mint-field-core" :value="userPhont" > 
                        </div> 
                    </div> -->
                    <div class="personCell" style="border-bottom:none;">
                        <div class="cellTitle">手机</div>
                        <div  class="cellText"><input type="text" placeholder="请输入联系方式" :value="userPhont"></div>
                    </div>

                </div>
            </div>
            <div class="hotelTips">
                <p>入住及退房政策</p>
                <p>到店当日下午14：00以后入住 <br>离店当日中午12：00以前退房</p>
                <p>取消政策</p>
                <p>无担保的预订客房，酒店将会保留房间到入住当日下午18：00时。</p>
            </div>
            <div class="handleBtn" @click="postBooking()">提交订单</div>
        </v-content>
        <div class="checkPersonPage" v-if="showUserList">
            <p class="listTitle">新增常用住客姓名</p>
            <div class="personInput">
                <input placeholder="中文姓名\英文姓名" :value="addName" type="text"><v-button>确认</v-button>
                <br>
                <radio name="account" value=false v-model="radioValue" checked>
                    非员工
                </radio>
                <radio name="account" value=true v-model="radioValue">
                    员工
                </radio>
            </div>
            
            <p class="listTitle">选择住客姓名</p>
            <div class="isCheckList">
                <div class="mint-cell" v-for="(item,index) in hasCheckValue" :key="index">
                    <checkbox :value=index v-model="isChecked">{{item.name}}</checkbox>
                </div>
            </div>
            
            <mt-cell-swipe
            title=""
            :right="[
                {
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: () => {console.log('delete')}
                }
            ]" v-for="(item,index) in personList" :key="item.id">
                <checkbox :value=index v-model="newChecked">{{item.name}}</checkbox>
            </mt-cell-swipe>
            <div>
                <ButtonBox :cancelFunction="cancleClick" :confirmFunction="confirmClick"></ButtonBox>
            </div>
        </div>
        
    </v-page>
</template>

<script>
import {} from '@/api/index.js'
import {saveData, getData,deleteData} from '@/utils/tools.js';
import { Toast } from 'mint-ui';
import ButtonBox from '@/components/buttonBox.vue';
import { Checkbox, Radio } from 'vue-checkbox-radio';
import { CellSwipe } from 'mint-ui';
export default {
    name:"bookingInfo",
    data(){
        return {
            data:{},
            userPhont:123456,
            personList:[
                {name:"张三",isAccount:true,id:1213},
                {name:"李四",isAccount:false,id:3121},
                {name:"王五",isAccount:false,id:2123},
                {name:"赵六",isAccount:false,id:4123},
            
            ],
            addName:"",
            isChecked:[],
            newChecked:[],
            checkboxValue:[
                {name:"张三",isAccount:true,id:1213},
                {name:"李四",isAccount:false,id:3121},
            ],
            hasCheckValue:[],
            postPersonList:[],
            bookingUser:"冯小",
            radioValue:false,
            new:[],
            showUserList:false,
            
        }
    },
    watch:{
        hotelCountChange(val1,val2){
            let oldVal=parseInt(val2);
            let newVal=parseInt(val1);
            if(!val2){
                for(let i=0;i<val1-1;i++){
                    let personOBJ={name:"",isAccount:false};
                    this.postPersonList.push(personOBJ);
                }
            }else if(val1>val2){
                let personOBJ={name:"",isAccount:false};
                this.postPersonList.push(personOBJ);
                
            }else{
                this.postPersonList.pop();
            }
        }
    },
    computed: {
        hotelCountChange(){
            return this.data.hotelCount;
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
        openUserList(){
            this.hasCheckValue=[];
            this.showUserList=true;
            this.newChecked=[];
            for(let i in this.postPersonList){
                if(this.postPersonList[i].name.trim()){
                    this.hasCheckValue.push(this.postPersonList[i])
                    // this.isChecked.push(parseInt(i))
                }
            }
            for(let j in this.hasCheckValue){
                this.isChecked.push(parseInt(j));
            }
        },
        cancleClick(){
            this.isChecked=[];
            this.newChecked=[];
            this.showUserList=false;
        },
        confirmClick(){
            this.new=[];
            for(let i in this.isChecked){
                let num=this.isChecked[i];
                let oldInfo=this.hasCheckValue[num];
                this.new.push(oldInfo)
            }
            for(let j in this.newChecked){
                let value=this.newChecked[j];
                let addOBJ={};
                addOBJ.name=this.personList[value].name;
                addOBJ.isAccount=this.personList[value].isAccount;
                this.new.push(addOBJ)
            }
            if(this.new.length>this.postPersonList.length){
                Toast({
                    message: '选择人数超过房间数',
                    position: 'middle',
                    duration: 3000
                    });
            }else{
                for(let k in this.postPersonList){
                    if(this.new[k]){
                        console.log(this.new[k])
                        this.postPersonList[k]=JSON.parse(JSON.stringify(this.new[k]));
                    }else{
                        this.postPersonList[k]={name:"",isAccount:false};
                    }
                }
                this.isChecked=[];
                this.showUserList=false;
            }
            console.log(this.postPersonList)
        },
        postBooking(){
            Toast({
                message: '预定成功',
                iconClass: 'iconfont icon-success',
                position: 'middle',
                duration: 3000
            });
            setTimeout(() => {
                deleteData();
                this.data={};
                this.$router.push({name:"home",params:{}})
            }, 3000);
        }
    },
    mounted(){
        const data=this.$route.params;
        if(!data.hotelCount){
            this.data=getData();
        }else{
            this.data={...data};
        }
    },
    beforeDestroy(){
        saveData(this.data);
    },
    components: {
        ButtonBox,
        'checkbox':Checkbox,
        'radio':Radio,
        'mt-cell-swipe':CellSwipe,
        // 'mt-field':Field,

    },
}
</script>

<style lang="less">
.icon-success {
    margin: -10px 0;
    font-size: 45px;
}
@import "~@/style/base.less";
.hotel-booking {
    input {
        -webkit-appearance: none;
        -webkit-box-flex: 1;
        outline: 0;
        flex: 1;
    }
    .v-content {
        background-color: #f4f4f4;
        padding-bottom: 0;
    }
    .checkPersonPage {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        background-color: #F4F4F4;
        padding: 0.75rem 0.55rem;
        padding-bottom: 3.25rem;
        overflow: auto;
        .listTitle {
            color: #25272D;
            font-size: 0.8rem;
            padding: 0.5rem 0;
            font-weight: 500;
            padding-left: 1.2rem;
            &:first-of-type {
                background: url('~@/assets/icons/addPerson.png') no-repeat left center/0.85rem;
            }
            &:last-of-type {
                margin-top: 1rem;
                background: url('~@/assets/icons/checkPerson.png') no-repeat left center/0.85rem;
            }
        }
        .personInput {
            width: 100%;
            height: 4.5rem;
            position: relative;
            padding: 0 0.9rem;
            // display: flex;
            // align-items: center;
            justify-content: space-between;
            background-color: #fff;
            .radio-component {
                display: inline-block;
                width: 5rem;
                color: #A5B0C3;
                padding-top: 0.5rem;
                label {
                    
                    display: flex;
                    align-items: center;
                    span {
                        margin-right: 0.2rem;
                        border-color: #A7B2C4;
                    }
                    .input-box-circle {
                        background-color: #4179DF;
                    }
                }
                input:checked {
                    &+label {
                        span {
                            border-color: #4179DF !important;
                        }
                    }
                        
                }
            }
            input {
                width: 9.375rem;
                padding-left: 0.3rem;
                font-size: 0.7rem;
                line-height: 2.25rem;
                border-bottom: 1px solid #E4E5E7;
            }
            button {
                width: 3rem;
                position: absolute;
                background-color: #4179DF;
                right: 1rem;
                top: 1.5rem;
                margin-right: 0.5rem
            }
        }
        .isCheckList {
            margin-bottom: 1rem;
            .mint-cell {
                display: flex;
                align-items: center;
                padding: 0 10px;
            }
        }
        .mint-cell {
            border-bottom: 1px solid #E4E5E7;
        }
        .mint-cell-title {
            flex: none;
        }
        .mint-cell-value {
            width: 100%;
        }
        .checkbox-component {
            width: 100%;
            height: 2rem;
            label {
                display: inline-block;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                color: #25272D !important;
                font-size: 0.7rem;
                span.input-box {
                    margin-right: 0.5rem
                }
            }
        }
        input:focus + label > .input-box {
            box-shadow: none!important;
        }

    }
    
    .hotelInfo {
        border-radius: 5px;
        background-color: #fff;
        margin: 0.75rem 0.5rem;
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
            padding: 0.5rem 0.9rem 0.1rem;
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
            padding: 0.5rem 0.9rem;
            border-bottom: 1px solid #E4E5E7;
            &>p:first-child {
                color: #333;
                font-size: 0.8rem;
                line-height: 1.2rem;
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
            &>p {
                line-height: 1.2rem;
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .personInfo {
        .hotelInfo;
        .infoBox {
            padding: 0.2rem 0.9rem;
            position: relative;
            .userTitle {
                position: absolute;
                color: #A5B0C3;
                left: 1rem;
                top: 4.8rem;
            }
            .personCell {
                border-bottom: 1px solid #E4E5E7;
                line-height: 2.25rem;
                font-size: 0.75rem;
                overflow: hidden;
                position: relative;
                display: flex;
                align-items: center;
                padding: 0;
                background-image: none;
                .cellTitle {
                    width: 3.7rem;
                    height: 2.25rem;
                    color: #A5B0C3;
                    // float: left;
                    flex: none;
                }
                .cellText {
                    color: #25272D;
                    display: flex;
                    align-items: center;
                    width: 12rem;
                    height: 2.25rem;
                    // float: left;
                    flex: 1;
                    input {
                        font-size: 0.75rem;
                        line-height: 1.6;
                    }
                }
                .sub {
                    display: inline-block;
                    width: 1.5rem;
                    height: 1.5rem;
                    background: url('~@/assets/icons/sub.png') no-repeat center/0.85rem 0.85rem;
                }
                .add {
                    display: inline-block;
                    width: 1.5rem;
                    height: 1.5rem;
                    background: url('~@/assets/icons/add.png') no-repeat center/0.85rem 0.85rem;
                }
                &.userItem {
                    border-bottom: none;
                    .cellText {
                        border-bottom: 1px solid #E4E5E7;
                    }
                }
                
            }
            .firstUser:before {
                content: "入住人";
                position: absolute;
                left: 0rem;
                top: 0rem;
                color: #A5B0C3;
                font-size: 0.75rem;
            }

        }
        .userIcon {
            position: absolute;
            width: 2rem;
            height: 2rem;
            top: 0rem;
            right: 0rem;
            background: url('~@/assets/icons/personList.png') no-repeat center/1.25rem
        }
    }
    .hotelTips {
        .hotelInfo;
        padding: 0.6rem 0.9rem;
        line-height: 1.2rem;
        &>P:nth-of-type(2n+1){
            color: #25272D;
            font-size: 0.8rem;
            font-weight: 500;
        }
        &>p:nth-of-type(2n){
            color: #595D6D;
            font-size: 0.75rem
        }
    }
    .handleBtn {
        width: 13.3rem;
        height: 2.15rem;
        margin: 2rem auto;
        // margin-top: 2rem;
        background: url("~@/assets/img/button.png") no-repeat center/cover;
        text-align: center;
        line-height: 2.15rem;
        font-size: 0.9rem;
        color: #fff;
    }


    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #A5B0C3;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #A5B0C3;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #A5B0C3;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:    #A5B0C3;
    }


}


</style>

