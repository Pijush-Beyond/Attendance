import express from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import handlebars from "express-handlebars";
import path from 'path';
dotenv.config();

import authentication from './src/routers/authenticate.js';
import errorlogger from './src/utilities/errorlogger.js';
import slot from './src/routers/slot.js';
// import Slot from './src/routers/slot.js';

const app = express();


app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('tiny'));

app.engine('hbs', handlebars({
  extname: 'hbs',
  layoutsDir: 'src/views/layouts/',
  partialsDir: path.join(path.resolve('./'), 'src/views/partials'),
  // helpers: new Promise(async (resolve, reject) => {
  //   let helpers = {};
  //   for (let file of readdirSync(path.join(path.resolve('./', './src/views/helpers')))) {
  //     const { default: helper, ...helper2 } = await import(path.join(path.resolve('./', './src/views/helpers', file)))
  //     if (typeof helper === "function") helpers[path.basename(file, '.js')] = helper;
  //     else helpers = { ...helpers, ...helper2 }
  //   }
  //   // console.log("this is all helpers",helpers)
  //   resolve(helpers);
  // })
}))
app.set('view engine', 'hbs');
app.set('views', 'src/views/template/');

app.use(cookieParser());

app.use(express.static(path.join(path.resolve('./'), 'public')))

// routers starts here
app.use(authentication);
app.use(slot);

// app.all('/slot/:year/:month/:date', async (req, res, next) => {
//   const router = new Slot();
//   const response = await router.asRouter(req, res, next);
//   console.log(response);
//   res.status(500).send('demo');
// })
// ends here


//url not found error handler: status 404
app.use((req, res, next) => res.status(404).json({ data: null, message: null, error_message: "Method not Allowed", status: 404 }))

app.use(errorlogger)

export default app;