module.exports =  function () {
return `
import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'rrc-loader-helper';
import { Table } from 'shineout';
import SearchAreaTable from '@public-component/search-queries/tableSorter-container';
import store from '../reducers';
import style from '../style.css';

class List extends React.Component {
  render() {
    const {
      loading,
      list,
      pageInfo,
    } = this.props;

    const columns = [
      {
        title: t('类型'),
        render: 'logTypeName',
        width: 60,
      },
      {
        title: t('拣货周转箱'),
        render: 'pickContainerCode',
        width: 100,
      },
      {
        title: t('批次周转箱'),
        render: 'batchContainerCode',
        width: 100,
      },
      {
        title: t('批次号'),
        render: 'batchCode',
        width: 100,
      },
      {
        title: t('任务号'),
        render: 'taskCode',
        width: 100,
      },
      {
        title: t('包裹号'),
        render: 'packageNo',
        width: 100,
      },
      {
        title: t('商品编号'),
        render: 'goodsSn',
        width: 100,
      },
      {
        title: 'SKU',
        render: 'skuCode',
        width: 150,
      },
      {
        title: t('尺码'),
        render: 'size',
        width: 60,
      },
      {
        title: t('一分数'),
        render: 'firstSowingNum',
        width: 80,
      },
      {
        title: t('异常库位'),
        render: 'exceptionLocation',
        width: 100,
      },
    ];

    return (
      <section style={{ height: '0px', flex: 1, margin: '16px 0 0 0' }}>
        <SearchAreaTable
          hideIcon
        >
          <Table
            style={{ height: '100%' }}
            bordered
            fixed="both"
            rowClassName={() => style.borderInner}
            loading={!loading}
            data={list}
            columns={columns}
            keygen="id"
            empty={t('暂无数据')}
            size="small"
            width={columns.reduce((pre, current) => pre + (current.width || 100), 0)}
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
      </section>
    );
  }
}

List.propTypes = {
  loading: PropTypes.number.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pageInfo: PropTypes.shape().isRequired,
};

export default List;


  ` 
}