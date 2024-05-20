const {sequelize,Sequelize} = require("../_helpers/sequelizedb");
const { DataTypes } = require("sequelize");

const vendors = sequelize.define(
    "vendors",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        vendor_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        commercial_reg_type: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        
        user_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
       
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        company_name_eng: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        
        contact_email: {
            type: DataTypes.STRING(255),

            defaultValue: ''
        },
        contact_email2: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        },
       
    },
    {
        timestamps: false,
        underscored: true
    }
);

vendors.sync({ alter:false })
module.exports = vendors;