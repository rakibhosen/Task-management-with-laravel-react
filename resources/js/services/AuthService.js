import Axios from "axios";

// export const projectList= async()=>{
//    return await Axios.get("http://localhost/laratask/api/projects").then((res)=>{
//     return res.data;
//    });
// }

export const  RegisterUser = async (data)=>{

   return await Axios.post("http://localhost/laratask/api/auth/register",data).then((res)=>{
      
   return res.data;
       });
    };

    export const  LoginUser = async (data)=>{
       
       return await Axios.post("http://localhost/laratask/api/auth/login",data).then((res)=>{
          
       return res.data;
           });
        };


