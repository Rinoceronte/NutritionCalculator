import React, { Component } from 'react';

class Food extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0, food: '', calories: 0, protein: 0, carbohydrates: 0, fats: 0, serving: '', category: '',
            edited: false
        }

        this.delete = this.delete.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);
        this.setFood = this.setFood.bind(this)
    }

    componentDidMount() {
        this.setFood()
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
        });
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
        this.setState({
            category: val
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

    render(){
        return (
            <div className="food-row">
                <form className="food-row-edit">
                    <input type="text" value={this.state.food} onChange={e => this.changeFood(e.target.value)}/>
                    <input type="text" value={this.state.calories} onChange={e => this.changeCalories(e.target.value)} />
                    <input type="text" value={this.state.protein} onChange={e => this.changeProtein(e.target.value)} />
                    <input type="text" value={this.state.carbohydrates} onChange={e => this.changeCarbs(e.target.value)} />
                    <input type="text" value={this.state.fats} onChange={e => this.changeFats(e.target.value)} />
                    <input type="text" value={this.state.serving} onChange={e => this.changeServing(e.target.value)} />
                    <input type="text" value={this.state.category} onChange={e => this.changeCategory(e.target.value)} />
                </form>
                <button onClick={this.delete}>X</button>
                {this.state.edited && <button onClick={this.confirmEdit}>Update</button>}
            </div>
        )
    }
}

export default Food;