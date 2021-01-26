let foods = [
        {id: 1, food: 'Chicken', calories: 120, protein: 36, carbohydrates: 10, fats: 6, serving: '4oz'},
        {id: 2, food: 'Rice', calories: 230, protein: 8, carbohydrates: 40, fats: 2, serving: '1 cup'}
    ];
let id = 3;


function sortMeals(days){
    
}

module.exports = {
    getMeals: (req, res) => {

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
            serving: req.body.food.serving || food.serving
        };
        res.status(200).send(foods);
    },
    delete: (req, res) => {
        let index = foods.findIndex(f => f.id === Number(req.params.id));
        foods.splice(index, 1);
        res.status(200).send(foods);
    }
}