import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

export default function middlewares () {
    return compose([
        bodyParser(),
        cors(),
    ]);
};
