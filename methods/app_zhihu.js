const cheerio = require('cheerio');
const request = require('superagent')

//@cookies_Zhihu.Type == String 为你自己的知乎cookies 可以通过UA获取
var {cookies_Zhihu} = require('./cookies/forZhihu');

module.exports = zhihu_search;

async function zhihu_topList(){
    var msg,timeStamp;
    await new Promise((resolve,reject)=>{
        resolve (request.get('https://www.zhihu.com/api/v4/search/top_search').set('cookie',cookies_Zhihu));
    }).then(data=>{
        msg = JSON.parse(data.text);
        timeStamp = new Date().toLocaleString();
    })

    return {
        timeStamp,
        list: msg["top_search"]["words"]
    }
}

//返回Response中的html
async function zhihu_search(query){
    var r;
    var url = encodeURI(`https://www.zhihu.com/search?type=content&q=${query}`)
    await new Promise((res,rej)=>{
        res(request.get(url).set('cookie',cookies_Zhihu));
    }).then(data=>{
        r = data;
    })

    return extract_searchPage(r);
}

//将zhihu_topList功能挂载到zhihu_search对象上
zhihu_search.toplist = zhihu_topList

function extract_searchPage(r){
    var  htmlstr = r.text;
    var _list = [];
    cheerio.load(htmlstr)('h2[class="ContentItem-title"] a','div[class="Card"]').each(function(i,elem){
        var init = cheerio.load(this);
        var text = init.text();
        var href = init('a').attr('href');
        var url  = (/^\/\//.test(href) ? "https:":"https://www.zhihu.com") + href;
        _list[i] = {
            title : text,
            url
        }
    })

    cheerio.load(htmlstr)('div[class="RichContent-inner"] span').each(function(i,elem){
        var init = cheerio.load(this);
        var text = init.text();
        _list[i] = {
            ..._list[i],
            abbr: text
        }
    })

    return _list;
}

// zhihu_search.toplist().then(r=>{
//     console.log(r);
// })

// zhihu_search("雷军").then(r=>{
//     var list = extract_searchPage(r);
//     console.log(list);
// })