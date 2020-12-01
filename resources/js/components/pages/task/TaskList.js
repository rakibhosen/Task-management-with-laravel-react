import React from 'react';
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { updateTask } from '../../../services/TaskService';
import { deleteTask } from '../../../services/TaskService';
class TaskList extends React.Component {
    state = {  }



    toggleCompleteStatus = async(task)=>{
      if(task.status===0){
        task.status=1;
      }else{
        task.status=0;
      }
      await updateTask(task);
      this.props.onEditTask();
    }

    taksDelete = async(id)=>{
      const response = await deleteTask(id);
      if(response.success){
        console.log(response)
      }else{
        alert('error');
      }
      console.log(response);

      this.props.onEditTask();
    }


    render() {  
        return ( 
            <>
                  {
        this.props.taskList.map((task,index)=>(
          <Card className="mt-2" key={index}>
          <Card.Body>
 <div className="float-left">

            <p>
              
              {task.status==1 && (
                <del className="text-success">
                  <strong>
                  {task.name} {" "}
                  <Badge variant="success">{task.tasks_count}</Badge>
                  </strong>
                </del>
              )}

              {task.status==0 && (
                 <span>
                  {task.name} {" "}
                  <Badge variant="success">{task.tasks_count}</Badge>
                  </span>
              )}
              </p>
              </div>
              <div className="float-right">
                <Badge 
                className={`btn btn-${
                task.status===1 ? "success" : "warning"
                } btn-sm mr-2`} onClick={()=>this.toggleCompleteStatus(task)}>

                {task.status ===1 && (
                <span className="">Completed</span>
                )}
                {task.status ==0 && (
                <span className="">Makr as Completed</span>
                )}
                </Badge>

                <Badge className="btn btn-outline-danger btn-sm ml-2" onClick={()=>this.taksDelete(task.id)}>
              Remove
                </Badge>
              </div>

            <Card.Text>
             {task.description}
            </Card.Text>
          </Card.Body>
        </Card>
        ))
      }
            </>
         );
    }
}
 
export default TaskList;