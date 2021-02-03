import React, { Component } from 'react';
import Select from 'react-select';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Food extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0, food: '', calories: 0, protein: 0, carbohydrates: 0, fats: 0, serving: '', category: [],
            edited: false,
            focusedValue: ''
        }

        this.lastState = this.state;

        this.delete = this.delete.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);
        this.setFood = this.setFood.bind(this)
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.confirmChanges = this.confirmChanges.bind(this);
    }

    componentDidMount() {
        this.setFood();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.info !== this.props.info) {
            this.setFood();
        }
    }

    setFood() {
        const { id, food, calories, protein, carbohydrates, fats, serving, category } = this.props.info;

        this.setState({
            id, food, calories, protein, carbohydrates, fats, serving, category
        }, () => {this.lastState = this.state;});
    }

    changeFood(val){
        this.setState({food: val, edited: true});
    }

    changeCalories(val){
        this.setState({calories: val, edited: true});
    }

    changeCarbs(val){
        this.setState({carbohydrates: val, edited: true});
    }

    changeFats(val){
        this.setState({fats: val, edited: true});
    }

    changeProtein(val){
        this.setState({protein: val, edited: true});
    }

    changeServing(val){
        this.setState({serving: val, edited: true});
    }

    changeCategory(val){
        console.log(val);
        if(!this.state.category){
            this.setState({
                category: [val]
            });
        }
       else if(!this.state.category.includes(val)){
            this.setState({
                category: [...this.state.category, val], edited: true
            });
        }
        else{
            let copy = this.state.category.slice();
            let index = copy.findIndex(c => c === val);
            copy.splice(index, 1);
            this.setState({
                category: copy, edited: true
            });
        }
    }

    addCategory(selectedList, selectedItem) { 
        this.setState({
            category: [...this.state.category, selectedItem]
        });
    }

    removeCategory(selectedList, removedItem) {
        let arr = this.state.category.slice();
        arr.splice(arr.findIndex(c => c === removedItem));
        this.setState({
            category: arr
        });
    }

    delete(e)
    {
        e.preventDefault();
        this.props.delete(this.state.id);
    }

    confirmEdit(e){
        e.preventDefault();
        this.setState({edited: false});
        this.props.edit(this.state.id, this.state);
    }

    focusHasChanged(val){
        return this.state.focusedValue === val;
    }

    confirmChanges(event){
        console.log(event);
        // if(this.focusHasChanged(event.target.value)){
            if(this.state.edited){
                confirmAlert({
                    title: 'Confirm Changes',
                    message: 'Do you want to save your changes?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                this.props.edit(this.state.id, this.state)
                                this.setState({edited: false});
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => {
                                this.setState({
                                    food: this.lastState.food,
                                    calories: this.lastState.calories,
                                    protein: this.lastState.protein,
                                    carbohydrates: this.lastState.carbohydrates,
                                    fats: this.lastState.fats,
                                    serving: this.lastState.serving,
                                    category: this.lastState.category,
                                    edited: false
                                })
                            }
                        }
                    ]
                });
            }
        // }
    }

    render(){
        let options = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
        return (
            <div className="food-row" >
                <form className="food-row-edit" >
                    <input type="text" value={this.state.food} onChange={e => this.changeFood(e.target.value)} readOnly={!this.props.editable} />
                    <input type="text" value={this.state.calories} onChange={e => this.changeCalories(e.target.value)} readOnly={!this.props.editable} />
                    <input type="text" value={this.state.protein} onChange={e => this.changeProtein(e.target.value)} readOnly={!this.props.editable} />
                    <input type="text" value={this.state.carbohydrates} onChange={e => this.changeCarbs(e.target.value)} readOnly={!this.props.editable} />
                    <input type="text" value={this.state.fats} onChange={e => this.changeFats(e.target.value)} readOnly={!this.props.editable} />
                    <input type="text" value={this.state.serving} onChange={e => this.changeServing(e.target.value)} readOnly={!this.props.editable} />
                    <select className="category-options" multiple={true} disabled={!this.props.editable} value={this.state.category} onChange={e => this.changeCategory(e.target.value)}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                    </select>
                    {/* <input type="text" value={this.state.category} onChange={e => this.changeCategory(e.target.value)} readOnly={!this.props.editable} /> */}
                    {/* <div><Select width="200px" options={[{value: 'Breakfast', label: 'Breakfast'}, {value: 'Lunch', label: 'Lunch'}, {value: 'Dinner', label: 'Dinner'}, {value: 'Snack', label: 'Snack'}]} onChange={e => this.changeCategory(e)} isMulti isDisabled={!this.props.editable} value={this.state.category}/></div> */}
                </form>
                <button onClick={this.delete}>X</button>
                {this.state.edited && <button onClick={this.confirmEdit}>Update</button>}
            </div>
        )
    }
}

export default Food;