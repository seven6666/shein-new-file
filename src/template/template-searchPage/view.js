module.exports =  function () {
return `
import React, { Component } from 'react';
import { i18n } from 'rrc-loader-helper';
import ContainerPage from '@public-component/search-queries/container';
import store from './reducers';
import Header from './jsx/header';
import List from './jsx/list';

class Container extends Component {
  componentDidMount() {
    store.init();
  }

  render() {
    return (
      <ContainerPage warehouseChange={data => console.log('右上角仓库改变', data)}>
        <Header {...this.props} />
        <List {...this.props} />
      </ContainerPage>
    );
  }
}

export default i18n(Container);
` 
}