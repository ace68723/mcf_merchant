import HomeAPI from './HomeAPI';

export default  {
  async getCompanyInfo() {
    try {
      const companyInfo = await HomeAPI.getCompanyInfo();
      if(companyInfo.ev_error == "0" ){
        const eo_data = companyInfo.ev_data;
         return eo_data
      }else{
        const errorMessage = companyInfo.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      const errorMessage = 'error123';
      throw errorMessage
    }

  }
}
