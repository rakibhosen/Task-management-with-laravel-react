import React from 'react';
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import { storeNewProject } from '../../../services/ProjectService';

class ProjectCreate extends React.Component{

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
    }
   const response = await storeNewProject(postBody);
    
   if(response.success){
     this.setState({
      name:"",
      description:"",
      isLoading:false,
     });
     history.push(`${PUBLIC_URL}projects`);
   
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
      <div className="project-header">
        <div className="float-left">
        <h2><Badge variant="info"> Create Project</Badge></h2>
        </div>

        <div className="float-right">
        {/* <a  className="btn btn-info"> <Link to={`${PublicURL}`}>+ Create Project </Link></a> */}
        <Link to={`${PUBLIC_URL}projects`} className="btn btn-success">
                    Project List
          </Link>

        </div>
      </div>
      <div className="clearfix"></div>
                   

  <Card>
      <Card.Body>
          
<Form onSubmit={this.formSubmit}>

  
  <Form.Group controlId="name">
    <Form.Label></Form.Label>
    <Form.Control
     type="text" 
     placeholder="Project Name"
     name="name"
  
     onChange={(e)=>this.changeInput(e)}
     />
  </Form.Group>
  { this.state.errors && this.state.errors.name &&(
    <p className="alert alert-danger">{this.state.errors.name[0]}</p>
  )
  }

  <Form.Group controlId="description">
    <Form.Label>Description</Form.Label>
    <Form.Control
     type="text"
     name="description"
      placeholder="Project description"
       as="textarea" 
       onChange={(e)=>this.changeInput(e)}
       />

  </Form.Group>
    { this.state.errors && this.state.errors.description &&(
      <p className="alert alert-danger">{this.state.errors.description[0]}</p>
    )
    }

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

export default withRouter(ProjectCreate);