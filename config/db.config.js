const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('worksuite_Db', 'root', null, {
    host: '127.0.0.1',
    dialect: "mysql"
});


async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDb();
module.exports = sequelize;