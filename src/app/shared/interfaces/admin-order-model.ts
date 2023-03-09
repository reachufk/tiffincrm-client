export interface AdminOrderModel {
      username:String,
      phoneNumber:number,
      email?:String,
      
      orderAddress: String
      orderAmount: String
      orderMode: String
      orderItems: Array<any>
      orderPaymentMode: String
      orderInstructions: String
      orderDeliveryTime: String
      orderType: String
}
