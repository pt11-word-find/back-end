
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('wordlists').del()
    .then(function () {
      // Inserts seed entries
      return knex('wordlists').insert([
        {user_id: 1, wordlist: 'the,quick,brown,fox,jumped,over,the,lazy,dog,furthermore,both,were,good,boys'},
        {user_id: 1, wordlist: 'javascript,html,sass,nodejs,nodemon,express,reactjs,contextapi,jsonwebtoken'},
        {user_id: 2, wordlist: 'zach,michael,emily,kristi,brian,shya,webpt11,dreamteam'}
      ]);
    });
};
