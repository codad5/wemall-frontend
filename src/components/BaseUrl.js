function BaseUrl(){
    if(window.location.hostname === 'localhost'){
        return 'http://localhost/wemall/api/';
    }
    else{
        return 'https://wemall.sanctablog.com/api/';
    }
}

export default BaseUrl