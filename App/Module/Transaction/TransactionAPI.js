export default  {
  getHistoryTransaction(timeZone,startTime,pageNum,endTime,pageSize){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/query_txns_by_time/';

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
      'end_time':endTime,
      'page_num':pageNum,
      'page_size':pageSize,
      'start_time':startTime,
      'timezone':timeZone
    })

console.log(options);
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {throw error})

  },

  getTodayTransaction(pageNum,pageSize){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/get_hot_txns/';
    console.log(url);

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
      "page_num":pageNum,
	    "page_size":pageSize
    })

    console.log(options);

    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {throw error})

  }
}
