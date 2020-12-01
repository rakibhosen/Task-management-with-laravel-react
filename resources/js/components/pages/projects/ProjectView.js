import React from 'react';
import { Card, Button, Badge, Spinner, Form, FormControl, InputGroup } from "react-bootstrap";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import TaskCreate from '../task/TaskCreate';
import TaskList from '../task/TaskList';
import ProjectEdit from './ProjectEdit';

class ProjectView extends React.Component{

  state={
    project:{},
    taskList:[],
    searchTaskList:[],
    isLoading:false,
    toggleAddTask:false,
    toggleEditProject:false,
    searchText:"",
  };

  componentDidMount(){
  
this.getProjectDetails();
  }

getProjectDetails=()=>{
  this.setState({
    isLoading:true,
  })
  Axios.get(`http://localhost/laratask/api/projects/${this.props.match.params.id}`
  ).then((res)=>{
    
    this.setState({
      taskList:res.data.data.tasks,
    searchTaskList:res.data.data.tasks,
      project:res.data.data,
      isLoading:false,
      
    });
   });
};

toggleAddTask = ()=>{
  this.setState({
 toggleAddTask:!this.state.toggleAddTask,
 toggleEditProject:false,
  })
}

toggleEditProject = ()=>{
  this.setState({
 toggleEditProject:!this.state.toggleEditProject,
 toggleAddProject:false,
  })
}
onCompleteTaskCreate = (task)=>{
  this.toggleAddTask();
  let tasks = this.state.taskList;
  tasks.unshift(task);
  this.setState({
    taskList:tasks,
    searchTaskList:tasks,
  });
};

  onCompleteProjectEdit = (project)=>{
       this.getProjectDetails();
       this.toggleEditProject();

};
onEditTask = (project)=>{
  this.getProjectDetails();
};

onSearchTask =(e)=>{
  const searchText = e.target.value;
  this.setState({
    isLoading:true
  });
  if(searchText.length > 0){
    const searchData = this.state.taskList.filter(function (item) {
      const itemData = item.name + ' '+ item.description;
      const textData = searchText.trim().toLowerCase();
      return itemData.trim().toLowerCase().indexOf(textData)!==-1;
    }); 

    this.setState({
      searchTaskList:searchData,
      isLoading:false,
      searchText:searchText,
      isLoading:false,
    });
  }else{
    this.setState({

      searchText,

    });
   this.getProjectDetails();
  };

}

  render(){


    return(
      <>
      <div className="project-header">
        <div className="float-left">
        <Badge 
            className={`btn btn-${
              this.state.project.status===1? "success" : "warning"
            } mr-2`} disabled>

            {this.state.project.status ===1 && (
              <span className="">Completed</span>
            )}
            {this.state.project.status ==0 && (
              <span className="">Pending</span>
            )}
        </Badge>
        <h2> 
          {this.state.project.name}
        <Badge variant="primary">{this.state.searchTaskList.length}</Badge> </h2>
        <p>{this.state.project.description}</p>
         
          {this.state.toggleEditProject &&(
         <>
             <ProjectEdit project={this.state.project}   onCompleteProjectEdit = { this.onCompleteProjectEdit }/>
        </>
        )}
         
        </div>
        <div className="float-left">
        <InputGroup className="mb-3">
            <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e)=>this.onSearchTask(e)}
        />

      </InputGroup>
        </div>
        <div className="float-right">
        <Button 
          className="btn btn-success mr-2" 
          onClick ={()=>this.toggleEditProject()}>
           {this.state.toggleEditProject && (
             <span>Cancle Editing</span>
           )}
            {!this.state.toggleEditProject && (
             <span>Edit Task</span>
           )}
        </Button>

          <Button 
            className="btn btn-info mr-2" 
            onClick ={()=>this.toggleAddTask()}>
            {this.state.toggleAddTask && (
              <span>Cancle</span>
            )}
              {!this.state.toggleAddTask && (
              <span>+Add Task</span>
            )}
          </Button>

        </div>
      </div>
      <div className="clearfix"></div>

    {this.state.toggleAddTask &&(
      <TaskCreate project_id={this.props.match.params.id} onCompleteTaskCreate={this.onCompleteTaskCreate} />
    )}

    {this.state.isLoading && 
      <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
    }

    <TaskList taskList={this.state.searchTaskList} onEditTask={this.onEditTask} />
      </>
    );
  }
}



export default ProjectView;