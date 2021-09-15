

module.exports =  function () {
  return `
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t } from 'rrc-loader-helper';
import { Input } from 'shineout';
import SearchAreaContainer from '@public-component/search-queries/searchArea-container';

class Header extends Component {
  render() {
    const {
      loading,
      limit,
    } = this.props;

    return (
      <section >
        {/* 高级搜索 */}
        <SearchAreaContainer
          value={limit}
          labelStyle={{ width: 90 }}
          collapseOnSearch={false}
          searching={!loading}
          collapsible={false} // 是否支持收起
          cloud={false} // 隐藏搜索设置(集成云端配置保存)
        >
          <Input
            label={t('仓库')}
            disabled
            name="warehouse"
          />
          <Input
            label={t('波次号')}
            disabled
            name="wellenCode"
          />
          <Input
            label={t('SKU')}
            name="skuCode"
          />
          <Input
            label={t('任务号')}
            disabled
            name="taskCode"
          />
          <Input
            label={t('类型')}
            disabled
            name="typeName"
          />
          <Input
            label={t('拣货周转箱')}
            disabled
            name="pickContainerCode"
          />
          <Input
            label={t('一分人')}
            disabled
            name="firstSowingUsername"
          />
          <Input
            label={t('状态')}
            disabled
            name="status"
          />
          <Input
            label={t('完成时间')}
            disabled
            name="beginTime"
          />
          <Input
            label={t('开始时间')}
            disabled
            name="finishTime"
          />
          <Input
            label={t('拣货数')}
            disabled
            name="pickNums"
          />
          <Input
            label={t('一分数')}
            disabled
            name="firstSowingNum"
          />
        </SearchAreaContainer>
      </section>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.number.isRequired,
  limit: PropTypes.shape(),
};
export default Header;
  
  
  ` 
  }