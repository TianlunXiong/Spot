export default {
    namespaced: true,
    state: {
        visible: true,
        config:{
            maxWidth: 2,
            minWidth: 0,
            x:0,
            y:0,
            R1: 162,
            R2: -405,
            radius: window.innerWidth,
            velocity: 1,
            frequency: 0.5, //默认 2s 为周期
            color: "gold"
        }
    },
    actions: {
        setLineWidth (context, width) {
            context.commit("SET_LINE_WIDTH", {
                maxWidth: width[1],
                minWidth: width[0]
            });
        },
        setR1 (context, R1) {
            context.commit("SET_R1", R1);
        },
        setR2 (context, R2) {
            context.commit("SET_R2", R2);
        },
        setX (context, x) {
            context.commit("SET_X", x);
        },
        setY (context, y) {
            context.commit("SET_Y", y);
        },
        setRadius (context, radius) {
            context.commit("SET_RADIUS", radius);
        },
        setCanvasVisible (context, value) {
            context.commit("SET_CANVAS_VISIBLE", value);
        },
        setVelocity (context, value) {
            context.commit("SET_VELOCITY", value);
        },
        setFrequency (context, value) {
            context.commit("SET_FREQUENCY", value);
        },
        setColor (context, value) {
            context.commit("SET_COLOR", value);
        }
    },
    mutations: {
        SET_LINE_WIDTH (state, width) {
            state.config.maxWidth = width.maxWidth;
            state.config.minWidth = width.minWidth;
        },
        SET_R1 (state, R1) {
            state.config.R1 = R1;
        },
        SET_R2 (state, R2) {
            state.config.R2 = R2;
        },
        SET_X (state, x) {
            state.config.x = x;
        },
        SET_Y (state, y) {
            state.config.y = y;
        },
        SET_RADIUS (state, radius) {
            state.config.radius = radius;
        },
        SET_CANVAS_VISIBLE (state, visible) {
            state.visible = visible;
        },
        SET_VELOCITY (state, value) {
            state.config.velocity = value;
        },
        SET_FREQUENCY (state, value) {
            state.config.frequency = value;
        },
        SET_COLOR (state, value) {
            state.config.color = value;
        }
    }
};