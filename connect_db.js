const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( 'b9gvibm1euk2ilsnstt9', 'uelx4ek7hl8p2cgb', 'Posx7EpouyeHaFd0MGAz', {
    host: 'b9gvibm1euk2ilsnstt9-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    logging: false
});

const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // console.log(process.env.DB_USERNAME)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectionDB()