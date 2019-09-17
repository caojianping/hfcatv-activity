import Koa, {BaseContext} from 'koa';
import middlewares from './middlewares';
import routes from './routes';
import config from './config';

const app = new Koa();

app.use(middlewares());
app.use(routes());

app.use(async (ctx: BaseContext) => {
    ctx.body = 'Hello World!';
});

app.listen(config.port);
