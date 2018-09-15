module.exports = async function (ctx,next) {
    
    var session = ctx.cookies.get('ous');
    //存在与sesssion相关的cookies
    if(session){
        ctx.state.user = {
            _session : session,
            _hasSession : true
        }
    }else{
        ctx.state.user = {
            _hasSession : false
        }
    }

    await next();
}