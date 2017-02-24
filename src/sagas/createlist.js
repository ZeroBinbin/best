/*
 *  创建新列表项 流程
 * */
import { takeLatest ,takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { notification } from 'antFB';
import { fetch } from '../services/index.js';

function* _createlist({ payload }) {
    try {
        yield put({type: 'hideModal'});
        yield put({type: 'showLoading'});
        const { jsonResult } = yield call(fetch, payload);
        if (jsonResult && jsonResult.success) {
            /* yield put({
             type : 'create/success',
             payload,
             });*/
            yield put({
                type: 'querylist',
                payload: {
                    queryOptions: {},
                    currentPage: 1
                }
            })
        } else {
            notification.error({
                message: "返回数据错误",
                description: JSON.stringify(jsonResult)
            })
        }
    } catch (err) {
        notification.error({
            message: "异步操作错误",
            description: JSON.stringify(payload) + "\n " + err
        });
    }
}

export default function* () {
    while (true) {
        var action = yield take('createlist');
        yield call(_createlist, action);
    }
    /* yield takeLatest('createlist' ,_createlist);*/
}

