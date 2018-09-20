<template>
        <el-dialog
                title="核能发呆器设置"
                :visible.sync="$store.state.canvasOptionVisible"
                :width="responseWidth"
                >
                <el-alert
                    v-if="showWarning"
                    title="耗电量巨大, 使用电池的情况下慎用"
                    type="warning"
                    :closable="false">
                </el-alert>
                <br>
                <div  style="margin: 10px 0;position:relative">
                    <span>开关</span>
                    <el-switch
                        :value="$store.state.canvas.visible"
                        @change="toggleCanvas"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                    <el-color-picker style="position:absolute;right:0;top:50%;transform:translate(0,-50%);" v-model="color" @change="setColor" show-alpha></el-color-picker>
                </div>
                <div style="margin: 10px 0">
                    <span>线宽</span>
                    <el-slider range @change="setLineWidth" v-model="lineWidth" :min="0" :max="50"></el-slider>
                </div>
                <div>
                    <span>位置</span>
                    <el-slider @change="setX" v-model="x" :min="0" :max="100"  :format-tooltip="formatTooltip" ></el-slider>
                    <el-slider @change="setY" v-model="y" :min="0" :max="100"  :format-tooltip="formatTooltip" ></el-slider>
                </div>

                <div class="d1">
                    <span>振荡内径</span>
                    <el-input-number @change="setR1" v-model="R1" ></el-input-number>
                </div>

                <div class="d1">
                    <span>振荡外径</span>
                    <el-input-number @change="setR2" v-model="R2" ></el-input-number>
                </div>
                <div class="d1">
                    <span>半径</span>
                    <el-input-number v-model="radius"  @change="setRadius" :max="2000" :min="-2000"></el-input-number>
                </div>
                <div class="d1">
                    <span>绘制限</span>
                    <el-input-number v-model="threshold"  @change="setThreshold" :max="10000" :min="0"></el-input-number>
                </div>
                <span>速度</span>
                <el-slider @change="setVelocity" v-model="velocity" :min="0" :max="300" :format-tooltip="formatTooltip" show-input ></el-slider>
                <br>
                <span>频率</span>
                <el-slider @change="setFrequency" v-model="frequency" :min="0" :max="100" :format-tooltip="formatTooltip" show-input></el-slider>
            </el-dialog>
</template>

<script>
export default {
    data(){
        return {
            lineWidth : [this.$store.state.canvas.config.minWidth,this.$store.state.canvas.config.maxWidth],
            color: "rgba(13, 205, 99, 0.8)",
            R1: this.$store.state.canvas.config.R1,
            R2: this.$store.state.canvas.config.R2,
            x: this.$store.state.canvas.config.x,
            y: this.$store.state.canvas.config.y,
            velocity: this.$store.state.canvas.config.velocity,
            frequency: this.$store.state.canvas.config.frequency,
            radius: this.$store.state.canvas.config.radius,
            threshold: this.$store.state.canvas.config.threshold,
            responseWidth : (window.innerWidth < 900)? "98%": "50%",
            showWarning: (window.innerWidth < 900)? true : false
        }
    },
    mounted(){
        window.addEventListener("resize", e => {
            this.responseWidth = (window.innerWidth < 900)? "98%": "50%"
        })
    },
    methods: {
        setLineWidth (value) {
            this.$store.dispatch("canvas/setLineWidth",value)
        },
        setR1 (value) {
            this.$store.dispatch("canvas/setR1",value)
        },
        setR2 (value) {
            this.$store.dispatch("canvas/setR2",value)
        },
        setX (value) {
            this.$store.dispatch("canvas/setX",this.formatTooltip(value))
        },
        setY (value) {
            this.$store.dispatch("canvas/setY",this.formatTooltip(value))
        },
        formatTooltip (value) {
            return value/100;
        },
        setRadius (value) {
            this.$store.dispatch("canvas/setRadius",value)
        },
        setThreshold (value) {
            this.$store.dispatch("canvas/setThreshold", value)
        },
        toggleCanvas (value) {
            this.$store.dispatch("canvas/setCanvasVisible",value)
        },
        setVelocity (value) {
            this.$store.dispatch("canvas/setVelocity", this.formatTooltip(value))
        },
        setFrequency (value) {
            this.$store.dispatch("canvas/setFrequency", this.formatTooltip(value))
        },
        setColor (value) {
            this.$store.dispatch("canvas/setColor", value)
        }
        
    }
}
</script>

<style >
    .d1{
        position: relative;
        margin: 10px 0;
    }

    .d1 .el-input-number{
        position: absolute;
        left: 100px;
    }
    .d1 > span{
        line-height: 40px;
    }

    roll {
        background-color: red;
    }
</style>
