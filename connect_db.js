const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( process.env.DBNAME, 'root', process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});

const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(process.env.DB_USERNAME)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectionDB()