let foods = [
        {id: 1, food: 'Egg', calories: 78, protein: 6, carbohydrates: 0.6, fats: 5, serving: '1 Large', category: ['Breakfast']},
        {id: 2, food: 'Sausage', calories: 215, protein: 9, carbohydrates: 2, fats: 19, serving: '2 oz', category: ['Breakfast']},
        {id: 3, food: 'Almonds', calories: 160, protein: 6, carbohydrates: 6, fats: 14, serving: '1 oz', category: ['Snack']},
        {id: 4, food: 'Chicken', calories: 130, protein: 25, carbohydrates: 0, fats: 3, serving: '4 oz', category: ['Lunch', 'Dinner']},
        {id: 5, food: 'Oats', calories: 140, protein: 5, carbohydrates: 27, fats: 2.5, serving: '1/2 Cup', category: ['Breakfast']},
        {id: 6, food: 'Cottage Cheese', calories: 120, protein: 13, carbohydrates: 4, fats: 5, serving: '1/2 Cup', category: ['Snack']},
        {id: 7, food: 'Greek Yogurt', calories: 150, protein: 14, carbohydrates: 16, fats: 3, serving: '1 Container', category: ['Snack']},
        {id: 8, food: 'Broccoli', calories: 31, protein: 2.5, carbohydrates: 6, fats: 0.4, serving: '1 Cup', category: ['Lunch', 'Dinner']},
        {id: 9, food: 'Lean Beef', calories: 302, protein: 20, carbohydrates: 0, fats: 24, serving: '3 oz', category: ['Lunch', 'Dinner']},
        {id: 10, food: 'Quinoa', calories: 120, protein: 4.4, carbohydrates: 21.3, fats: 1.9, serving: '1 Cup', category: ['Lunch', 'Dinner']},
        {id: 11, food: 'Protein Shake',calories: 311, protein: 28, carbohydrates: 43.5, fats: 3.3, serving: '1 Shake', category: ['Snack']},
        {id: 12, food: 'Ground Turkey', calories: 167, protein: 22, carbohydrates: 0, fats: 9, serving: '4 oz', category: ['Lunch', 'Dinner']},
        {id: 13, food: 'Salmon', calories: 177, protein: 17, carbohydrates: 0, fats: 11, serving: '3 oz', category: ['Lunch', 'Dinner']},
        {id: 14, food: 'Black Beans', calories: 114, protein: 8, carbohydrates: 20, fats: 0, serving: '1 Cup', category: ['Lunch', 'Dinner']},
        {id: 15, food: 'Banana', calories: 105, protein: 1.3, carbohydrates: 27, fats: 0.4, serving: '1 Medium', category: ['Snack']},
        {id: 16, food: 'Orange', calories: 45, protein: 0.9, carbohydrates: 11, fats: 0.1, serving: '1 small', category: ['Snack']},
        {id: 17, food: 'Whole Wheat Pasta', calories: 180, protein: 8, carbohydrates: 39, fats: 1.5, serving: '2 oz', category: ['Lunch', 'Dinner']},
        {id: 18, food: 'Peanut Butter', calories: 188, protein: 8, carbohydrates: 6, fats: 16, serving: '2 tbsp', category: ['Snack']},
    ];


let id = 19;
let goals = {calories: 2440, protein: 35, carbohydrates: 35, fats: 30};

function reduceObjectArray(arr, key){
    return arr.reduce((t, f) => t+= f[key], 0);
}


