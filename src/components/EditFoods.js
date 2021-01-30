import React, {Component, Copmponent} from 'react';
import Food from './Food.js';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EditFoods extends Component{
    constructor(){
        super();

        this.state = {
            foods: [],
            editable: false,
            lastId: 2,
            sort: {column: 'food', direction: 'up'}
        }

        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.addRow = this.addRow.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount(){
        axios.get('/api/foods').then( response => {
            this.setState({
                foods: response.data
            });
        });
    }

    changeSort(val){
        let sortArr = this.state.foods.slice();
        if(val !== this.state.sort.column){
            switch(val) {
                case 'food':
                    sortArr.sort((a, b) => (a.food > b.food) ? 1 : -1);
                    this.setState({sort: {column: 'food', direction: 'down'}, foods: sortArr});
                    break;
                case 'calories':
                    sortArr.sort((a, b) => (a.calories > b.calories) ? 1 : -1);
                    this.setState({sort: {column: 'calories', direction: 'down'}, foods: sortArr});
                    break;
                case 'protein':
                    sortArr.sort((a, b) => (a.protein > b.protein) ? 1 : -1);
                    this.setState({sort: {column: 'protein', direction: 'down'}, foods: sortArr});
                    break;
                case 'carbohydrates':
                    sortArr.sort((a, b) => (a.carbohydrates > b.carbohydrates) ? 1 : -1);
                    this.setState({sort: {column: 'carbohydrates', direction: 'down'}, foods: sortArr});
                    break;
                case 'fats':
                    sortArr.sort((a, b) => (a.fats > b.fats) ? 1 : -1);
                    this.setState({sort: {column: 'fats', direction: 'down'}, foods: sortArr});
                    break;
                case 'serving':
                    sortArr.sort((a, b) => (a.serving > b.serving) ? 1 : -1);
                    this.setState({sort: {column: 'serving', direction: 'down'}, foods: sortArr});
                    break;
                case 'category':
                    sortArr.sort((a, b) => (a.category > b.category) ? 1 : -1);
                    this.setState({sort: {column: 'category', direction: 'down'}, foods: sortArr});
                    break;
            }
        }
        else {
            let newDirection = this.state.sort.direction === 'down' ? 'up' : 'down';
            if(newDirection === 'down') { 
                sortArr.sort((a, b) => (a[val] > b[val]) ? 1 : -1);
            }
            else {
                sortArr.sort((a, b) => a[val] < b[val] ? 1 : -1);
            }
            this.setState({
                foods: sortArr,
                sort: {column: val, direction: newDirection}
            });
        }
    }

    toggleEdit(){
        this.setState({editable: !this.state.editable});
    }

    edit(id, food){
        axios.put(`/api/foods/${id}`, {food}).then(response => {
            this.setState({
                foods: response.data
            });
        });
    }

    delete(id){
        axios.delete(`/api/foods/${id}`).then(response => {
            this.setState({foods: response.data});
        });
    }

    addRow(e)
    {
        e.preventDefault();
        if(this.state.editable){
            axios.post('/api/foods', {id: -1, food: '', calories: 0, protein: 0, carbohydrates: 0, fats: 0, serving: ''}).then( response => {
                this.setState({foods: response.data});
            });
        }
        
    }

    render(){
        let mappedFoods = this.state.foods.map((f, i) => <Food info={f} key={i} edit={this.edit} delete={this.delete} editable={this.state.editable} />)
        return (
            <div className="edit">
                <Link to='/'>Home</Link>
                <div className="foodrow-info">
                    <h2>FOOD <span onClick={e => this.changeSort('food')} 
                        className={this.state.sort.column === 'food' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>CALORIES <span onClick={e => this.changeSort('calories')}  className={this.state.sort.column === 'calories' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>PROTEIN <span onClick={e => this.changeSort('protein')}  className={this.state.sort.column === 'protein' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>CARBS <span onClick={e => this.changeSort('carbohydrates')}  className={this.state.sort.column === 'carbohydrates' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>FATS <span onClick={e => this.changeSort('fats')}  className={this.state.sort.column === 'fats' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>SERVING <span onClick={e => this.changeSort('serving')}  className={this.state.sort.column === 'serving' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                    <h2>CATEGORY <span onClick={e => this.changeSort('category')}  className={this.state.sort.column === 'category' ? (this.state.sort.direction === 'up' ? "headerSortUp black" : "headerSortDown black") : 'headerSortUp'} /></h2>
                </div>
                {mappedFoods}
                <button id="new-food" onClick={this.addRow}>ADD NEW FOOD</button><button id="edit" onClick={this.toggleEdit}>{this.state.editable ? 'Disable' : 'Edit'}</button>
            </div>
        )
    }
}

export default EditFoods;