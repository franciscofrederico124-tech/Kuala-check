const db = require("../config/data_base_config");
const bcrypt = require("bcryptjs");

module.exports = async function Login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            status: 400,
            content: { "message": "Preencha todos os campos! " }
        });
    }

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid_email = email_regex.test(email);

    try {
        if (!email.trim() || email.trim().length < 5 || !valid_email) {
            return res.status(400).json({
                success: false,
                status: 400,
                content: { "message": "Insira um email válido! " }
            });
        }
        if (!password.trim() || password.trim().length < 10) {
            return res.status(400).json({
                success: false,
                status: 400,
                content: { "message": "Insira uma password válida! " }
            });
        }

        const data = db.prepare("SELECT * FROM users WHERE email = ? ").get(email);

        if (!data || !data.password) {
            return res.status(400).json({
                success: false,
                status: 400,
                content: { "message": "Usuário não encontrado! " }
            });
        }

        const valid_password = await bcrypt.compare(password, data.password);

        if (!valid_password) {
            return res.status(400).json({
                success: false,
                status: 400,
                content: { "message": "Password incorrecta! " }
            });
        }

        req.session.regenerate((err) => {
            if (err) {
                console.log("Erro ao regenerar sessão:", err.message);
                return res.status(500).json({
                    success: false,
                    status: 500,
                    content: { "message": "Erro interno ao iniciar sessão! " }
                });
            }
            const names = data.name.split(" ");
            req.session.user_data = {
                id: data.id,
                name: data.name,
                first_name: names[0],
                last_name: names[1],
                email: data.email,
            };

            req.session.save((error) => {
                if (error) {
                    console.log("Erro ao salvar sessão:", error.message);
                    return res.status(500).json({
                        success: false,
                        status: 500,
                        content: { "message": "Sessão não iniciada! " }
                    });
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    content: { "message": "Sessão iniciada com sucesso! " }
                });
            });
        });

    } catch (error) {
        console.log("| > Ocorreu um erro: ", error);
        return res.status(500).json({
            success: false,
            status: 500,
            content: { "message": "Ocorreu um erro interno! " }
        });
    }
}