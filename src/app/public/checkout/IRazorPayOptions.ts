export interface IRazorPayOtpions {
            "key": string, 
            "amount": number, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency":string,
            "name": string,
            "description": string,
            "image": string,
            "prefill":
            {
              "email": String,
              "contact": Number,
            },
            "order_id": string,
            "handler":any,
            "modal":any
            "config": {},
            "notes": {
              "address": string
            },
            "theme": {
              "color": string
            }
}

export function InitializeRPayOptions ():IRazorPayOtpions{
     return {
            "key": "rzp_test_2alsaQKjTooqSr", 
            "amount": 0,
            "currency": "",
            "name": "Tiffin Aaw",
            "description": "Test Transaction",
            "image": "",
            "prefill":
            {
              "email": '',
              "contact": 0,
            },
            "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler":<any>Function,
            "modal":<any>{},
            "config": {
            },
            "notes": {
              "address": "Srinagar"
            },
            "theme": {
              "color": "#3399cc"
            }
      }
}





// "handler": function (response) {
//       this.CheckPayment(response)

//     }.bind(this),
//     "modal": {
//       "ondismiss": function () {
//         this.CancelCheckout()
//       }.bind(this)
//     },