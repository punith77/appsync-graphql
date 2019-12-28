const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require("mongoose")
const cors = require("cors")
const schema = require('./schema/schema')

const port = process.env.PORT || 4000;

const app = express();

/*
mongodb://<dbuser>:<dbpassword>@ds257698.mlab.com:57698/gq-appsync
*/
mongoose.connect('mongodb://punith:admin123@ds257698.mlab.com:57698/gq-appsync', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("We are connected to mongodb")
})

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))


app.listen(port, () => {
    console.log('Listening for requests on my awesome port 4000')
})