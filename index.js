const express = require('express');
const bodyParser = require('body-parser');

const { errorMiddleware } = require('./middlewares');
const { userRoute } = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRoute);

app.use('/', errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
