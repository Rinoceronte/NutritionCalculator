import React, {Component} from 'react';

function Meal(props) {
    let foods = props.foods.map((f, i) => <li key={i}>{f}</li>);
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