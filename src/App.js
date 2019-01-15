import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const studentAPI = {
  students: [
    { id: 1, name: 'John Doe', class: 'Web Dev 101' },
    { id: 2, name: 'Jane Doe', class: 'Web Dev 201' },
    { id: 3, name: 'Bob Doe', class: 'Web Dev 301' }
  ]
};

const getStudentAPIByID = id => {
  const getStudent = studentAPI.students.find(student => {
    return student.id === id;
  });
  return getStudent;
};

const Students = () => {
  const studentList = studentAPI.students.map(student => (
    <ul key={student.id} style={{ listStyleType: 'none' }}>
      <Link to={`/students/${student.id}`}>
        <li>{student.name}</li>
      </Link>
    </ul>
  ));
  return studentList;
};

const StudentProfile = props => {
  const studentID = parseInt(props.match.params.id);
  const student = getStudentAPIByID(studentID);
  if (student) {
    return (
      <ul style={{ listStyleType: 'none' }}>
        <li>ID: {student.id}</li>
        <li>Name: {student.name}</li>
        <li>Class: {student.class}</li>
      </ul>
    );
  } else {
    return <h1>Student not found...</h1>;
  }
};

const Home = () => <h1>Home</h1>;
const About = () => <h1>About Page</h1>;
const ErrorRoute = () => <h1>Sorry, page not found...</h1>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/students/:id" component={StudentProfile} />
            <Route component={ErrorRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
