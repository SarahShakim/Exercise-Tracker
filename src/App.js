import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

//importing all the components that we want to appear on the screen
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//where we put the code that will be displayed
function App() {
  return (
    //creating router components using <Route> element:
    //If we go to the URL with with path, it will get different routes and show different parts of the database (helps to map different url path)
    <Router>
        <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
