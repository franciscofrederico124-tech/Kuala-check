const db = require("../config/data_base_config");
const bcrypt = require("bcryptjs");

const globals = require("../hooks/global");

module.exports = async function Login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      status: 400,
      content: { message: "Preencha todos os campos!" },
    });
  }

  const cleanEmail = email.trim();
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (cleanEmail.length < 5 || !email_regex.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      status: 400,
      content: { message: "Insira um email válido!" },
    });
  }

  if (password.length < 10) {
    return res.status(400).json({
      success: false,
      status: 400,
      content: { message: "Credenciais incorretas!" },
    });
  }

  try {
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(cleanEmail);

    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        status: 400,
        content: { message: "Credenciais incorretas!" },
      });
    }

    const valid_password = await bcrypt.compare(password, user.password);

    if (!valid_password) {
      return res.status(400).json({
        success: false,
        status: 400,
        content: { message: "Credenciais incorretas!" },
      });
    }

    req.session.regenerate((err) => {
      if (err) {
        console.error("Erro ao regenerar sessão:", err.message);
        return res.status(500).json({
          success: false,
          status: 500,
          content: { message: "Erro interno ao iniciar sessão!" },
        });
      }

      const names = (user.name || "").trim().split(/\s+/);
      const first_name = names[0] || "";
      const last_name = names.length > 1 ? names[names.length - 1] : "";

      req.session.user_data = {
        id: user.id,
        name: user.name,
        first_name: first_name,
        last_name: last_name,
        email: user.email,
      };

      req.session.save((error) => {
        if (error) {
          console.error("Erro ao salvar sessão:", error.message);
          return res.status(500).json({
            success: false,
            status: 500,
            content: { message: "Erro ao estabelecer sessão!" },
          });
        }

        return res.status(200).json({
          success: true,
          status: 200,
          content: { message: "Sessão iniciada com sucesso!" },
        });
      });
    });

  } catch (error) {
    console.error("| > Erro no processo de Login: ", error);
    return res.status(500).json({
      success: false,
      status: 500,
      content: { message: "Ocorreu um erro interno no servidor!" },
    });
  }
};
