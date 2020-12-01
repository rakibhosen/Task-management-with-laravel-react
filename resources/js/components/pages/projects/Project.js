import React from 'react';
import { Card, Button, Badge, Spinner, Form, InputGroup, FormControl } from "react-bootstrap";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import { deleteProject, projectList } from '../../../services/ProjectService';

class Project extends React.Component{

  state={
    projectList:[],
    searchProjectList:[],
    isLoading:false,
  };

  componentDidMount(){
this.getProjectList();
  }

// getProjectList=()=>{
//   this.setState({
//     isLoading:true,
//   })
//   Axios.get("http://localhost/laratask/api/projects").then((res)=>{
//     const projectList = res.data.data;
//     this.setState({
//       projectList,
//       isLoading:false
//     })
//    });
// }

getProjectList = async()=>{
  const response = await projectList();
  if(response.success){
    this.setState({
      projectList:response.data,
      searchProjectList:response.data,
      isLoading:false
    });
  }else{
    this.setState({
      isLoading:false
    });
  }
}

projectDelete = async(id)=>{
  const response = await deleteProject(id);
  if(response.success){
    console.log(response)
  }else{
    alert('error');
  }
  console.log(response);
  
  this.getProjectList();
}

onSearchProject =(e)=>{
    const searchText = e.target.value;
    this.setState({
      isLoading:true
    });
    if(searchText.length > 0){
      const searchData = this.state.projectList.filter(function(item){
        const itemData =item.name + ' '+ item.description;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData)!==-1;
      }); 
      console.log(searchData);
      this.setState({
        searchProjectList:searchData,
        isLoading:false
      });
    }else{
      this.getProjectList();
    };

}

  render(){

    return(
      <>
      <div className="project-header">

        <div className="float-left ml-2">
        <h2>Project List <Badge variant="info">{this.state.searchProjectList.length}</Badge></h2>

        </div>
        <div className="float-left ml-2">
        <InputGroup className="mb-3">
            <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e)=>this.onSearchProject(e)}
        />

      </InputGroup>
        </div>

        <div className="float-right">
        <Link to={`${PUBLIC_URL}projects/create`} className="btn btn-success">
                    + Create Project
          </Link>
        </div>
      </div>
      <div className="clearfix"></div>
                   
    
      {this.state.isLoading && 
      <Spinner animation="border" role="status">
       <span className="sr-only">Loading...</span>
       </Spinner>
    }
      {
        this.state.searchProjectList.map((project,index)=>(
          <Card className="mt-2" key={index}>
          <Card.Header>{project.name} <Badge variant="success">{project.tasks_count}</Badge></Card.Header>
          <Card.Body>
        
            <Card.Text>
             {project.description}
            </Card.Text>
        

             <Link to={`${PUBLIC_URL}projects/view/${project.id}`}
             className="btn btn-primary "> 
              View
             </Link>
  
            <Button variant="success" className="ml-1">Edit</Button>
            <Button variant="danger" className="ml-1" onClick = {()=>this.projectDelete(project.id)}>Delete</Button>
          </Card.Body>
        </Card>
        ))
      }

        
         </>
    );
  }
}



export default Project;