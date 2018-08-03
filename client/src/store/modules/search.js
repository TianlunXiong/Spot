import util from "../../util";
import config from "../../config";

const URL = config.URL;

export default {
    namespaced: true,

    state: {
        hotTopic: {
            zhihu: []
        },
        searchBuffer: {
            zhihu: []
        }
    },
    getters: {
        searchBufferDone (state) {
            return state.searchBuffer.zhihu.filter(elem => elem.type === "search_result");
        }
    },
    actions: {
        getHotNews (context) {
            return util.getData(URL + "/api/hotnews").then(json => {
                context.commit("HOT_TOPIC_ASSIGN", {
                    "zhihu": json.top_search.words
                });
            });
        },
        searchNews (context, params) {
            return util.getData(URL + `/api/search?keyWords=${params.keyWords}&type=${params.type}&offset=${params.offset}&limit=${params.limit}`).then(json => {
                context.commit("SEARCH_BUFFER_ASSIGN", {
                    "zhihu": json.data
                });
            });
        },
        addSearch (context, params) {
            return util.getData(URL + `/api/search?keyWords=${params.keyWords}&type=${params.type}&offset=${params.offset}&limit=${params.limit}`).then(json => {
                if (json.data.length !== 0) {
                    context.commit("SEARCH_BUFFER_ADD", {
                        name: params.name,
                        data: json.data
                    });
                } else {
                    return 0;
                }
            });
        },
        getAnswer (context, params) {
            return util.getData(URL + `/api/answer?questionId=${params.questionId}&offset=${params.offset}&limit=${params.limit}&sort_by=${params.sortBy}`).then(json => {
                return json;
            });
        }
    },
    mutations: {
        HOT_TOPIC_ASSIGN (state, hotTopic) {
            state.hotTopic = hotTopic;
        },
        SEARCH_BUFFER_ASSIGN (state, result) {
            state.searchBuffer = result;
        },
        SEARCH_BUFFER_ADD (state, load) {
            state.searchBuffer.zhihu.push(...load.data);
        }
    }
};
