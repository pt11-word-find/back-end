const db = require('../data/db-config')

module.exports = {
    add,
    getAll,
    findById,
    findBy,
    remove,
    update,
    getCount,
    getUserPuzzles
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

function getUserPuzzles(user_id) {
    return db('wordlists').where({user_id})
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