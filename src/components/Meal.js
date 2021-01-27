import React, {Component} from 'react';

function Meal(props) {
    let foods = props.foods.map((f, i) => <li key={i}>{f.food}</li>);
    return (
      <section className="meal">
        <h1>{String(props.time).toUpperCase()}</h1>
        <ul>
            {foods}
        </ul>
      </section>
    );
  }
  
  export default Meal;