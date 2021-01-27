import React, {Component} from 'react';

class Goals extends Component{
    constructor(props){
        super(props);

        console.log(props.goals);
        this.state = {
            calories: props.goals.calories,
            protein: props.goals.protein,
            carbohydrates: props.goals.carbohydrates,
            fats: props.goals.fats,
            edited: false
        }

        this.updateGoals = this.updateGoals.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.goals !== this.props.goals) {
            this.setState({
                calories: this.props.goals.calories,
                protein: this.props.goals.protein,
                carbohydrates: this.props.goals.carbohydrates,
                fats: this.props.goals.fats
            })
        }
    }

    changeCalories(val){
        this.setState({
            calories: val,
            edited: true
        });
    }
    changeProtein(val){
        this.setState({
            protein: val,
            edited: true
        });
    }
    changeCarbs(val){
        this.setState({
            carbohydrates: val,
            edited: true
        });
    }
    changeFats(val){
        this.setState({
            fats: val,
            edited: true
        });
    }

    updateGoals(){
        console.log("update?")
        this.props.update(this.state);
        this.setState({
            edited: false
        });
    }
    render(){
    return(
        <section className='goalsContent'>
            <h1>Goals</h1>
            <label>Calories: <input type="text" onChange={e => this.changeCalories(e.target.value)} value={this.state.calories}/></label>
            <label>Protein: <input type="text" onChange={e => this.changeProtein(e.target.value)} value={this.state.protein} /></label>
            <label>Carbohydrates: <input type="text" onChange={e => this.changeCarbs(e.target.value)} value={this.state.carbohydrates} /></label>
            <label>Fats: <input type="text" onChange={e => this.changeFats(e.target.value)} value={this.state.fats} /></label>
            {this.state.edited && <button onClick={this.updateGoals}>Update</button>}
        </section>
    );
}
}

export default Goals;