module.exports =  function () {
return `
import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'rrc-loader-helper';
import { Table, Button } from 'shineout';
import SearchAreaTable from '@public-component/search-queries/tableSorter-container';
import ModalOperation from '@public-component/search-queries/modal-operation';
import { handleTablePros } from '@src/lib/deal-func';
import store from '../reducers';

class List extends React.Component {
render() {
  const {
    loading,
    list,
    pageInfo,
    recordId,
    recordVisible,
  } = this.props;

  const columns = [
    {
      title: t('仓库'),
      render: 'warehouse',
      width: 100,
    },
    {
      title: t('子仓'),
      render: 'subWarehouse',
      width: 120,
    },
    {
      title: t('任务单号'),
      render: 'replenishmentCode',
      width: 160,
    },
    {
      title: t('移位类型'),
      render: 'shiftTypeName',
      width: 160,
    },
    {
      title: t('总箱数'),
      render: 'totalBoxNum',
      width: 80,
    },
    {
      title: t('下架总件数'),
      render: 'underNum',
      width: 120,
    },
    {
      title: t('上架总件数'),
      render: 'upperNum',
      width: 120,
    },
    {
      title: t('状态'),
      render: 'statusName',
      width: 100,
    },
    {
      title: t('下架员'),
      render: 'underUser',
      width: 100,
    },
    {
      title: t('开始时间'),
      render: 'createTime',
      width: 190,
    },
    {
      title: t('操作'),
      fixed: 'right',
      width: 80,
      render: record => (
        <Button
          size="small"
          text
          type="primary"
          style={{ fontSize: 14, lineHeight: 1, padding: 0 }}
          onClick={() => store.changeData({ recordVisible: true, recordId: record.id })}
        >
          {t('查看')}
        </Button>
      ),
    },
  ];

  return (
    <section style={{ height: '0px' /* 必写为了子domheight - 100%有效 */, flex: 1 }}>
      <SearchAreaTable >
        <Table
          {...handleTablePros(columns)}
          loading={!loading}
          data={list}
          keygen="id"
          pagination={{
            align: 'right',
            current: pageInfo.pageNum,
            pageSize: pageInfo.pageSize,
            layout: [({ total }) => t('共{}条', total), 'links', 'list', () => t('跳至'), 'jumper', () => t('页')],
            onChange: (page, size) => {
              store.handlePaginationChange({
                pageNum: page,
                pageSize: size,
              });
            },
            pageSizeList: pageInfo.pageSizeList,
            total: pageInfo.count,
          }}
        />
      </SearchAreaTable>

      {/* 操作记录 */}
      <ModalOperation
        visible={recordVisible}
        id={recordId}
        code="SHIFT_ORDER_CONFIG"
        onCancel={() => store.changeData({ recordVisible: false })}
      />
    </section>
  );
}
}

List.propTypes = {
  loading: PropTypes.number,
  recordId: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object),
  pageInfo: PropTypes.shape,
  recordVisible: PropTypes.bool,
};

export default List;

  ` 
}