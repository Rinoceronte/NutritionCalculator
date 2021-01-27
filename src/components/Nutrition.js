import React, {Component} from 'react';
import Day from './Day.js';
import Goals from './Goals.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Nutrition extends Component{
    constructor(){
        super();

        this.state={
            days: 1,
            meals: [],
            goals: {calories: 0, protein: 0, carbohydrates: 0, fats: 0}
        }

        this.updateGoals = this.updateGoals.bind(this);
        this.updateDays = this.updateDays.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/foods/${this.state.days}`).then(response => {
            this.setState({
                meals: response.data
            });
        });

        console.log("here first?")
        axios.get('/api/goals').then(response => {
            this.setState({
                goals: response.data
            });
        });
    }

    updateGoals(goals){
        
        axios.put('/api/goals', {goals}).then(response => {
            this.setState({
                goals: response.data
            });
        })
    }

    updateDays(){
        this.setState({
            days: document.getElementById("numberofdays").value
        }, () => {
            axios.get(`/api/foods/${this.state.days}`).then(response => {
                this.setState({
                    meals: response.data
                });
            });
        })     
    }

    render(){
        let mappedDays = this.state.meals.map((d, i) => <Day key={i} meals={d} day={`day ${i+1}`}/>)
        return (
            <div className="calendar">
                <div className="days">
                    {mappedDays}
                </div>
                <div className="goals">
                    <Link to='/foods'>Edit Foods</Link>
                    <Goals update={this.updateGoals} goals={this.state.goals}/>
                    <label>Days: </label><input type="number" id="numberofdays" /><button onClick={this.updateDays}>Go</button>
                </div>
            </div>
        )
    }
}

export default Nutrition;