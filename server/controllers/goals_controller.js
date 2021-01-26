let goals = {calories: 2440, protein: 225, carbohydrates: 272, fats: 91};

module.exports = {
    read: (req, res) => {
        res.status(200).send(goals);
    },
    update: (req, res) => {
        goals = {calories: req.params.calories || goals.calories, protein: req.params.protein || goals.protein, carbohydrates: req.params.carbohydrates || goals.carbohydrates, fats: req.params.fats || goals.fats};
        res.status(200).send(goals);
    }
}