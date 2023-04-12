import { Route } from "react-router-dom";
import "./App.css";
import CardDetails from "./components/carDetails";
import Form from "./components/form";
import Home from "./components/home";
import Landing from "./components/landing";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/recipe" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/recipe/:id" component={CardDetails} />
    </div>
  );
}

export default App;
