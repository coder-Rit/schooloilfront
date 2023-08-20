import axios from "axios";
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const token = cookies.get('token')
 


 export const sendWhatsApp_message = (tempOBJ) => async (dispatch) => {
  console.log(tempOBJ);
     try {
        await axios.post(
        `/api/v1/user/sendUpadate`,
        {tempOBJ}

        
      );
   
     } catch (error) {
      console.log(error)
    }
  };

 export const genrateOTP_email = (localData) => async (dispatch) => {
      try {
      const {data}=   await axios.post(
        `/api/v1/user/gerateOTP/email`,localData
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
        `/api/v1/user/genrateOTP/mobile`,localData
      );
   
     } catch (error) {
      console.log(error)
    }
  };

