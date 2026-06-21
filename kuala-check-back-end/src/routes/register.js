const db = require("../config/data_base_config");
const bcrypt = require("bcryptjs");

module.exports = async function Register(req, res) {
    const { first_name, last_name, email, password } = req.body;

    const valid_email = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);

    try {
        if (req.session && req.session.user_data) {
            if (!first_name.trim() || first_name.trim().length < 3) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Insira o primeiro nome correctamente! ",
                    }
                });
            }
            if (!last_name.trim() || last_name.trim().length < 3) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Insira o segundo nome correctamente! ",
                    }
                });
            }
            if (!email.trim() || email.trim().length < 5 || !valid_email) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Insira um email válido! ",
                    }
                });
            }

            if (!password.trim() || password.trim().length < 10) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Insira uma password válida! ",
                    }
                });
            }

            const completed_name = `${first_name.trim().toLowerCase()} ${last_name.trim().toLowerCase()}`;
            const password_hased = await bcrypt.hash(password, 10);

            const existent_user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

            if (existent_user) {
                return res.status(409).json({
                    success: false,
                    status: 409,
                    content: {
                        message: "Este email já está vincuado a uma conta! ",
                    }
                });
            }
            else {
                const create_new_account = "INSERT INTO users (name, email, password ) VALUES ( @name, @email, @password )";
                db.prepare(create_new_account).run({
                    name: completed_name,
                    email: email,
                    password: password_hased,
                });

                return res.status(200).json({
                    success: true,
                    status: 200,
                    content: {
                        message: "Nova conta criada ",
                    }
                });
            }
        }
        else {
            return res.status(401).json({
                success: false,
                status: 401,
                content: {
                    message: "Nenhuma sessão activa! ",
                }
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            status: 400,
            content: {
                message: error.message,
            }
        });
    }
}