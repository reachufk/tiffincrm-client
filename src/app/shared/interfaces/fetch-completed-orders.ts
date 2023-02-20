export interface FetchCompletedOrders {
      pageNo: number,
      pageSize: number,
      keyword: string
}

export function initializeFetchCompletedModel(): FetchCompletedOrders {
      return {
            pageNo: 1,
            pageSize: 10,
            keyword: ""
      }
}