function makeDay(){
    let breakfast = [];
    let snack1 = [];
    let lunch = [];
    let snack2 = [];
    let dinner = [];
    let meal = 1;
    let calories = 0;
    protein = 0;
    carbohydrates = 0; 
    fats = 0;

    let foodType = 1;
    let proteinn = [];
    let carbs = [];
    let fatss = [];
    let food = foods[Math.floor(Math.random() * foods.length)];
    while(calories < goals.calories){
        //get initial random food
        // const fatsReducer = (t, f) => t += f.fats;
        // const proteinReducer = (t, f) => t += f.protein;
        // const carbReducer = (t, f) => t += f.carbohydrates;
        const rando = () => foods[Math.floor(Math.random() * foods.length)];

        //calculate total protein carbs and fats
        protein = reduceObjectArray(proteinn, 'protein') + reduceObjectArray(carbs, 'protein') + reduceObjectArray(fatss, 'protein');
        carbohydrates = reduceObjectArray(proteinn, 'carbohydrates') + reduceObjectArray(carbs, 'carbohydrates') + reduceObjectArray(fatss, 'carbohydrates');
        fats = reduceObjectArray(proteinn, 'fats') + reduceObjectArray(carbs, 'fats') + reduceObjectArray(fatss, 'fats');
        // protein = proteinn.reduce(proteinReducer, 0) + carbs.reduce(proteinReducer, 0) + fatss.reduce(proteinReducer, 0);
        // carbohydrates = proteinn.reduce(carbReducer, 0) + carbs.reduce(carbReducer, 0) + fatss.reduce(carbReducer, 0);
        // fats = proteinn.reduce(fatsReducer, 0) + carbs.reduce(fatsReducer, 0) + fatss.reduce(fatsReducer, 0);

        //switch between proteins carbs and fats and add 1 into the appropriate array
        switch (foodType){
            case 1:

            //if the protein is less than 10 on the food item, get a new food item
            // console.log('protein ' + protein + ' goals ' + goals.protein);
            if(protein < Math.floor(goals.calories * goals.protein / 400))
                {
                    while(food.protein < 10) {
                        food = rando();
                        // console.log('protein ' +food.protein)
                    }
                    proteinn.push(food)
                    calories += food.calories;
                }
                foodType = 2;
                break;
            case 2:
                // console.log('carbs ' + carbohydrates + ' goals ' + goals.carbohydrates);
                while(food.carbohydrates < 10) {
                    food = rando();
                    // console.log('carb ' +food.carbohydrates);
                }
                // console.log('carbohydrates ' +carbohydrates);
                // console.log('goal ' + goals.carbohydrates);
                if(carbohydrates < Math.floor(goals.calories * goals.carbohydrates / 400))
                {
                    // console.log('ever get here?');
                    carbs.push(food)
                    calories += food.calories;
                }
                foodType = 3;
                break;
            case 3:
                // console.log('cats ' + fats + ' goals ' + goals.fats);
                while(food.fats < 5)
                {
                    food = rando();
                }
                if(fats < Math.floor(goals.calories * goals.fats / 900))
                {
                    fatss.push(food)
                    calories += food.calories;
                }
                foodType = 1;
                break;
        }
    }

    // console.log('protin ' + proteinn);
    // console.log('carbs ' + carbs);
    // console.log('fats ' + fatss);
    console.log('protein: ' + protein);
    console.log('carbs: ' + carbohydrates);
    console.log('fats: ' + fats);

    for(let i = 0;i<proteinn.length;i++)
    {
        if(proteinn[i].category.includes('Breakfast')){
            breakfast.push(proteinn[i]);
        }
        else if(proteinn[i].category.includes('Lunch') || proteinn[i].category.includes('Dinner')) {
            dinner.length > lunch.length ? lunch.push(proteinn[i]) : dinner.push(proteinn[i]);     
        }
        else if(proteinn[i].category.includes('Snack')){
            snack1.length > snack2.length ? snack2.push(proteinn[i]) : snack1.push(proteinn[i])
        }
    }

    for(let i = 0;i<carbs.length;i++)
    {
        if(carbs[i].category.includes('Breakfast')){
            breakfast.push(carbs[i]);
        }
        else if(carbs[i].category.includes('Lunch') || carbs[i].category.includes('Dinner')) {
            dinner.length > lunch.length ? lunch.push(carbs[i]) : dinner.push(carbs[i]);
            
        }
        else if(carbs[i].category.includes('Snack')){
            snack1.length > snack2.length ? snack2.push(carbs[i]) : snack1.push(carbs[i])
        }
    }

    for(let i = 0;i<fatss.length;i++)
    {
            if(fatss[i].category.includes('Breakfast')){
                breakfast.push(fatss[i]);
            }
            else if(fatss[i].category.includes('Lunch') || fatss[i].category.includes('Dinner')) {
                dinner.length > lunch.length ? lunch.push(fatss[i]) : dinner.push(fatss[i]);
            }
            else if(fatss[i].category.includes('Snack')){
                snack1.length > snack2.length ? snack2.push(fatss[i]) : snack1.push(fatss[i])
            }
    }

    return {
        breakfast: breakfast,
        snack1: snack1,
        lunch: lunch,
        snack2: snack2,
        dinner: dinner
    }
}


function sortMeals(days){
   let day = 1;
   let arr = [];
   while(day <= days)
   {
       arr.push(makeDay());
       day++;
   }
   return arr;
}

module.exports = {
    getMeals: (req, res) => {
        res.status(200).send(sortMeals(Number(req.params.days)));
    },
    read: (req, res) => {
        res.status(200).send(foods);
    },
    create: (req, res) => {
        foods.push({id: id, food: req.body.food, calories: req.body.calories, protein: req.body.protein, carbohydrates: req.body.carbohydrates, fats: req.body.fats, serving: req.body.serving});
        id++;
        res.status(200).send(foods);
    },
    update: (req, res) => {
        let i = foods.findIndex(f => f.id === Number(req.params.id));
        let food = foods[i];
        foods[i] = {
            id: food.id,
            food: req.body.food.food || food.food,
            calories: req.body.food.calories || food.calories, 
            protein: req.body.food.protein || food.protein, 
            carbohydrates: req.body.food.carbohydrates || food.carbohydrates, 
            fats: req.body.food.fats || food.fats,
            serving: req.body.food.serving || food.serving,
            category: req.body.food.category || food.category
        };
        console.log(foods[i]);
        res.status(200).send(foods);
    },
    delete: (req, res) => {
        let index = foods.findIndex(f => f.id === Number(req.params.id));
        foods.splice(index, 1);
        res.status(200).send(foods);
    },
    readGoals: (req, res) => {
        res.status(200).send(goals);
    },
    updateGoals: (req, res) => {
        goals = {calories: req.body.goals.calories || goals.calories, protein: req.body.goals.protein || goals.protein, carbohydrates: req.body.goals.carbohydrates || goals.carbohydrates, fats: req.body.goals.fats || goals.fats};
        res.status(200).send(goals);
    }    
}