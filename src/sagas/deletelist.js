/*
 *  删除列表项 流程
 * */
import { takeLatest ,takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel ,select} from 'redux-saga/effects';
import { notification } from 'antFB';
import { fetch } from '../services/index.js';


function* _deletelist({ payload }) {
  try {
    yield put({type: 'showLoading'});
    console.log("waiting for result");
    const { jsonResult } = yield call(fetch, payload);
    if (jsonResult && jsonResult.success) {
      /* yield put({
       type: 'delete/success',
       payload,
       });*/
      console.log("=============================>删除了")
      yield put({
        type: 'querylist'
      })
    }
    else {
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
    var action = yield take('deletelist');
    yield call(_deletelist, action);
  }
  //yield takeLatest('deletelist' ,_deletelist);
}



