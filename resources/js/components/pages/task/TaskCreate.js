import React from 'react';
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import { storeNewTask } from '../../../services/TaskService';


class TaskCreate extends React.Component{

  state={
   name:'',
   description:'',
    isLoading:false,
    errors:{}
  };

  componentDidMount(){}
changeInput = (e) =>{
    this.setState({
       
           [e.target.name] : e.target.value,
       
    });
};

formSubmit = async (e)=>{
    e.preventDefault();
    const {history} = this.props;

    this.setState({isLoading:true});

    const postBody={
      name        : this.state.name,
      description : this.state.description,
      project_id : this.props.project_id,
    }
   const response = await storeNewTask(postBody);
    
   if(response.success){
     console.log("response",response)
     this.setState({
      name:"",
      description:"",
      isLoading:false,
     });
this.props.onCompleteTaskCreate(response.data);

   
   }else{
     this.setState({
       errors:response.errors,
       isLoading:false,
     });
   }
   

  }
  

  render(){
    return(
      <>        
  <Card>
    
      <Card.Body>
      <h2>New Task</h2>
          
<Form onSubmit={this.formSubmit}>
  <div className="row">
   <div className="col-6">
   <Form.Group controlId="name">
    <Form.Label>Task Name</Form.Label>
    <Form.Control
     type="text" 
     placeholder="Task Name"
     name="name"
  
     onChange={(e)=>this.changeInput(e)}
     />
  </Form.Group>
  { this.state.errors && this.state.errors.name &&(
    <p className="alert alert-danger">{this.state.errors.name[0]}</p>
  )
  }
   </div>
   <div className="col-6">
   <Form.Group controlId="description">
    <Form.Label>Description</Form.Label>
    <Form.Control
     type="text"
     name="description"
      placeholder="Task description"
       as="textarea" 
       onChange={(e)=>this.changeInput(e)}
       />

  </Form.Group>
    { this.state.errors && this.state.errors.description &&(
      <p className="alert alert-danger">{this.state.errors.description[0]}</p>
    )
    }
   </div>
  </div>


  {this.state.isLoading && (
  <Button variant="primary" type="submit" disabled>
    Saving  
    <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
  </Button>
      )}

{!this.state.isLoading && (
  <Button variant="primary" type="submit">
    Save
  </Button>
      )}
</Form>

      </Card.Body>
    </Card>  
      

         
         </>
    );
  }
}

// function Project() {
//     return(
//             <>
//          <Card>
//           <Card.Header>Project <Badge variant="success">10</Badge></Card.Header>
//           <Card.Body>
//             <Card.Title>Special title treatment</Card.Title>
//             <Card.Text>
//               With supporting text below as a natural lead-in to additional content.
//             </Card.Text>
//             <Button variant="primary">View</Button>
//             <Button variant="success" className="ml-1">Edit</Button>
//             <Button variant="danger" className="ml-1">Delete</Button>
//           </Card.Body>
//         </Card>
            
//             </>
//         );
//   };

export default withRouter(TaskCreate);