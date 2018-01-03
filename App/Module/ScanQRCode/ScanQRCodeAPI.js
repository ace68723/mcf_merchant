export default  {
  createAuthpay(reqData){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/create_authpay/';
    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Auth-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIsInJvbGUiOjY2NiwidXNlcm5hbWUiOiJ0ZXN0QWRtaW4iLCJhY2NvdW50X2lkIjozLCJleHBpcmUiOjE1MTMyMjIzMDB9.1M0YWtQNcoHmTQOwx0ZewAsqG3yETUmiJf8BiVBU56A',
          'Content-Type': 'application/json',
        }
    }
    // options.headers = Object.assign(options.headers,{
    //     uuid: io_data.uuid,
    // })

    options.body = JSON.stringify({
      "vendor_channel": reqData.vendor_channel,
	    "total_fee_in_cent": reqData.total_fee_in_cent,
	    "total_fee_currency": reqData.total_fee_currency,
	    "out_trade_no": reqData.out_trade_no,
    	"device_id": reqData.device_id,
	    "auth_code": reqData.auth_code
    })
    console.log(options)

  return fetch(url,options)
       .then((response) => response.json())
       .catch((error) => {throw error})
   },
   checkOrderStatus(channel,outTradeNo){
     const url = 'https://mcfpayapi.ca/api/v1/merchant/check_order_status/';
     let options = {
         method: 'POST',
         mode:'cors',
         headers: {
           'Auth-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIsInJvbGUiOjY2NiwidXNlcm5hbWUiOiJ0ZXN0QWRtaW4iLCJhY2NvdW50X2lkIjozLCJleHBpcmUiOjE1MTMyMjIzMDB9.1M0YWtQNcoHmTQOwx0ZewAsqG3yETUmiJf8BiVBU56A',
           'Content-Type': 'application/json',
         }
     }
     // options.headers = Object.assign(options.headers,{
     //     uuid: io_data.uuid,
     // })

     options.body = JSON.stringify({
       "vendor_channel":channel,
       // "type": "long_polling",
       "type": "pending",
       "out_trade_no":outTradeNo
     })

     console.log(options)
   return fetch(url,options)
        .then((response) => response.json())
        .catch((error) => {throw error})
    }
}
