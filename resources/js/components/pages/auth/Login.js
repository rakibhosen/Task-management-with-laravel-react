import React from 'react';
import { Card, Button, Badge, Spinner, Form, Alert } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constant';
import { LoginUser } from '../../../services/AuthService';

class Login extends React.Component{

  state={
 
    email:'',
    password:'',
    isLoading:false,
    errors:{},
    validated:false,
    errorMessage:''
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

      email : this.state.email,
      password : this.state.password,

    };

    if(form.checkValidity() !== false){ 
      event.preventDefault();
        this.setState({isLoading:true});

        const response = await LoginUser(postBody);
        console.log(response);
        if(response.success){
          this.setState({
          
             email:"",
             password:"",
              isLoading:false,
              errors:{},
          });
          localStorage.setItem("loginData", JSON.stringify(response));
          this.props.history.replace(`${PUBLIC_URL}projects`);
        }else{
         console.log(response);
          this.setState({
            errors:response.errors,
            isLoading:false,
            errorMessage:response.message,
          });
        }
    }

   

  }
  

  render(){
    return(
      <>

<div className="row">
     <div className="col-md-8 mx-auto">               

  <Card>
<h2 className="alert alert-primary text-center">Sign Up</h2>
      <Card.Body>
      { this.state.errorMessage.length>0 &&(
    <Alert variant="danger">{this.state.errorMessage}</Alert>
  )
  }
          
<Form noValidate validated={this.state.validated} onSubmit={this.formSubmit}>

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
      
</div>
</div>
         
         </>
    );
  }
}


export default withRouter(Login);

