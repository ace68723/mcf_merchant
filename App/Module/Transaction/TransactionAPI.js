export default  {
  getHistoryTransaction(token,timeZone,startTime,pageNum,endTime,pageSize){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/query_txns_by_time/';

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Auth-Token': token,
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

  getTodayTransaction(token,pageNum,pageSize){
    const url = 'https://mcfpayapi.ca/api/v1/merchant/get_hot_txns/';
    console.log(url);

    let options = {
        method: 'POST',
        mode:'cors',
        headers: {
          'Auth-Token': token,
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
