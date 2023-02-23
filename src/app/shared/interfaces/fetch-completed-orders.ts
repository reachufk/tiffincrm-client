export interface FetchOrderModel {
      pageNo: number,
      pageSize: number,
      keyword: string
}

export function initializeFetchOrderModel(): FetchOrderModel {
      return {
            pageNo: 1,
            pageSize: 10,
            keyword: ""
      }
}