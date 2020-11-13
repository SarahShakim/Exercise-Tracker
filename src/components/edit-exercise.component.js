import React, { Component } from 'react';
import axios from 'axios';//axios used to interact with the database
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//allows us to add exercises into the database

export default class EditExercise extends Component {
    constructor(props) {
        super(props);//should always start with this

        //defining 'this' to ensure that is used correctly in the program:
        this.onChangeUsername =  this.onChangeUsername.bind(this);//binding 'this' to all their respective methods
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        //state is how you create variables in react
        //when you update the state, it will automatically update it on the page
        this.state = {
            //create properties that will correspond to fields in mongo
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []//on our page, there will be a dropdown menu where u can select a user and see their exercises
        }
    }

    //react life-cycle method:
    //react will automically call it before anything is displayed on the page
    componentDidMount() {//getting id directly from url
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {//returns exercise based on id
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    data: new Date(response.data.date)//converts it into a date
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username)
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
        
    

    //updating the state:
    onChangeUsername(e) {//will create a form. when someone inputs something, it will go to this function and change the username value
        this.setState({
            username: e.target.value
        }); 
    }
    
    onChangeDescription(e) {//will create a form. when someone inputs something, it will go to this function and change the description value
        this.setState({
            description: e.target.value
        });
    }
        
    onChangeDuration(e) {//will create a form. when someone inputs something, it will go to this function and change the duration value
        this.setState({
            duration: e.target.value
        });              
    }

    onChangeDate(date) {//will create a form. when someone inputs something, it will go to this function and change the duration value
        this.setState({
            date: date
        });              
    }

    onSubmit(e) {
        e.preventDefault();//prevents normal html behaviour to occur when you hit submit
        //can create variables like in javascript if they are only going to be used within a method
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        //this will allow us to put the information entered into the mongodb database
        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';//take the person back to the homepage
    }

    render () {
        return (
            //creating the form so users can input different values
            <div>
                <h3>Edit Exercises</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {//creates drop down menu with different user options from db
                            this.state.users.map(function(user) {
                            return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker //calendar will pop-up where you can choose a date. used by installing package
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
                </div>
        )
    }
}