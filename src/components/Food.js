import React, {Component} from 'react';

class Food extends Component{
    constructor(props)
    {
        super(props);
        const {id, food, calories, protein, carbohydrates, fats, serving} = props.info;
        this.state = {
            id, food, calories, protein, carbohydrates, fats, serving,
            edited: false
        }

        this.delete = this.delete.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);
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

    delete(e)
    {
        e.preventDefault();
        // console.log(this.state.id);
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
                </form>
                <button onClick={this.delete}>X</button>
                {this.state.edited && <button onClick={this.confirmEdit}>Update</button>}
            </div>
        )
    }
}

export default Food;