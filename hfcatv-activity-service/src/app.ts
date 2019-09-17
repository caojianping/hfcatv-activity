import Koa, {BaseContext} from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import config from './config';

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(async (ctx: BaseContext) => {
    ctx.body = 'Hello World!';
});

app.listen(config.port);