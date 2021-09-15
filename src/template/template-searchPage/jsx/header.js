

module.exports =  function () {
  return `
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { t } from 'rrc-loader-helper';
import { Form, Input, Select, Rule } from 'shineout';
import SearchAreaContainer from '@public-component/search-queries/searchArea-container';
import BaseDatePicker from '@public-component/search-queries/baseDatePicker';
import store, { defaultLimit } from '../reducers';
import Handle from './handle';

const getTime = val => (val ? moment(val) : null);

const rule = Rule({
  timeRange: {
    func: (val, formData, callback) => {
      if (!formData.beginTime || !formData.endTime) {
        callback(new Error(t('开始时间或结束时间必选')));
      }
      // 限制可选时间段最大不超过31天
      if (moment(formData.endTime)
        .diff(moment(formData.beginTime), 'days') > 31) {
        callback(new Error(t('选择时间段不能大于31天')));
      }
      callback(true);
    },
  },
});
class Header extends Component {
  render() {
    const {
      loading,
      limit,
      statusList,
      shiftTypeList,
      timeTypeList,
    } = this.props;
    return (
      <section >
        <SearchAreaContainer
          clearUndefined={false}
          // labelStyle={{ width: 60 }} // 统一修改label宽度，默认60
          searching={!loading}
          value={limit}
          onChange={val => store.changeLimitData(Object.assign({}, defaultLimit, val))}
          onClear={() => store.clearLimitData()}
          onSearch={() => {
            // 点搜索按钮，将页码重置为1
            store.handlePaginationChange({ pageNum: 1 });
          }}
          formRef={f => store.changeData({ formRef: f })}
        >
          <Input label={t('输入框')} name="shiftOrderCode" />
          <Select
            label={t('单选')}
            name="shiftType"
            data={shiftTypeList}
            keygen="dictCode"
            format="dictCode"
            renderItem="dictNameZh"
            onFilter={text => d => d.dictNameZh.toLowerCase().indexOf(text.toLowerCase()) >= 0}
            clearable
            placeholder={t('全部')}
          />
          <Select
            label={t('多选')}
            name="status"
            data={statusList}
            keygen="dictCode"
            format="dictCode"
            renderItem="dictNameZh"
            onFilter={text => d => d.dictNameZh.toLowerCase().indexOf(text.toLowerCase()) >= 0}
            multiple
            compressed
            clearable
            placeholder={t('全部')}
          />
          <Form.Field
            required
            name={['timeType', 'beginTime', 'endTime']}
            rules={[rule.timeRange()]}
            label={t('联动时间')} hideLabel span={2}
            // label={t('xx时间')} span={2}
          >
            {({ value, onChange }) => (
              <div style={{ display: 'flex' }}>
                <Select
                  style={{ width: 140 }}
                  name="timeType"
                  keygen="dictCode"
                  format="dictCode"
                  renderItem="dictNameZh"
                  data={timeTypeList}
                />
                <BaseDatePicker
                  value={[getTime(value[1]), getTime(value[2])]}
                  onChange={(d1, d2) => onChange([value[0], d2[0], d2[1]])}
                />
              </div>
            )}
          </Form.Field>
        </SearchAreaContainer>
        <Handle {...this.props} />
      </section>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.number,
  limit: PropTypes.shape,
  timeTypeList: PropTypes.arrayOf(PropTypes.object),
  statusList: PropTypes.arrayOf(PropTypes.object),
  shiftTypeList: PropTypes.arrayOf(PropTypes.object),
};
export default Header;
  
  ` 
  }