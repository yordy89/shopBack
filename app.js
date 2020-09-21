import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
require('dotenv').config()
require('./database')
require('./passport/local-auth')

const app = express()

//middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//passport
app.use(passport.initialize())
app.use(passport.session())

//staticRoutes
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use(require('./routes/userR'))
app.use(require('./routes/productR'))
app.use(require('./routes/departmentR'))
app.use(require('./routes/categoryR'))


app.listen(process.env.PORT,() => {
    console.log(`Server listen on port ${process.env.PORT}`)
})
