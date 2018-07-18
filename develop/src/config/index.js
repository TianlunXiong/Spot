let URL = '';

if(process.env.NODE_ENV === 'development'){
    URL = 'http://localhost:8080' //这里的端口要与服务器的端口一致
}
if(process.env.NODE_ENV === 'production'){
    URL = ''
}


export default {
    URL
}