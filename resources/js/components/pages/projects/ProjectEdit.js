import React from 'react';
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import { updateProject } from '../../../services/ProjectService';

class ProjectEdit extends React.Component{

  state={
    id: this.props.project.id,
    name: this.props.project.name,
    description: this.props.project.description,
    status: this.props.project.status,
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
        id :this.state.id,
        name: this.state.name,
        description : this.state.description, 
        status :this.state.status,
    };
   const response = await updateProject(postBody);
   if(response.success){
     this.setState({
      name:"",
      description:"",
      isLoading:false,
     });
    
     console.log(response)
     this.props.onCompleteProjectEdit();
    //  history.push(`$(PUBLIC_URL)projects`);
   
   }else{
    console.log(response)
     this.setState({
       errors:response.errors,
       isLoading:false,
     });
   }
   

  }
  

  render(){
    return(
      <>

      <div className="clearfix"></div>
                   

  <Card>
      <Card.Body>
          
          
<Form onSubmit={this.formSubmit}>

    <div className="row">
        <div className ="col-md-6">
        <Form.Group controlId="name">
            <Form.Label>Project Name</Form.Label>
    <Form.Control
     type="text" 
     name="name"
     value={this.state.name}
     onChange={(e)=>this.changeInput(e)}
     />
  </Form.Group>
  
  { this.state.errors && this.state.errors.name &&(
    <p className="alert alert-danger">{this.state.errors.name[0]}</p>
  )
  }

<Form.Group>
 <Form.Label>Project Name</Form.Label>
<Form.Control
as="select"
value="Complete Status"
name="status"
onChange={(e)=>this.changeInput(e)}
value={this.state.status}
>
    <option value={0} >Pending</option>
    <option value={1} >Completed</option>

</Form.Control>
</Form.Group>
      </div>

        <div className ="col-md-6">
        <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
    <Form.Control
     type="text"
     name="description"
     value={this.state.description}
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
  <Button variant="primary" type="submit" className="float-right" disabled>
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

export default withRouter(ProjectEdit);