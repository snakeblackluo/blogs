import fetch from 'isomorphic-fetch';
import { notification } from 'antd';

import { getPrefix, formartUrlWithParams } from '../utils/urls';
import { CALL_API } from '../constants/status';
import actionTypes from '../constants/actionTypes';

export default  store => next => (action) => {
    const callAPI = action[CALL_API];
    if (!callAPI) {
        return next(action);
    }
    const currState = store.getState();
    let success = () => {};
    let error = () => {};
    const {types, url} = callAPI;
    const method = callAPI.method || 'get';
    const headers = callAPI.headers || {};
    const params = callAPI.params || {};
    const urlPrefix = getPrefix(method);
    const endpoint = url.startsWith('http') ? url : urlPrefix + formartUrlWithParams(url, params);
    let { responseCode } =  callAPI;

    if ( typeof responseCode === 'undefined') {
        responseCode = 200;
    }
    
    const useTypes = Array.isArray(types) && types.length === 3;
    
    function actionWith(datas){
        return Object.assign({}, action, datas);
    }
    
    const [ requestType, successType, failureType ] = types || []; 
    
    const headerOptions = Object.assign({}, {
        accept: 'application/json',
        'Content-Type': 'application/json',
    }, headers);
    if ( currState.user.token ) {
        headerOptions.Authorization = `Bearer ${currState.user.token}`;
    }
    const options = {
        method: method,
        headers: headerOptions,
    }
    if (callAPI.data) {
        Object.assign(options, {
            body: JSON.stringify(callAPI.data),
        });
    }
    
    if (callAPI.success && (typeof callAPI.success === 'function')){
        success = callAPI.success;
    }

    if (callAPI.error && (typeof callAPI.error === 'function')) {
        error = callAPI.error;
    }
    
    if (useTypes) {
        next(actionWith({
            type: requestType,
            payload: callAPI.data || {},
        }));
    }

    function handleErr(res) {
        if (res.code === -101) {
            notification.error({
                message: '身份信息过期',
                description: res.message,
            });
            next(actionWith({
                type: actionTypes.LOG_OUT,
            }));
            return;
        }
        error(res);
        notification.error({
            message: `请求错误${res.code}`,
            description: res.message,
        });

        if (useTypes) {
            next(actionWith({
                type: failureType,
                payload: res,
            }));
        }
    }

    return fetch(endpoint, options)
        .then((response) => {
            let responseData = [];
            try {
                responseData = response.json();
            }catch(e){
                throw new Error(e.message);
            }
            return responseData;
        })
        .then((jsonResult) => {
            const {code, result, message} = jsonResult;
            if (parseInt(code, 10) === parseInt(responseCode, 10)){
                if (useTypes){
                    next(actionWith({
                        type: successType,
                        payload: result,
                        extraData: message,
                        requestData: callAPI.data,
                    }));
                } 
                success(result, message, store.dispatch);
            } else {
                handleErr(jsonResult);
            }
        })
        .catch( error => {
            handleErr(error);
        });
}