import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//created a functional react component
//dont have state and life cycle methods in functional components
//accepting props that were passed onto it
//creates table with data
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

//create a class component
export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};

    }
    //getting list of exercises from db

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data})//getting all the date
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000.exercises/'+id)
            .then(res => console.log(res.data));//deleting exercise in db

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)//_id is automatically create in mongodb
        })//deletes the exercise from the page
    }
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })//for every element in the exercise array, it will return a component
      }

    render () {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
                </table>
            </div>
        )
    }
}