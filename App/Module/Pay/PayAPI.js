export default  {
  preCreateAuthpay(channel,amount,device_id){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/precreate_authpay/';
    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Auth-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjIsInJvbGUiOjY2NiwidXNlcm5hbWUiOiJ0ZXN0QWRtaW4iLCJhY2NvdW50X2lkIjozLCJleHBpcmUiOjE1MTMyMjIzMDB9.1M0YWtQNcoHmTQOwx0ZewAsqG3yETUmiJf8BiVBU56A',
          'Content-Type': 'application/json',
        }
    }
    options.body = JSON.stringify({
      "vendor_channel":channel,
    	"total_fee_in_cent": amount,
    	"total_fee_currency":"CAD",
    	"device_id":device_id
    })

    console.log(options)
    return fetch(url,options)
       .then((response) => response.json())
       .catch((error) => {throw error})
   }
}
