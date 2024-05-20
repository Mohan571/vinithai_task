const Sequelize=require('sequelize');


const database="vendor";
const username="root"

const password=""
const host="localhost"

const sequelize=new Sequelize(database,username,password,{
    host:host,
    dialect:'mysql'

})



module.exports={Sequelize,sequelize}
