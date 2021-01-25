import React, {Component} from 'react';
import Day from './Day.js';
import {Link} from 'react-router-dom';

class Nutrition extends Component{
    constructor(){
        super();

        this.state={
            days: 1,
            meals: {
                day1: {
                    breakfast: ['Eggs', 'Bacon'],
                    snack1: ['Shake'],
                    lunch: ['Spaghetti', 'Cheese'],
                    snack2: ['Protein Bar', 'Banana'],
                    dinner: ['Oranges', 'More food']
                },
                day2: {
                    breakfast: ['pancakes', 'Bacon'],
                    snack1: ['Shake'],
                    lunch: ['chicken', 'Cheese'],
                    snack2: ['Protein Bar', 'Banana'],
                    dinner: ['Oranges', 'More food']
                }
            }
        }

    }

    render(){
        let daysArray = [];
        for(let d in this.state.meals)
        {
            daysArray.push(this.state.meals[d]);
        }
        let mappedDays = daysArray.map((d, i) => <Day key={i} meals={d} />)
        return (
            <div className="calendar">
                <Link to='/foods'>Edit Foods</Link>
               {mappedDays}
            </div>
        )
    }
}

export default Nutrition;