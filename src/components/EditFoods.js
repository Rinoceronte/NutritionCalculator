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
            lastId: 2,
            sort: {column: 'food', direction: 'up'}
        }

        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.addRow = this.addRow.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount(){
        axios.get('/api/foods').then( response => {
            this.setState({
                foods: response.data
            });
        });
    }

    changeSort(val){

        if(val !== this.state.sort.column){
            switch(val) {
                case 'food':
                    this.setState({sort: {column: 'food', direction: 'down'}});
                    break;
                case 'calories':
                    this.setState({sort: {column: 'calories', direction: 'down'}});
                    break;
                case 'protein':
                    this.setState({sort: {column: 'protein', direction: 'down'}});
                    break;
                case 'carbohydrates':
                    this.setState({sort: {column: 'carbohydrates', direction: 'down'}});
                    break;
                case 'fats':
                    this.setState({sort: {column: 'fats', direction: 'down'}});
                    break;
                case 'serving':
                    this.setState({sort: {column: 'serving', direction: 'down'}});
                    break;
                case 'category':
                    this.setState({sort: {column: 'category', direction: 'down'}});
                    break;
            }
        }
        else {
            let newDirection = this.state.sort.direction === 'down' ? 'up' : 'down';
            this.setState({
                sort: {column: val, direction: newDirection}
            });
        }
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
                    <h2>FOOD <button onClick={e => this.changeSort('food')} 
                        className={this.state.sort.column === 'food' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>CALORIES <button onClick={e => this.changeSort('calories')} className={this.state.sort.column === 'calories' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>PROTEIN <button onClick={e => this.changeSort('calories')} className={this.state.sort.column === 'protein' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>CARBS <button onClick={e => this.changeSort('carbohydrates')} className={this.state.sort.column === 'carbohydrates' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>FATS <button onClick={e => this.changeSort('fats')} className={this.state.sort.column === 'fats' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>SERVING <button onClick={e => this.changeSort('serving')} className={this.state.sort.column === 'serving' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>CATEGORY <button onClick={e => this.changeSort('category')} className={this.state.sort.column === 'category' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                </div>
                {mappedFoods}
                <button id="new-food" onClick={this.addRow}>ADD NEW FOOD</button>
            </div>
        )
    }
}

export default EditFoods;