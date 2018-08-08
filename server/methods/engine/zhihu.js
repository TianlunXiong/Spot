const request = require('superagent');
const cheerio = require('cheerio');

let URL = '';
if (process.env.NODE_ENV === 'local') {
    URL = '';
}
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:8080'
}

const API = {
    ZHIHU: {
        SEARCH: "https://www.zhihu.com/api/v4/search_v3",
        QUESTION: "https://www.zhihu.com/api/v4/questions",
        TOP_TOPIC: "https://www.zhihu.com/api/v4/search/top_search",
        COMMENT: "https://www.zhihu.com/api/v4/answers",
        COMMENT_ARTICLE: "https://www.zhihu.com/api/v4/articles",
        INCLUDE: {
            ANSWER: "data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics",
            COMMENT: "data%5B*%5D.author%2Ccollapsed%2Creply_to_author%2Cdisliked%2Ccontent%2Cvoting%2Cvote_count%2Cis_parent_author%2Cis_author"
        }
    },

}

module.exports = {
    search,
    answer,
    comment,
    topTopic
}



async function search(params) {
    return await new Promise((resolve, reject) => {
        request.get(API.ZHIHU.SEARCH)
            .set('Accept', 'application/json')
            .query({ q: params.keyWords })
            .query({ t: params.type })
            .query({ offset: params.offset })
            .query({ limit: params.limit })
            .then(res => {
                imageFilter(res.body.data);
                resolve(res.body);
            }).catch(e => {
                reject(e);
            })
    })
}

async function answer(params) {
    return await new Promise((resolve, reject) => {
        request.get(`${API.ZHIHU.QUESTION}/${params.questionId}/answers?include=${API.ZHIHU.INCLUDE.ANSWER}`)
            .set('Accept', 'application/json')
            .query({ offset: params.offset })
            .query({ limit: params.limit })
            .query({ sort_by: params.sort_by })
            .then(r => {
                imageFilter_answer(r.body.data);
                resolve(r.body);
            })
            .catch(e => {
                reject(e);
            })
    })
}

async function comment(params) {
    return await new Promise((resolve, reject) => {
        request.get(`${params.type === 'answer'? API.ZHIHU.COMMENT : API.ZHIHU.COMMENT_ARTICLE}/${params.answerId}/comments?include=${API.ZHIHU.INCLUDE.COMMENT}`)
            .set('Accept', 'application/json')  
            .query({ order: params.order })
            .query({ offset: params.offset })
            .query({ limit: params.limit })
            .query({ status: 'open' })
            .then(r => {
                console.log("响应为", r.body)
                resolve(r.body);
            })
            .catch(e => {
                console.log("错误")
                reject(e);
            })
    })
}

async function topTopic() {
    return await new Promise((resolve, reject) => {
        request.get(API.ZHIHU.TOP_TOPIC)
            .then(r => {
                resolve(r.body);
            })
            .catch(e => {
                reject(e);
            })
    })
}

function imageFilter(data) {

    data.forEach((element, i, self) => {
        //in an answer
        if (element.object) {
            var $ = cheerio.load(element.object.content?element.object.content:'');
            $('img').each(function (i, elem) {
                // an image in an answer
                let src = '';
                if ($(this).attr('src').search('utf8') === -1) {
                    src = $(this).attr('src')
                } else {
                    if ($(this).attr('data-original')) {
                        src = $(this).attr('data-original')
                    }
                    if ($(this).attr('data-actualsrc')) {
                        src = $(this).attr('data-actualsrc')
                    }
                    if ($(this).attr('data-thumbnail')) {
                        src = $(this).attr('data-thumbnail')
                    }
                }
                $(this).attr('src', `${URL}/api/agent?url=${src}`)

            })

            self[i].object.content = $.html().replace(/^<html><head><\/head><body>|<\/body><\/html>$/g, '');
        }
    });
}

function imageFilter_answer(data) {

    data.forEach((element, i, self) => {
        //in an answer
        if (element.content) {
            var $ = cheerio.load(element.content);
            $('img').each(function (i, elem) {
                // an image in an answer
                let src = '';
                if ($(this).attr('src').search('utf8') === -1) {
                    src = $(this).attr('src')
                } else {
                    if ($(this).attr('data-original')) {
                        src = $(this).attr('data-original')
                    }
                    if ($(this).attr('data-actualsrc')) {
                        src = $(this).attr('data-actualsrc')
                    }
                    if ($(this).attr('data-thumbnail')) {
                        src = $(this).attr('data-thumbnail')
                    }
                }
                $(this).attr('src', `${URL}/api/agent?url=${src}`)

            })

            self[i].content = $.html().replace(/^<html><head><\/head><body>|<\/body><\/html>$/g, '');


        }
    });
}