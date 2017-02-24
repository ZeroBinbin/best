/*
 列表查询流程控制
 * */
import { takeLatest ,takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { notification  } from 'antFB';
import { fetch } from '../services/index.js';
function* _querylist(logInfo, { payload }) {
  const currentPage = yield select(({ publiclist })=>publiclist.currentPage);
  const showCount = yield select(({ publiclist })=>publiclist.showCount);
  let queryOptions = yield select(({ publiclist })=>publiclist.queryOptions);
  if (payload && payload.queryOptions) {
    queryOptions = payload.queryOptions;
    delete payload.queryOptions
  }
  try {
    let newQuery = {
      ...queryOptions,
      currentPage: currentPage,
      showCount: showCount,
      ...payload,
    }
    yield put({type: 'showLoading'});
    if (!newQuery.api) newQuery.api = logInfo.lastestCalledApi;
    logInfo.lastestCalledApi = newQuery.api;
    const { jsonResult } = yield call(fetch, newQuery);
    if (jsonResult && jsonResult.success) {
      let showCount = newQuery.showCount, currentPage = newQuery.currentPage;
      delete newQuery.api;
      delete newQuery.showCount;
      delete newQuery.currentPage;
      if (Array.isArray(jsonResult.data)) {
        if (jsonResult.data.length == 0 && currentPage > 1) {
          yield put({
            type: 'querylist',
            payload: {
              currentPage: currentPage - 1
            }
          })
        } else {
          yield put({
            type: 'query/success',
            payload: {
              list: jsonResult.data,
              total: jsonResult.total,
              showCount: showCount,
              currentPage: currentPage,
              queryOptions: newQuery
            },
          });
        }
      } else {
        notification.error({
          message: "data 格式错误",
          description: "data :=" + JSON.stringify(jsonResult.data)
        });
      }
    }
    else {
      notification.error({
        message: "返回数据错误",
        description: JSON.stringify(jsonResult)
      });
    }
  } catch (err) {
    notification.error({
      message: "异步操作错误",
      description: JSON.stringify(payload) + "\n " + err
    });
  }
}

export default function* () {
  let logInfo = {
    lastestCalledApi: ""
  }
  /*while(true){
   var action = yield take('querylist');
   yield call(_querylist ,logInfo ,action);
   }*/
  yield takeLatest('querylist', _querylist, logInfo)
}
