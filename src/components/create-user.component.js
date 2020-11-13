import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);//should always start with this

        //defining 'this' to ensure that is used correctly in the program:
        this.onChangeUsername =  this.onChangeUsername.bind(this);//binding 'this' to all their respective methods
        this.onSubmit = this.onSubmit.bind(this);
        
        //state is how you create variables in react
        //when you update the state, it will automatically update it on the page
        this.state = {
            //create properties that will correspond to fields in mongo
            username: '',
        }
    }
    onChangeUsername(e) {//will create a form. when someone inputs something, it will go to this function and change the username value
        this.setState({
            username: e.target.value
        }); 
    }

    onSubmit(e) {
        e.preventDefault();//prevents normal html behaviour to occur when you hit submit
        //can create variables like in javascript if they are only going to be used within a method
        const user = {
            username: this.state.username
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    }

    render () {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}