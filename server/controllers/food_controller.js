let foods = [
        {id: 1, food: 'Egg', calories: 78, protein: 6, carbohydrates: 0.6, fats: 5, serving: '1 Large', category: 'Breakfast'},
        {id: 2, food: 'Sausage', calories: 215, protein: 9, carbohydrates: 2, fats: 19, serving: '2 oz', category: 'Breakfast'},
        {id: 3, food: 'Almonds', calories: 160, protein: 6, carbohydrates: 6, fats: 14, serving: '1 oz', category: 'Snack'},
        {id: 4, food: 'Chicken', calories: 130, protein: 25, carbohydrates: 0, fats: 3, serving: '4 oz', category: 'Lunch Dinner'},
        {id: 5, food: 'Oats', calories: 140, protein: 5, carbohydrates: 27, fats: 2.5, serving: '1/2 Cup', category: 'Breakfast'},
        {id: 6, food: 'Cottage Cheese', calories: 120, protein: 13, carbohydrates: 4, fats: 5, serving: '1/2 Cup', category: 'Snack'},
        {id: 7, food: 'Greek Yogurt', calories: 150, protein: 14, carbohydrates: 16, fats: 3, serving: '1 Container', category: 'Snack'},
        {id: 8, food: 'Broccoli', calories: 31, protein: 2.5, carbohydrates: 6, fats: 0.4, serving: '1 Cup', category: 'Lunch Dinner'},
        {id: 9, food: 'Lean Beef', calories: 302, protein: 20, carbohydrates: 0, fats: 24, serving: '3 oz', category: 'Lunch Dinner'},
        {id: 10, food: 'Quinoa', calories: 120, protein: 4.4, carbohydrates: 21.3, fats: 1.9, serving: '1 Cup', category: 'Lunch Dinner'},
        {id: 11, food: 'Protein Shake',calories: 311, protein: 28, carbohydrates: 43.5, fats: 3.3, serving: '1 Shake', category: 'Snack'},
        {id: 12, food: 'Ground Turkey', calories: 167, protein: 22, carbohydrates: 0, fats: 9, serving: '4 oz', category: 'Lunch Dinner'},
        {id: 13, food: 'Salmon', calories: 177, protein: 17, carbohydrates: 0, fats: 11, serving: '3 oz', category: 'Lunch Dinner'},
        {id: 14, food: 'Black Beans', calories: 114, protein: 8, carbohydrates: 20, fats: 0, serving: '1 Cup', category: 'Lunch Dinner'},
        {id: 15, food: 'Banana', calories: 105, protein: 1.3, carbohydrates: 27, fats: 0.4, serving: '1 Medium', category: 'Snack'},
        {id: 16, food: 'Orange', calories: 45, protein: 0.9, carbohydrates: 11, fats: 0.1, serving: '1 small', category: 'Snack'},
        {id: 17, food: 'Whole Wheat Pasta', calories: 180, protein: 8, carbohydrates: 39, fats: 1.5, serving: '2 oz', category: 'Lunch Dinner'},
        {id: 18, food: 'Peanut Butter', calories: 188, protein: 8, carbohydrates: 6, fats: 16, serving: '2 tbsp', category: 'Snack'},

    ];
let id = 19;
let goals = {calories: 2440, protein: 225, carbohydrates: 272, fats: 91};


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
    while(calories < goals.calories)
    {
        let arr = [];
        let food = undefined;
        switch(meal)
        {
            case 1:
                arr = foods.filter(f => f.category.includes('Breakfast'));
                food = arr[Math.floor(Math.random() * arr.length)];
                breakfast.push(food);
                calories += food.calories;
                protein += food.protein;
                carbohydrates += food.carbohydrates;
                fats += food.fats;
                meal = 2;
                break;
            case 2:
                arr = foods.filter(f => f.category.includes('Snack'));
                food = arr[Math.floor(Math.random() * arr.length)];
                snack1.push(food);
                calories += food.calories;
                protein += food.protein;
                carbohydrates += food.carbohydrates;
                fats += food.fats;
                meal = 3;
                break;
            case 3:
                arr = foods.filter(f => f.category.includes('Lunch'));
                food = arr[Math.floor(Math.random() * arr.length)];
                lunch.push(food);
                calories += food.calories;
                protein += food.protein;
                carbohydrates += food.carbohydrates;
                fats += food.fats;
                meal = 4;
                break;
            case 4:
                arr = foods.filter(f => f.category.includes('Snack'));
                food = arr[Math.floor(Math.random() * arr.length)];
                snack2.push(food);
                calories += food.calories;
                protein += food.protein;
                carbohydrates += food.carbohydrates;
                fats += food.fats;
                meal = 5;
                break;
            case 5:
                arr = foods.filter(f => f.category.includes('Dinner'));
                food = arr[Math.floor(Math.random() * arr.length)];
                dinner.push(food);
                calories += food.calories;
                protein += food.protein;
                carbohydrates += food.carbohydrates;
                fats += food.fats;
                meal = 1;
                break;
            default:
                meal = 1;
                break;
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