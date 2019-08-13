import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
const StudentMarks = lazy(() => import("./component/studentMarks"));
const StudentDetails = lazy(() => import("./component/student"));
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Switch>
          <Route exact path="/" component={StudentDetails} />
          <Route exact strict path="/:id" component={StudentMarks} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
