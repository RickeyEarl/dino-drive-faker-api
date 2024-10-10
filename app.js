require('dotenv').config();
var cors = require('cors');

const { faker } = require('@faker-js/faker')

const express = require('express');
const app = express();
const port = process.env.SITE_PORT;
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

app.get('/user/friends/:number', (req, res) => {
    const number = req.params.number;
    const friends = [];

    const titles = [
        null,
        "Drive OG",
        "Developer",
    ];

    const GoalTypes = [
        {name:'steps', color: faker.color.rgb({format:'hex'})},
        {name:'calories', color: faker.color.rgb({format:'hex'})},
        {name:'exercise', color: faker.color.rgb({format:'hex'})},
        {name:'miles', color: faker.color.rgb({format:'hex'})},
        {name:'stand hours', color: faker.color.rgb({format:'hex'})},
    ]

    for (let i = 0; i < number; i++) {
        const friend = {
            avatar: faker.image.urlLoremFlickr({height:50, width:50,category:"people"}),
            id: faker.finance.accountNumber(24),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            title: faker.helpers.arrayElement(titles),
            goals:[
                {
                    type: faker.helpers.arrayElement(GoalTypes),
                    currentValue: faker.number.int({max:1000}),
                    targetValue: faker.number.int({max:1000, min:700}),
                },
                {
                    type: faker.helpers.arrayElement(GoalTypes),
                    currentValue: faker.number.int({ max: 1000 }),
                    targetValue: faker.number.int({ max: 1000, min: 700 }),
                }
            ]

        };
        friends.push(friend);
    }

    res.json(friends);
});