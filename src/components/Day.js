import React, {Component} from 'react';
import Meal from './Meal.js';

function Day(props) {
    //this.props.meals.map((meal, i) => <Meal meal={meal} key={i} />);
    let mappedDay = [];
    for(let m in props.meals)
    {
        mappedDay.push(<Meal time={m} foods={props.meals[m]} key={m}/>);
    }
    return (
      <div className="day">
        <h1>{String(props.day).toUpperCase()}</h1>
          {mappedDay}
      </div>
    );
  }
  
  export default Day;