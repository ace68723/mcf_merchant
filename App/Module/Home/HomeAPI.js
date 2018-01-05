export default  {
    getCompanyInfo(token){
      const url = 'https://mcfpayapi.ca/api/v1/merchant/get_company_info/';
      let options = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Token': token
        }
    }
      // options.headers = Object.assign(options.headers,{
      //     uuid: io_data.uuid,
      // })
        return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {throw error})
     }
  }
  