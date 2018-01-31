export default  {
  preCreateAuthpay(token,channel,amount,device_id,tipAmount){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/precreate_authpay/';
    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Auth-Token': token,
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
