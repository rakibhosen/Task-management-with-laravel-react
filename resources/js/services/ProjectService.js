import Axios from "axios";

export const projectList= async()=>{
   return await Axios.get("http://localhost/laratask/api/projects").then((res)=>{
    return res.data;
   });
}

export const  storeNewProject = async (data)=>{
    data.user_id=1;
   return await Axios.post("http://localhost/laratask/api/projects",data).then((res)=>{
      
   return res.data;
       });
    };

export const  updateProject = async (data)=>{
    data.user_id = 1;
    return await Axios.put(
    `http://localhost/laratask/api/projects/${data.id}`,
    data
    ).then((res)=>{

    return res.data;
});
};

export const  deleteProject = async (id)=>{

    return await Axios.delete(
    `http://localhost/laratask/api/projects/${id}`,
    ).then((res)=>{
    return res.data;

    });
}
        
    
