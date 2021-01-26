import React, {Component} from 'react';
import Day from './Day.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Nutrition extends Component{
    constructor(){
        super();

        this.state={
            days: 1,
            meals: [
                {
                    breakfast: ['Eggs', 'Bacon'],
                    snack1: ['Shake'],
                    lunch: ['Spaghetti', 'Cheese'],
                    snack2: ['Protein Bar', 'Banana'],
                    dinner: ['Oranges', 'More food']
                },
                {
                    breakfast: ['pancakes', 'Bacon'],
                    snack1: ['Shake'],
                    lunch: ['chicken', 'Cheese'],
                    snack2: ['Protein Bar', 'Banana'],
                    dinner: ['Oranges', 'More food']
                }
            ]
        }

    }

    componentDidMount(){
        axios.get('/api/foods/4').then(response => {
            console.log(response.data);
            this.setState({
                meals: response.data
            });
        });
    }

    render(){
        let daysArray = [];
        console.log('meals');
        console.log(this.state.meals);
        // for(let d in this.state.meals)
        // {
        //     daysArray.push(this.state.meals[d]);
        // }
        let mappedDays = this.state.meals.map((d, i) => <Day key={i} meals={d} />)
        return (
            <div className="calendar">
                <Link to='/foods'>Edit Foods</Link>
               {mappedDays}
            </div>
        )
    }
}

export default Nutrition;