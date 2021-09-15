module.exports =  function () {
return `
import moment from 'moment';
import { markStatus, t } from 'rrc-loader-helper';
import { getSize } from '@src/middlewares/pagesize';
import { getWarehouse } from '@src//server/basic/warehouse';
import { dictSelect } from '@src/server/basic/dictionary';
import { handleChangeWarehouseList } from '@src/lib/dealFunc';
import { selectSubWarehouse } from '@src/server/basic/sub-warehouse';
import { exportFirst, queryFirstTransfer } from '@src/server/outbound/transfer';
import { Modal } from 'shineout';

const format = 'YYYY-MM-DD HH:mm:ss';

// 搜索默认值
export const defaultLimit = {
  pickContainerCode: '',
  wellenCode: '',
  firstSowingUsername: '',
  taskCode: '',
  timeFlag: '1',
  status: [],
  warehouse: [],
  categoryType: [],
  beginTime: moment(new Date()
    .setHours(0, 0, 0, 0))
    .format(format),
  endTime: moment(new Date()
    .setHours(23, 59, 59, 999))
    .format(format),
  operateSubWarehouseId: '',
  nationalLineTypes: [],
  orderBy: '',
};
// 其他默认值
const defaultState = {
  formRef: {},
  loading: 0, // 0 loading, 1 load success, 2 load fail
  warehouseList: [],
  transferTypeList: [],
  statusList: [],
  limit: defaultLimit,
  list: [],
  pageInfo: {
    pageNum: 1, // 页码
    count: 0, // 表格总条数
    pageSize: getSize(),
    pageSizeList: ['20', '50', '100'], // 表格页显示条数
  },
  timeTypeList: [
    { dictCode: '1', dictNameZh: t('一分开始时间') },
    { dictCode: '2', dictNameZh: t('一分完成时间') },
    { dictCode: '3', dictNameZh: t('拣货完成时间') },
  ],
  operateSubWarehouseList: [],
  nationalLineList: [],
  recordVisible: false, // 操作记录弹窗
  recordId: '', // 操作记录id
};

export default {
  state: defaultState,
  // 改变state的值
  changeData(state, data) {
    Object.assign(state, data);
  },
  // 改搜索条件limit属性值
  changeLimitData(state, data) {
    Object.assign(state, {
      limit: {
        ...state.limit,
        ...data,
      },
    });
  },

  /**
   * 初始化数据
   */
  * init() {
    markStatus('loading');
    const [warehouseData, selectData] =
    yield Promise.all([
      getWarehouse({ enabled: 1 }),
      dictSelect({ catCode: ['FIRST_SOWING_PICK_CONTAINER_STATUS', 'FIRST_SOWING_TASK_TYPE_CODE', 'NATIONAL_LINE_TYPE'] }),
    ]);
    if (warehouseData.code === '0' && selectData.code === '0') {
      yield this.changeData({
        transferTypeList: ((selectData.info.data[1] || {}).dictListRsps || [])
          .filter(item => item.dictCode !== 5), // 过滤到异常拣货
        statusList: selectData.info.data[0].dictListRsps,
        nationalLineList: selectData.info.data[2].dictListRsps,
      });
      // 改变右上角仓库下拉数据
      yield handleChangeWarehouseList(warehouseData.info.data);
    } else {
      Modal.error({
        title: warehouseData.msg || t('请求失败,请稍后再试'),
        autoFocusButton: 'ok',
      });
    }
    // 有仓库，则请求子仓数据
    const { warehouseId } = yield 'nav';
    if (warehouseId) {
      yield this.getSubWarehouse({
        value: warehouseId,
      });
    }
  },

  /**
   * 根据仓库获取子仓列表
   * @param {*} action
   */
  * getSubWarehouse(action) {
    const { value } = action;
    const res = yield selectSubWarehouse({ warehouseId: value, enabled: 1 });
    if (res.code === '0') {
      yield this.changeData({
        operateSubWarehouseList: res.info.data,
      });
    } else {
      Modal.error({
        title: res.msg || t('请求失败,请稍后再试'),
        autoFocusButton: 'ok',
      });
    }
  },

  /**
   * 右上角更换仓库触发
   * @param {*} action
   */
  * changeSubWarehouseList(action) {
    const { subWarehouseList } = action;
    yield this.changeData({
      operateSubWarehouseList: subWarehouseList,
      limit: {
        ...this.state.limit,
        operateSubWarehouseId: '',
      },
    });
  },

  /**
   * 重置查询条件
   */
  * clearLimitData() {
    const { formRef } = this.state;
    yield this.changeLimitData({
      ...defaultLimit,
    });
    // 清空校验信息
    formRef.clearValidate();
  },

  /**
   * 搜索操作
   */
  * search() {
    const { limit, pageInfo } = this.state;
    const { warehouseId } = yield 'nav';
    // 这个地方的仓库，前端是单选，但入参要传数组，历史原因，不知道为何 -by zhangyilan
    const param = Object.assign({}, limit, {
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize,
    }, {
      warehouse: warehouseId ? [warehouseId] : [],
    });
    markStatus('loading');
    const { code, info, msg } = yield queryFirstTransfer(param);
    if (code === '0') {
      yield this.changeData({
        list: info.data,
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
    const { formRef } = this.state;
    // 校验
    let validateFlag = false;
    yield formRef.validate().then(() => {
      validateFlag = true;
    }).catch(() => {
      validateFlag = false;
    });

    if (validateFlag) {
      yield this.changeData({
        pageInfo: {
          ...this.state.pageInfo,
          ...arg,
        },
      });
      yield this.search();
    }
  },

  /**
   * 按钮操作-导出
   * @returns
   */
  * exportData() {
    const { limit, formRef } = this.state;
    const { warehouseId } = yield 'nav';
    // 校验
    let validateFlag = false;
    yield formRef.validate().then(() => {
      validateFlag = true;
    }).catch(() => {
      validateFlag = false;
    });

    if (validateFlag) {
      try {
        const param = Object.assign({}, limit, {
          pageNum: 1,
          pageSize: getSize(),
        }, {
          warehouse: warehouseId ? [warehouseId] : [],
        });
        markStatus('loading');
        const data = yield exportFirst(param);
        if (data.code === '0') {
          window.open('#/statistical/download');
        } else {
          Modal.error({
            title: t('后台数据出错'),
            autoFocusButton: 'ok',
          });
        }
      } catch (e) {
        Modal.error({
          title: e.reason.message,
          autoFocusButton: 'ok',
        });
      }
    }
  },
};
  ` 
}