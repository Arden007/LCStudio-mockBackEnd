const monsterSchema = (table) => {
  table.increments("id").primary().unique();
  table.string("name").notNullable().unique();
  table.string("description").notNullable().unique();
  table.integer("attackPower").notNullable();
  table.integer("defencePower").notNullable();
  table.string("specialAbility").notNullable();
  table.timestamps(true, true);
};

module.exports = monsterSchema;
