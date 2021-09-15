module.exports =  function () {
return `
import { markStatus } from 'rrc-loader-helper';
import { Modal } from 'shineout';
import { getSize } from '@src/middlewares/pagesize';
import { queryFirstTransferDetail } from '@src/server/outbound/transfer';

export const defaultValue = {
  warehouse: '',
  wellenCode: '',
  taskCode: '',
  typeName: '',
  pickContainerCode: '',
  status: '',
  firstSowingNum: '',
  firstSowingOperator: '',
  beginTime: '',
  finishTime: '',
  pickNums: '',
  skuCode: '',
};
const defaultState = {
  limit: defaultValue,
  list: [],
  pickContainerCode: '',
  pickContainerId: '',
  taskCode: '',
  taskType: '',
  pageInfo: {
    pageNum: 1, // 页码
    count: 0, // 表格总条数
    pageSize: getSize(),
    pageSizeList: ['20', '50', '100'], // 表格页显示条数
  },
};

export default {
  state: defaultState,
  // 改变state的值
  changeData(state, data) {
    Object.assign(state, data);
  },
  /**
   * 初始化数据
   */
  * init() {
    const {
      pickContainerCode,
      pickContainerId,
      taskCode,
      taskType,
      pageInfo,
    } = this.state;

    const params = {
      pickContainerCode,
      pickContainerId,
      taskCode,
      taskType,
      pageSize: pageInfo.pageSize,
      pageNum: pageInfo.pageNum,
    };
    markStatus('loading');
    const { code, info, msg } = yield queryFirstTransferDetail(params);
    if (code === '0') {
      yield this.changeData({
        list: info.data[0].firstSowingLogDetailListRsp,
        limit: info.data[0].firstSowingSearchListRsp,
        pageInfo: {
          ...this.state.pageInfo,
          count: info.meta.count,
        },
      });
    } else {
      Modal.error({
        title: msg,
        autoFocusButton: 'ok',
      });
    }
  },
  /**
   * 页签改变
   * @param {*} arg
   */
  * handlePaginationChange(arg = {}) {
    yield this.changeData({
      pageInfo: {
        ...this.state.pageInfo,
        ...arg,
      },
    });
    yield this.init();
  },
};

  ` 
}