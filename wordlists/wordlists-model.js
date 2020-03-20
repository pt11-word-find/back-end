const db = require('../data/db-config')

module.exports = {
    add,
    getAll,
    findById,
    findBy,
    remove
}

async function add(wordlist) {
    return db('wordlists').insert(wordlist).returning("*")

}

function findBy(filter) {
    return db('wordlists').where(filter).first()
}

function getAll() {
    return db('wordlists').select('id', 'username')
}

function findById(id) {
    return db('wordlists')
        .where({id})
        .first()
}
function remove(id) {
    return db('wordlists')
    .where({ id })
    .first()
    .del();
  }