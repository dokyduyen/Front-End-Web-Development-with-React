import React, {Component} from 'react';
import {Button, Row, Label, Input, Col, FormFeedback, Breadcrumb, BreadcrumbItem
} from 'reactstrap'; 
import {Link} from 'react-router-dom';
class Contact extends  Component{
    constructor(props){
        super(props)
        this.state ={
            firstname:'',
            lastname:'',
            email:'',
            telnum:'',
            agree: false,
            contactType: 'Tel.',
            message:'',
            touched:{
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        console.log(event);
        console.log("Current State is: "+ JSON.stringify(this.state));
        alert("Current State is: "+ JSON.stringify(this.state));
        event.preventDefault();
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched:{...this.state.touched, [field]: true}
        })
    }
    validate(firstname, lastname, telnum, email){
        const errors = {
            firstname: '',
            lastname:'',
            telnum:'',
            email:''
        }
        if(this.state.touched.firstname && firstname.length < 3){
            errors.firstname = "First Name should be >= 3 character";
        }
        else if (this.state.touched.firstname && firstname.length > 10){
            errors.firstname = "First Name should be <= 10 character";
        }

        if(this.state.touched.lastname && lastname.length < 3){
            errors.lastname = "Last Name should be >= 3 character";
        }
        else if (this.state.touched.lastname && lastname.length > 10){
            errors.lastname = "Last Name should be <= 10 character";
        }
        const reg = /^\d+$/;
        if(this.state.touched.telnum && !reg.test(telnum)){
            errors.telnum = "Tel. Number should contain only numbers";
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const value = email.trim().toLowerCase();
        if(this.state.touched.email && !re.test(value)){
            errors.email = "Format of Email not right";
        }
        return errors;
    }
    render(){
        const errors = this.validate(this.state.firstname,this.state.lastname, this.state.telnum, this.state.email);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <form onSubmit={this.handleSubmit} id="create-course-form">
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname" placeholder="First Name"
                                    value={this.state.firstname}
                                    valid={this.state.touched.firstname && errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur = {this.handleBlur('firstname')}
                                    onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname" placeholder="Last Name"
                                    value={this.state.lastname}
                                    valid={this.state.touched.lastname && errors.lastname === ''}
                                    invalid={errors.lastname !== ''}
                                    onBlur = {this.handleBlur('lastname')}
                                    onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum" placeholder="Tel. Numner"
                                    value={this.state.telnum}
                                    valid={this.state.touched.telnum && errors.telnum === ''}
                                    invalid={errors.telnum !== ''}
                                    onBlur = {this.handleBlur('telnum')}
                                    onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email"
                                    value={this.state.email}
                                    valid={this.state.touched.email && errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur = {this.handleBlur('email')}
                                    onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6, offset: 2}}>
                                    <Row check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange}/> {''}
                                            <strong>May be you contact with us?</strong>
                                        </Label>
                                    </Row>
                                </Col>
                                <Col md={{size:3, offset: 1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" placeholder="Feedback"
                                    value={this.state.message} rows="12"
                                    onChange={this.handleInputChange}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;