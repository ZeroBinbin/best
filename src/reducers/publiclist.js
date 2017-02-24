import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const publiclist = handleActions({
  ['showLoading'](state, action) {
    return {...state, loading: true};
  },
  ['create/success'](state, action) {
    const newUser = action.payload;
    return {...state, list: [newUser, ...state.list], loading: false};
  },
  ['delete/success'](state, action) {
    const id = action.payload;
    const newList = state.list.filter(user => user.id !== id);
    return {...state, list: newList, loading: false};
  },
  ['update/success'](state, action) {
    const updateUser = action.payload;
    const newList = state.list.map(user => {
      if (user.id === updateUser.id) {
        return {...user, ...updateUser};
      }
      return user;
    });
    return {...state, list: newList, loading: false};
  },
  ['query/success'](state, action) {
    return {...state, ...action.payload, loading: false};
  },
  ['showModal'](state, action) {
    return {...state, modalVisible: true, modalType: action.payload.modalType};
  },
  ['hideModal'](state, action) {
    return {...state, modalVisible: false};
  },
  ['setCurrentItem'](state, action){
    return {...state, currentItem: action.payload};
  }
}, {
  status: "list",
  list: [],
  loading: false,
  total: 0,
  currentPage: 1,
  showCount: 7,
  currentItem: {},
  queryParams: {},
  modalVisible: false,
  modalType: 'create'
});

export default publiclist;
