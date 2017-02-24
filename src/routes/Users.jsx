import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../layouts/MainLayout/MainLayout';
import styles from './Users.less';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal'

const Users = React.createClass({
  componentWillMount(){
    let { dispatch } = this.props;
    dispatch({
      type: "querylist",
      payload: {
        api: 'queryUser'
      }
    })
  },
  render() {
    let { location ,dispatch ,publiclist } = this.props;
    const {
        loading, list, total, currentPage, showCount,
        currentItem, modalVisible, modalType,
        } = publiclist;
    const { field, keyword } = location.query;

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const UserModalGen = () => {
      return <UserModal
          dispatch={dispatch}
          item={currentItem}
          visible={modalVisible}
          type={modalType}
      />
    };

    return (
        <MainLayout location={location}>
          <div className={styles.normal}>
            <UserSearch
                dispatch={dispatch}
                field={field}
                keyword={keyword}
            />
            <UserList
                dispatch={dispatch}
                dataSource={list}
                loading={loading}
                total={total}
                currentPage={ currentPage }
                showCount={ showCount }
            />
            <UserModalGen />
          </div>
        </MainLayout>
    );
  }
});

Users.propTypes = {};

function mapStateToProps({ publiclist }) {
  return {publiclist};
}

export default connect(mapStateToProps)(Users);
