'use strict'
import ScanQRCodeAPI from './ScanQRCodeAPI';
import DeviceInfo from 'react-native-device-info';

export default  {
  async createAuthpay(token,channel, totalAmount, outTradeNo, authCode){
    try {
      const vendor_channel = channel;
      const total_fee_in_cent = parseInt(totalAmount*100,10);
      const total_fee_currency = "CAD";
      const out_trade_no = outTradeNo;
      const device_id = DeviceInfo.getSerialNumber();
      const auth_code = authCode;
      // alert('createAuthpay',total_fee_in_cent)
      const reqData = {
                       vendor_channel,
                       total_fee_in_cent,
                       total_fee_currency,
                       out_trade_no,
                       device_id,
                       auth_code,
                     }
      const payInfo = await ScanQRCodeAPI.createAuthpay(token,reqData);

      if(payInfo.ev_error === 0 ){
         const eo_data =payInfo.ev_data;
         return eo_data
      }else{
        const errorMessage = payInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error;
      throw errorMessage
    }

  },
  async checkOrderStatus(token,iv_channel,iv_outTradeNo){
    try {
      const result = await ScanQRCodeAPI.checkOrderStatus(token,iv_channel,iv_outTradeNo);
      console.log(result);
      if(result.ev_error === 0 ){
         const {ev_data} = result;

         const merchantName = ev_data.merchant_name;
         const merchantAddress = ev_data.address;
         const merchantPhoneNumber = ev_data.cell;
         const refId = ev_data.ref_id;
         const time = ev_data.time;
         const channel = ev_data.vendor_channel;
         const rate = ev_data.exchange_rate;
         const totalAmount = (+(ev_data.amount_in_cent))/100;
         const CNYamount = (+(ev_data.paid_fee_in_cent))/100
         const status = ev_data.status;
         const eo_data = {
            merchantName,
            merchantAddress,
            merchantPhoneNumber,
            refId,
            time,
            channel,
            rate,
            totalAmount,
            CNYamount,
            status,
         };
         console.log(eo_data);
         return eo_data;
      }else{
        const errorMessage = 'Pay failed. Please try agian';
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
}
