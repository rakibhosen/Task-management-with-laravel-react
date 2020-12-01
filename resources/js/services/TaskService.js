import Axios from "axios";

export const getProjectList=()=>{

}

export const storeNewTask = async (data)=>{
data.project_id = parseInt(data.project_id);
   return await Axios.post("http://localhost/laratask/api/tasks",data).then((res)=>{
      
   return res.data;
       });
    };

    export const  updateTask = async (data)=>{
     return await Axios.put(
         `http://localhost/laratask/api/tasks/${data.id}`,
         data
         ).then((res)=>{
        
     return res.data;
         });
      };

      export const  deleteTask = async (id)=>{

        return await Axios.delete(
        `http://localhost/laratask/api/tasks/${id}`,
        ).then((res)=>{
        return res.data;
    
        });
    };
    
