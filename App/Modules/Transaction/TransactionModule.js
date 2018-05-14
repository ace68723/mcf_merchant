import TransactionAPI from './TransactionAPI';

export default  {
  async getTodayTransaction(token,pageNum,pageSize){
    try {
      const todayTransactionInfo = await TransactionAPI.getTodayTransaction(token,pageNum,pageSize);
      console.log(todayTransactionInfo)
      if(todayTransactionInfo.ev_error == "0" ){
        const eo_data =todayTransactionInfo.ev_data;
        orderList = eo_data.recs
        orderList.map((orderData) => {
          orderData.amount_in_cent = parseInt(orderData.amount_in_cent,10);
          orderData.amount_in_cent = orderData.amount_in_cent/100;
          if (orderData.is_refund) {
            orderData.amount_in_cent = '-'+ orderData.amount_in_cent;
          } else {
            orderData.amount_in_cent = '+'+ orderData.amount_in_cent;

          }
       });
         return orderList
      }else{
        const errorMessage = todayTransactionInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },

  async getHistoryTransaction(token,startTime,pageNum,endTime,pageSize){
    try {
      const timeZone = 'America/Toronto';
      const historyTransactionInfo = await TransactionAPI.getHistoryTransaction(token,timeZone,startTime,pageNum,endTime,pageSize);
      console.log(historyTransactionInfo)
      if(historyTransactionInfo.ev_error == "0" ){
        const eo_data =historyTransactionInfo.ev_data;
        orderList = eo_data.recs
        orderList.map((orderData) => {
          orderData.amount_in_cent = parseInt(orderData.amount_in_cent,10);
          orderData.amount_in_cent = orderData.amount_in_cent/100;
          if (orderData.is_refund) {
            orderData.amount_in_cent = '-'+ orderData.amount_in_cent;
          } else {
            orderData.amount_in_cent = '+'+ orderData.amount_in_cent;

          }
       });
         return orderList
      }else{
        const errorMessage = historyTransactionInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async getTodaySummary(token){
    try{
      const todaySummaryInfo = await TransactionAPI.getTodaySummary(token);
      console.log(todaySummaryInfo)
      if(todaySummaryInfo.ev_error == "0"){
          const eo_data = todaySummaryInfo.ev_data
          return eo_data;
      }else{
        const errorMessage = todaySummaryInfo.ev_message;
        throw errorMessage
      }
    }
    catch (error) {
      console.log(error);
      throw error
    }
  },
  async getTransatctionById(token, order_id){
    try{
      const orderDetail = await TransactionAPI.getTransatctionById(token,order_id);
      if(orderDetail.ev_error == "0"){
          const eo_data = orderDetail.ev_data
          return eo_data;
      }else{
        const errorMessage = orderDetail.ev_message;
        throw errorMessage
      }
    }
    catch (error) {
      console.log(error);
      throw error
    }
  }
}
