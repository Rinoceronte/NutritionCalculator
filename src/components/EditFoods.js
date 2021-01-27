import React, {Component, Copmponent} from 'react';
import Food from './Food.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EditFoods extends Component{
    constructor(){
        super();

        this.state = {
            foods: [
                // {id: 1, food: 'Chicken', calories: 120, protein: 36, carbohydrates: 10, fats: 6, serving: '4oz'},
                // {id: 2, food: 'Rice', calories: 230, protein: 8, carbohydrates: 40, fats: 2, serving: '1 cup'}
            ],
            lastId: 2
        }

        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    componentDidMount(){
        axios.get('/api/foods').then( response => {
            this.setState({
                foods: response.data
            });
        });
    }

    edit(id, food){
        axios.put(`/api/foods/${id}`, {food}).then(response => {
            this.setState({
                foods: response.data
            });
        });
    }

    delete(id){
        // let copyFoods = this.state.foods.slice(0);
        // let index = copyFoods.findIndex(f => f.id == id);
        // copyFoods.splice(index, 1);
        // this.setState({
        //     foods: copyFoods
        // });
        axios.delete(`/api/foods/${id}`).then(response => {
            this.setState({foods: response.data});
        });
    }

    addRow(e)
    {
        e.preventDefault();
        // let nextId = this.state.lastId+1;
        // this.setState({
        //     foods: [...this.state.foods, {id: nextId, food: '', calories: 0, protein: 0, carbohydrates: 0, fats: 0, serving: ''}], lastId: nextId
        // });
        axios.post('/api/foods', {id: -1, food: '', calories: 0, protein: 0, carbohydrates: 0, fats: 0, serving: ''}).then( response => {
            this.setState({foods: response.data});
        });
        
    }

    render(){
        let mappedFoods = this.state.foods.map((f, i) => <Food info={f} key={i} edit={this.edit} delete={this.delete}/>)
        return (
            <div className="edit">
                <Link to='/'>Home</Link>
                <div className="foodrow-info">
                    <h2>FOOD</h2>
                    <h2>CALORIES</h2>
                    <h2>PROTEIN</h2>
                    <h2>CARBOHYDRATES</h2>
                    <h2>FATS</h2>
                    <h2>SERVING</h2>
                    <h2>CATEGORY</h2>
                </div>
                {mappedFoods}
                <button id="new-food" onClick={this.addRow}>ADD NEW FOOD</button>
            </div>
        )
    }
}

export default EditFoods;