import {app} from './index';

app.mongoDB(process.env.CONN_STRING);
app.listen()
