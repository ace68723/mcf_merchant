export default  {
    getCompanyInfo(){
      const url = 'https://mcfpayapi.ca/api/v1/merchant/get_company_info/';
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
        return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {throw error})
     }
  }
  