module.exports =  function () {
return `
import { sendPostRequest } from '@src/server/common/public';

// 搜索
export const getListApi = param => sendPostRequest({
  url: '/shift_order/list_order',
  param,
});

// 导出
export const exportListApi = param => sendPostRequest({
  url: '/shift_order/export',
  param,
});

` 
}