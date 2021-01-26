import React, {Component} from 'react';

function Meal(props) {
  console.log('meal ' + props.foods);
    let foods = props.foods.map((f, i) => <li key={i}>{f.food}</li>);
    return (
      <section className="meal">
        <h1>{props.time}</h1>
        <ul>
            {foods}
        </ul>
      </section>
    );
  }
  
  export default Meal;