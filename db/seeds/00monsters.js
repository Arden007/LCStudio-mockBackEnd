// what seeding does it first clear a database(if using an existing database) and then adds in the entery you insert
exports.seed = (knex) => {
    //   Inserts seed entries
    return knex("monster").insert([
      {
        id: 1,
        name: "Pik",
        description: "fire element",
        attackPower: 1250,
        defencePower: 500,
        specialAbility: "fire ball",
      },
    ]);

};