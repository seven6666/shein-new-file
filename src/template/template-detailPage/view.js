module.exports =  function () {
return `
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'rrc-loader-helper';
import ContainerPage from '@public-component/search-queries/container';
import store from './reducers';
import Header from './jsx/header';
import List from './jsx/list';

class Container extends Component {
componentDidMount() {
  const { params } = this.props;
  // url 传参数
  store.changeData({
    pickContainerCode: params.pickContainerCode,
    pickContainerId: params.pickContainerId,
    taskCode: params.taskCode,
    taskType: params.taskType,
  }).then(() => {
    store.init();
  })
}

render() {
  return (
    <ContainerPage>
      <Header {...this.props} />
      <List {...this.props} />
    </ContainerPage>
  );
}
}

Container.propTypes = {
params: PropTypes.shape(),
};

export default i18n(Container);

` 
}