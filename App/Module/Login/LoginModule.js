import LoginAPI from './LoginAPI';

export default  {
  async login(merchantId, username, password){
    try {
      const userInfo = await LoginAPI.login(merchantId, username, password);
      if(userInfo.ev_error === 0 ){
        const eo_data ={
           role:userInfo.role,
           token:userInfo.token
         }
         return eo_data
      }else{
        const errorMessage = userInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  }
}
