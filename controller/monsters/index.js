const knex = require("../../db/knex");

// Reusable function (Gets monsters with name, checks if name is in database)
const getMonster = async (name, description) => {
  return await knex
    .select()
    .from("monster")
    .where("name", name)
    .where("description", description)
    .then((monster) => {
      return monster[0];
    });
};

// add new monster to monster table

const addMonster = async (req, res) => {
  try {
    let { name, description, attackPower, defencePower, specialAbility } =
      req.body;

    // checks if the monster in our database with name, description
    const monsterExists = await getMonster(name, description);

    if (!monsterExists) {
      // if monster isn't found new monster is inserted into the monster table

      let newMonster = {
        name,
        description,
        attackPower,
        defencePower,
        specialAbility,
      };

      console.log(newMonster);
      // insert new monster
      await knex("monster").insert(newMonster);

      res.send({ msg: "monster successfully inserted" });
    } else {
      res.send({ msg: "monster already exists" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// gets all the monster
const getAllMonster = async (req, res) => {
  try {
    const monster = await knex
      .select()
      .from("monster")
      .then((monster) => {
        res.send(monster);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update monster by Id
const updateMonster = async (req, res) => {
  // here we are fetching the info from our database
  try {
    const monster = await knex
      .select()
      .from("monster")
      .where("id", req.params.id)
      .returning(["*"])
      .then((monster) => {
        return monster;
      });

    // now we shall set the values of our monster object to the req.body
    let data = ({
      name,
      description,
      attackPower,
      defencePower,
      specialAbility,
    } = req.body);

    console.log(data);
    // // Constructing the monsters object for us to update
    if (name) monster.name = name;
    // if (id) monster[0].id = id;
    if (description) monster.description = description;
    if (attackPower) monster.attackPower = attackPower;
    if (defencePower) monster.defencePower = defencePower;
    if (specialAbility) monster.specialAbility = specialAbility;

    // // now that our req.body is set to monsters data in the database we can update it with
    await knex("monster")
      .where("id", monster[0].id)
      .update(data)
      // when updating we need to return the data
      .returning(["*"])
      .then((updateData) => {
        res.send(updateData);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// deletes user data by Id
const deleteMonster = async (req, res) => {
  try {
    const monster = await knex
      .select()
      .from("monster")
      .where("id", req.params.id)
      .returning(["*"])
      .then((monster) => {
        return monster;
      });
    console.log(monster[0]);

    knex("monster")
      .where("id", monster[0].id)
      .del()
      .returning(["*"])
      .then(() => {
        res.json({ msg: "Monster removed!" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addMonster,
  getAllMonster,
  updateMonster,
  deleteMonster,
};
