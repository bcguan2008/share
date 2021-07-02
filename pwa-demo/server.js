const Koa = require('koa');
const app = new Koa();
const path = require('path');

const static = require('koa-static');

app.use(static(
    path.join(__dirname,'./src')
))

app.listen(3000);