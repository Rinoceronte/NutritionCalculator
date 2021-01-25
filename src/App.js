import './App.css';
import Nutrition from './components/Nutrition.js';
import EditFoods from './components/EditFoods.js';
import { Router, Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Nutrition} />
      <Route path="/foods" component={EditFoods} /> 
    </div>
  );
}

export default App;
