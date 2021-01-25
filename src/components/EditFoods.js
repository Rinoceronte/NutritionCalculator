import React, {Component, Copmponent} from 'react';
import Food from './Food.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EditFoods extends Component{
    constructor(){
        super();

        this.state = {
            foods: [
                {id: 1, food: 'Chicken', calories: 120, protein: 36, carbohydrates: 10, fats: 6, serving: '4oz'},
                {id: 2, food: 'Rice', calories: 230, protein: 8, carbohydrates: 40, fats: 2, serving: '1 cup'}
            ],
            lastId: 2
        }

        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    edit(id, food){
        let copyFoods = this.state.foods.slice();
        copyFoods.splice(copyFoods.findIndex(f => f.id === id), 1, food);
        this.setState({
            foods: copyFoods
        });
    }

    delete(id){
        // console.log(id);
        let copyFoods = this.state.foods.slice();
        let index = copyFoods.findIndex(f => f.id == id);
        // console.log('index is: '+index);
        // console.log('WE ARE DELETING THE STUPID ITEM WHICH NAME IS: '+copyFoods[index].food);
        copyFoods.splice(index, 1);
        // console.log(copyFoods);
        this.setState({
            foods: copyFoods
        }, () => {console.log(this.state.foods)});
    }

    addRow(e)
    {
        e.preventDefault();
        let nextId = this.state.lastId+1;
        this.setState({
            foods: [...this.state.foods, {id: nextId, food: '', calories: 0, protein: 0, carbohydrates: 0, fats: 0, serving: ''}], lastId: nextId
        })
    }

    render(){
        let mappedFoods = this.state.foods.map((f, i) => <Food info={f} key={i} edit={this.edit} delete={this.delete}/>)
        return (
            <div className="edit">
                <Link to='/'>Home</Link>
                <div className="foodrow-info">
                    <h2>Food</h2>
                    <h2>Calories</h2>
                    <h2>Protein</h2>
                    <h2>Carbohydrates</h2>
                    <h2>Fats</h2>
                    <h2>Serving</h2>
                </div>
                {mappedFoods}
                <button onClick={this.addRow}>Add New Food</button>
            </div>
        )
    }
}

export default EditFoods;