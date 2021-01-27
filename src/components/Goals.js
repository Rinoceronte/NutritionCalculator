import React, {Component} from 'react';

class Goals extends Component{
    constructor(props){
        super(props);

        // console.log(props.goals);
        this.state = {
            calories: props.goals.calories,
            protein: props.goals.protein,
            carbohydrates: props.goals.carbohydrates,
            fats: props.goals.fats,
            edited: false,
            readOnly: true
        }

        this.lastState = this.state;

        this.updateGoals = this.updateGoals.bind(this);
        this.readonly = this.readonly.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.goals !== this.props.goals) {
            this.setState({
                calories: this.props.goals.calories,
                protein: this.props.goals.protein,
                carbohydrates: this.props.goals.carbohydrates,
                fats: this.props.goals.fats
            }, () => {
                this.lastState = this.state;
            });
        }
    }

    readonly(){
        if(!this.state.readOnly){
            // console.log(this.lastState)
            this.setState({
                calories: this.lastState.calories,
                protein: this.lastState.protein,
                carbohydrates: this.lastState.carbohydrates,
                fats: this.lastState.fats,
                edited: false
            });
        }
        else{
            this.lastState = this.state;
        }
        this.setState(prevState => ({readOnly: !prevState.readOnly}));
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
        // console.log("update?")
        this.props.update(this.state);
        this.setState({
            edited: false,
            readOnly: true,
        });
        this.lastState = this.state;
    }
    render(){
    return(
        <section className='goalsContent'>
            <h1>GOALS</h1>
            <label>CALORIES: <input type="text" onChange={e => this.changeCalories(e.target.value)} value={this.state.calories} readOnly={this.state.readOnly}/></label>
            <label>PROTEIN: <input type="text" onChange={e => this.changeProtein(e.target.value)} value={this.state.protein} readOnly={this.state.readOnly}/></label>
            <label>CARBOHYDRATES: <input type="text" onChange={e => this.changeCarbs(e.target.value)} value={this.state.carbohydrates} readOnly={this.state.readOnly}/></label>
            <label>FATS: <input type="text" onChange={e => this.changeFats(e.target.value)} value={this.state.fats} readOnly={this.state.readOnly}/></label>
            <section className="goals-buttons"><button onClick={this.readonly}>{this.state.readOnly ? 'Enable Edit' : 'Disable Edit'}</button>
            {this.state.edited && <button onClick={this.updateGoals}>Update</button>}</section>
        </section>
    );
}
}

export default Goals;