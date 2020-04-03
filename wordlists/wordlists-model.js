const db = require('../data/db-config')

module.exports = {
    add,
    getAll,
    findById,
    findBy,
    remove,
    update,
    getCount
}

function getCount() {
    return db('wordlists').count("id as CNT")
}

async function add(wordlist) {
    return db('wordlists').insert(wordlist).returning("*")

}

function findBy(filter) {
    return db('wordlists').where(filter).first()
}

function getAll() {
    return db('wordlists')
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

  function update(id, changes) {
    return db('wordlists')
      .where({id})
      .update(changes, '*').returning("*");
  }