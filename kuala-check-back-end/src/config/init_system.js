const db = require("./data_base_config");
const bcrypt = require("bcryptjs");

module.exports = async function init_system() {
  const table_one = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL, 
        password TEXT NOT NULL,
        session TEXT DEFAULT 'off'
      );
    `;

  const create_default_user = `
    INSERT INTO users ( name, email, password ) VALUES ( @name, @email, @password );
  `;

  const verify_default_user = `
    SELECT name FROM users WHERE email = ?
  `;

  const default_user = {
    "name": "Kuala admin",
    "email": "kualaadmin2026@gmail.com",
    "password": "kualaadmin2026",
    "password_hashed": await bcrypt.hash("kualaadmin2026", 10),
  }

  try {
    db.prepare(table_one).run();
    const exists = db.prepare(verify_default_user).get(default_user.email);
    console.log(exists);

    if (!exists) {
      db.prepare(create_default_user).run(
        {
          name: default_user.name,
          email: default_user.email,
          password: default_user.password_hashed,
        }
      )
    }
    console.log("\n| > Banco de dados configurado com sucesso! ");
    console.log("| ''''''''''''''''''''''''''''''''''''''''''''|");
    console.log("|           Dados da conta padrão             |");
    console.log(`| > Nome : ${default_user.name}                        |`);
    console.log(`| > Email: ${default_user.email}           |`);
    console.log(`| > Pass : ${default_user.password}                     |`);
    console.log(`| > Pass criptgrafada: *******************    |`);
    console.log("|'''''''''''''''''''''''''''''''''''''''''''''|\n");
  }
  catch (error) {
    console.log("Ocorreu um erro: ", error)
  }
}