function requestValidator(obj){
    let method = obj['method'];
    let uri = obj['uri'];
    let version = obj['version'];
    let message = obj['message'];

    if(!(method == 'POST' || method== 'GET' || method == 'DELETE' || method== 'CONNECT')){
        throw new Error('Invalid request header: Invalid Method');
    }

    const uriRegex = /^([\w\d\.]+|\*)$/g;

    if (!uriRegex.test(obj.uri) || !obj.hasOwnProperty('uri')) {
        throw new Error('Invalid request header: Invalid URI');
    }

    if(!(version== 'HTTP/0.9' || version== 'HTTP/1.0' || version== 'HTTP/1.1' || version== 'HTTP/2.0')){
        throw new Error('Invalid request header: Invalid Version');
    }

    const messageRegex = /^([^<>\\&'"]*)$/g;

    if (!messageRegex.test(obj.message) || !obj.hasOwnProperty('message')) {
        throw new Error('Invalid request header: Invalid Message');
    }

    let result = {
        method,
        uri,
        version,
        message,
    }

    return result;
}
