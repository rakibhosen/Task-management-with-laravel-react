import React from 'react';
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import { RegisterUser } from '../../../services/AuthService';

class Register extends React.Component{

  state={
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
    isLoading:false,
    errors:{},
    validated:false,
  };

  componentDidMount(){}
changeInput = (e) =>{
    this.setState({
       
           [e.target.name] : e.target.value,
       
    });
};

formSubmit = async (e)=>{
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
    this.setState({validated:true});
 

    const postBody={
      name        : this.state.name,
      email : this.state.email,
      password : this.state.password,
      password_confirmation : this.state.password_confirmation,

    };

    if(form.checkValidity() !== false){ 
      event.preventDefault();
        this.setState({isLoading:true});

        const response = await RegisterUser(postBody);
        console.log(response);
        if(response.success){
          
          this.setState({
             name:"",
             email:"",
             password:"",
              isLoading:false,
              errors:{},
          });
          localStorage.setItem("loginData", JSON.stringify(response));
         

        }else{
         console.log(response);
          this.setState({
            errors:response.errors,
            isLoading:false,
          });
        }
    }

   

  }
  

  render(){
    return(
      <>

                   

  <Card>
<h2 className="alert alert-primary text-center">Sign Up</h2>
      <Card.Body>
          
<Form noValidate validated={this.state.validated} onSubmit={this.formSubmit}>

  <div className="row">
      <div className="col-md-6">

  <Form.Group controlId="name">
    <Form.Label></Form.Label>
    <Form.Control
     type="text" 
     placeholder="Your name"
     name="name"
     onChange={(e)=>this.changeInput(e)}
     required
     />
      <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
       { this.state.errors && this.state.errors.name &&(
      <p className="text-danger">{this.state.errors.name[0]}</p>
      )
      }
  </Form.Group>



<Form.Group controlId="name">
    <Form.Label></Form.Label>
    <Form.Control
     type="email" 
     placeholder="Your Email"
     name="email"
     onChange={(e)=>this.changeInput(e)}
     required
     />
      <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
       { this.state.errors && this.state.errors.email &&(
    <p className="text-danger">{this.state.errors.email[0]}</p>
  )
  }
  </Form.Group>

      </div>
      <div className="col-md-6">
      <Form.Group controlId="name">
    <Form.Label></Form.Label>
    <Form.Control
     type="text" 
     placeholder="Enter Password"
     name="password"
     onChange={(e)=>this.changeInput(e)}
     required
     />
      <Form.Control.Feedback type="invalid">
              Please choose a Password.
            </Form.Control.Feedback>
       { this.state.errors && this.state.errors.password &&(
    <p className="text-danger">{this.state.errors.password[0]}</p>
  )
  }
  </Form.Group>


<Form.Group controlId="name">
    <Form.Label></Form.Label>
    <Form.Control
     type="text" 
     placeholder="Confirmed Password"
     name="password_confirmation"
     onChange={(e)=>this.changeInput(e)}
     required
     />
       { this.state.errors && this.state.errors.password_confirmation &&(
    <p className="text-danger">{this.state.errors.password_confirmation[0]}</p>
  )
  }
  </Form.Group>

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


export default withRouter(Register);

