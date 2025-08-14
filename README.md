#   Server  setup
    1. npm init -y
    2. npm i express nodemon sequelize mysql2 dotenv
    3. type -> module , script ->start nodemon 
    4. server setup app.listen with port

#  Database setup with models
    1. sequelize
        .connect()
        .authenticte
    2. make models 
    3. associate in model/index.js
    4. export all the models and sequelize from model/index.js
    5. sequelize.sync after association 

#  Authenticating
    1. register user 
    2. validation in controller
    3. verify user in register


    