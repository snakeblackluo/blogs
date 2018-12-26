import { USE_MOCK } from '../constants/config';
import { BASE_ROUTE } from '../constants/env';

export function getRoute(path){
    return BASE_ROUTE + path;
}

export function getPrefix(method){
    const isProd = process.env.API_ENV === 'production';
    const useMock = USE_MOCK;
    const prodHost = '';
    const stageHost = '';
    const mockHost = '';

    const preHost = isProd ? prodHost : stageHost;
    const host = useMock ? mockHost : preHost;
    
    const getPrefixByMeth = method => (useMock ? '' : host);
    const prefix = getPrefixByMeth(method);
    return prefix;
}

/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 参数对象
 * @returns {string} - 拼接成的字符串参数
 */
export function encodeSearchParams(obj) {
    const params = Object.keys(obj)
        .map(key => {
            let value = obj[key];
            if (typeof value === 'undefined') {
                value = '';
            }
            return [key, value].join('=');
        })
    return params.join('&');
}

export function getCookie(cname){
    const name = `${cname}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
        const cookieKeyAndValue = cookies[i].trim();
        if (cookieKeyAndValue.indexOf(name) === 0) {
            return cookieKeyAndValue.substring(name.length, cookieKeyAndValue.length);
        }
    }
    return '';
}

export function getURlParamObject() {
    const search = window.location.search.substr(1);
    return search.split('&').reduce((result, paramStr) => {
        const nextResult = result;
        if (paramStr) {
            const paramObj = paramStr.split('=');
            nextResult[paramObj[0]] = paramObj[1];
        }
        return nextResult;
    },{});
}

export function formartUrlWithParams(url, params){
    const replacer = (str, key) => params[key];
    return url.replace(/(([a-zA-Z0-9]|_)*)/g, replacer);
}