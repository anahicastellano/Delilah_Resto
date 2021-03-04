const {Sequelize} = require("sequelize")
const { QueryTypes } = require("sequelize")
// const dotenv = require('dotenv').config();


const db = new Sequelize (process.env.DB, process.env.DBUSER, process.env.DBPASS,{
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql"
}
)

async function alreadyExist(user){
    const alreadyExist = await db.query(`SELECT * FROM ${table} where id = :id`,{
        type: QueryTypes.SELECT,
        replacements: { id: id }
    })
    if (resource.length === 0) {
        throw new Error(`No existe el recurso en ${table}`);
    }
    return alreadyExist
}

async function getAllResources(table) {
    return await db.query(`select * from ${table}`, { type: QueryTypes.SELECT });
}


async function deleteResoueceById(table, id) {
    await db.query(`delete from ${table} where id = :id`, {
        replacements: { id: id },
        type: QueryTypes.DELETE
    });
}

async function cleanTable(table) {
    await db.query("SET FOREIGN_KEY_CHECKS = 0;");
    await db.query(`truncate ${table}`, { type: QueryTypes.BULKDELETE });
    await db.query("SET FOREIGN_KEY_CHECKS = 1;");
}

module.exports = {
    db,
    alreadyExist,
    getAllResources,
    deleteResoueceById,
    cleanTable
};