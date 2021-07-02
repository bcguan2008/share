const Koa = require('koa');
const app = new Koa();
const static = require('koa-static')
const path = require('path')
const staticPath = './static'
const cors = require('@koa/cors');


app.use(static(
    path.join(__dirname, staticPath)
))
app.use(cors());

const main = ctx => {
    console.log(2222)
    ctx.response.body = "hello ";
}
app.listen(3000);

app.use(main);

console.log('start in 3000')