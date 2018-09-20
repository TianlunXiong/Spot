<template>
    <div class="bg-bottom">
        <canvas ref="canvas" :width="availableWidth" :height="availableHeight" ></canvas>
    </div>
</template>

<script>
export default {
    data(){
        return{
            availableWidth: document.documentElement.clientWidth,
            availableHeight: document.documentElement.clientHeight,
        }
    },
    mounted(){
        const ctx = this.$refs.canvas.getContext('2d');
        let angle = 0;
        let startTime = Date.now();
        const draw = () => {
            ctx.clearRect(0,0,this.availableWidth,this.availableHeight);
            ctx.strokeStyle = this.$store.state.canvas.config.color;
            ctx.lineWidth = 0.5*(this.$store.state.canvas.config.maxWidth+
            this.$store.state.canvas.config.maxWidth + 
            Math.sin((Date.now()-startTime)*Math.PI*this.$store.state.canvas.config.frequency/500)*
            (this.$store.state.canvas.config.minWidth-this.$store.state.canvas.config.maxWidth));
            ctx.save();
            ctx.translate(Math.floor(this.$store.state.canvas.config.x*this.availableWidth),Math.floor(this.$store.state.canvas.config.y*this.availableHeight))
            ctx.rotate(Math.PI*angle/180);
            angle += this.$store.state.canvas.config.velocity;
            if(angle>360) angle = 0;
            drawSpirograph(ctx, 
            this.$store.state.canvas.config.R1,
            this.$store.state.canvas.config.R2, 
            this.$store.state.canvas.config.radius,
            this.$store.state.canvas.config.threshold);
            ctx.restore();

            requestAnimationFrame(draw)
        }
        function drawSpirograph(ctx,R,r,O,t){
            var x1 = R-O;
            var y1 = 0;
            var i  = 1;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            do {
                if (i > t) break;
                var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72));
                var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72));
                ctx.lineTo(x2,y2);
                x1 = x2;
                y1 = y2;
                i++;
            } while (x2 != R-O && y2 != 0 );
            ctx.stroke();

        }
        const init = () => {
            requestAnimationFrame(draw);
        }
        init();
    }
}
</script>

<style>
    .bg-bottom{
        position: fixed;
        left: 0;
        right:0;
        top: 0;
        bottom: 0;
        z-index: -999;
    }
</style>
