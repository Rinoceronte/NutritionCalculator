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
        this.changeDays = this.changeDays.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/foods/${this.state.days}`).then(response => {
            this.setState({
                meals: response.data
            });
        }).catch(err => console.log(err));

        // console.log("here first?")
        axios.get('/api/goals').then(response => {
            this.setState({
                goals: response.data
            });
        }).catch(err => console.log(err));
    }

    changeDays(val){
        this.setState({
            days: val
        })
    }

    updateGoals(goals){  
        axios.put('/api/goals', {goals}).then(response => {
            this.setState({
                goals: response.data
            });
        }).catch(err => console.log(err));
    }

    updateDays(){
            axios.get(`/api/foods/${this.state.days}`).then(response => {
                this.setState({
                    meals: response.data
                });
            }).catch(err => console.log(err));  
    }

    render(){
        let mappedDays = this.state.meals.map((d, i) => <Day key={i} meals={d} day={`day ${i+1}`}/>)
        return (
            <div className="calendar">
                <div className="days">
                    <header></header>
                    {mappedDays}
                </div>
                <div className="goals">
                    <Goals update={this.updateGoals} goals={this.state.goals}/>
                    <Link to='/foods'>Edit Foods</Link><br />
                    <label>Days: </label><input type="number" id="numberofdays" min="1" max="7" onChange={e => this.changeDays(e.target.value)} value={this.state.days}/><button onClick={this.updateDays}>Go</button>
                </div>
            </div>
        )
    }
}

export default Nutrition;