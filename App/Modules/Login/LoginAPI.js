export default  {
    login(merchantId, username, password){
      const url = 'https://mcfpayapi.ca/login/';
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json'
          }
      }
      // options.headers = Object.assign(options.headers,{
      //     uuid: io_data.uuid,
      // })
  
      options.body = JSON.stringify({
        "merchant_id": merchantId,
          "username":username,
          "password":password,
          "version":"v0.1"
      })
  
      console.log(options)
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     }
  }
  