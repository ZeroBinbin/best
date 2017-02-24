/*
 列表修改流程控制
 * */
import { takeLatest ,takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { notification  } from 'antFB';
import { fetch } from '../services/index.js';

/**
 * 展示修改弹窗 ，并且回填数据
 * @param payload
 * @private
 */
function* _showUpdateModal({ payload }) {
  try {
    if (payload.api) {
      const { jsonResult } = yield call(fetch, payload);
      if (jsonResult && jsonResult.success) {
        yield put({type: 'setCurrentItem', payload: jsonResult.data})
      } else {
        notification.error({
          message: "返回数据错误",
          description: JSON.stringify(jsonResult)
        });
      }
    } else {
      const list = yield select(({ publiclist })=>publiclist.list);
      let currentItem = {}
      list.forEach((listItem)=> {
        let flag = true;
        for (var key in payload) {
          if (payload[key] != listItem[key]) {
            flag = false;
          }
        }
        if (flag) {
          currentItem = listItem;
        }
      });
      yield put({type: 'setCurrentItem', payload: currentItem})
    }
    yield put({type: 'showModal', payload: {modalType: 'update'}})
    var action = yield take('updatelist');
    yield call(_updatelist, action)
  }
  catch (err) {
    notification.error({
      message: "异步操作错误",
      description: JSON.stringify(payload) + "\n " + err
    });
  }
}

/**
 * 修改列表数据
 */
function* _updatelist({ payload }) {
  try {
    yield put({type: 'hideModal'});
    yield put({type: 'showLoading'});
    const newUser = {...payload};
    const { jsonResult } = yield call(fetch, newUser);
    if (jsonResult && jsonResult.success) {
      /*yield put({
       type: 'update/success',
       payload: newUser,
       });*/
      yield put({
        type: 'querylist'
      })
    } else {
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
  /*while(true){
   var action = yield take('showUpdateModal');
   yield call(_showUpdateModal ,action);
   }*/
  yield takeLatest('showUpdateModal', _showUpdateModal)
}
