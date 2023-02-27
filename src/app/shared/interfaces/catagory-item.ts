export interface CatagoryItem {
      _id?:String
      catagory:String
      itemName:String
      itemPrice:Number,
      isVeg:Boolean,
      itemTypes:Array<any>;
      selectedItemType:String;
      itemDiscount:Number
}
