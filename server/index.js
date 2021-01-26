const express = require('express');

const fc = require('./controllers/food_controller.js');
const gc = require('./controllers/goals_controller.js');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '../'));

app.get('/api/foods', fc.read);
app.get(`/api/foods/:days`, fc.getMeals);
app.post('/api/foods', fc.create);
app.put('/api/foods/:id', fc.update);
app.delete('/api/foods/:id', fc.delete);

app.get('/api/goals', gc.read);
app.put('/api/goals', gc.update);

const port = 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})