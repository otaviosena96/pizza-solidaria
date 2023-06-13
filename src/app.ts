import express from 'express';

export const app = express();

app.get('/', (request, response) => {
    return response.json({message: 'Hello Dev Pizza Soliária! 🍕'});
});


