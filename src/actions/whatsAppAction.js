import axios from "axios";

 


 export const sendWhatsApp_message = (tempOBJ) => async (dispatch) => {
  console.log(tempOBJ);
     try {
        await axios.post(
        `https://schooloil-api.onrender.com/api/v1/user/sendUpadate`,
        {tempOBJ}

        
      );
   
     } catch (error) {
      console.log(error)
    }
  };

 export const genrateOTP_email = (localData) => async (dispatch) => {
      try {
      const {data}=   await axios.post(
        `https://schooloil-api.onrender.com/api/v1/user/gerateOTP/email`,localData
      );

      return data
   
     } catch (error) {
       console.log(error)
       return error
    }
  };
 export const genrateOTP_mobile = (localData) => async (dispatch) => {
      try {
        await axios.post(
        `https://schooloil-api.onrender.com/api/v1/user/genrateOTP/mobile`,localData
      );
   
     } catch (error) {
      console.log(error)
    }
  };

