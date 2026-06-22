const express = require("express");
const session = require("express-session");
const cors = require("cors");

const ping = require("./src/routes/ping");
const init_system = require("./src/config/init_system");
const data_session = require("./src/routes/data_session");
const get_data_system = require("./src/routes/system_data_firmware");
const { set_water_pump } = require("./src/routes/actions");
const me = require("./src/routes/me");
const updte = require("./src/routes/update");
const remove_account = require("./src/routes/remove_account");

const Login = require("./src/routes/login");
const register = require("./src/routes/register");
const log_out = require("./src/routes/log_out");

const server = express();
const door = 4000;

init_system();

server.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
server.use(express.json());
server.use(
  session({
    name: "kuala_session",
    secret: "kuala_check_secret_key",
    resave: false,
    saveUninitialized: false,
    credentials: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  }),
);

server.post("/login", Login);
server.post("/logout", log_out);
server.post("/register", register);
server.post("/update", updte);
server.post("/remove_account", remove_account);

server.post("/system/send_data", get_data_system);
server.get("/ping", ping);

server.get("/system/session", data_session);
server.get("/system/set_water_pump", set_water_pump);
server.get("/system/me", me);

server.listen(door, () => {
  console.log("|-----------------------------|");
  console.log("| > Servidor on               |");
  console.log(`| > Porta: ${door}               |`);
  console.log(`| > http://localhost:${door}     |`);
  console.log("|_____________________________| ");
  console.log("|   Rotas disponiveis         |");
  console.log("| > /ping     (GET)           |");
  console.log("| > /remove_account (DELETE)  |");
  console.log("| > /system/me (POST)         |");
  console.log("|-----------------------------|");
});
