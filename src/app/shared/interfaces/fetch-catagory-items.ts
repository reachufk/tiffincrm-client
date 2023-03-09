export interface FetchCatagoryItems {
      pageNo: number,
      pageSize: number,
      keyword: string,
      catagory: string
}
export function initializeFetchCatagoryItems():FetchCatagoryItems{
      return{
            pageNo: 1,
            pageSize: Infinity,
            keyword: "",
            catagory: ""
      }
}

