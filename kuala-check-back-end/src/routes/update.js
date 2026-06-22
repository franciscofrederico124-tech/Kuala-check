const db = require("../config/data_base_config")
const bcrypt = require("bcryptjs");

module.exports = async function updte(req, res) {
    const { data } = req.body;
    console.log("Dados recebidos para atualização:", data);

    if (req.session && req.session.user_data) {
        try {
            if (!data.current_password || data.current_password.length < 10) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Senha atual é obrigatória e deve ter pelo menos 10 caracteres!",
                    }
                })
            }

            const user = db.prepare("SELECT password FROM users WHERE id = ?").get(req.session.user_data.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    status: 404,
                    content: {
                        message: "Usuário não encontrado!",
                    }
                })
            }

            const valid_current_password = await bcrypt.compare(data.current_password, user.password);

            if (!valid_current_password) {
                return res.status(401).json({
                    success: false,
                    status: 401,
                    content: {
                        message: "Senha atual incorreta!",
                    }
                })
            }

            if (!data.new_name || data.new_name.length < 3) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Primeiro nome inválido! ",
                    }
                })
            }
            if (!data.new_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.new_email)) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Email inválido! ",
                    }
                })
            }
            if (!data.new_last_name || data.new_last_name.length < 3) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Ultimo nome inválido! ",
                    }
                })
            }
            if (!data.new_password || data.new_password.length < 10) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "Senha inválida! ",
                    }
                })
            }
            if (!data.new_confirm_password || data.new_password !== data.new_confirm_password) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    content: {
                        message: "As senhas não coincidem! ",
                    }
                })
            }

            const update = `
                UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?
            `
            const new_password_hashed = await bcrypt.hash(data.new_password, 10);
            db.prepare(update).run(
                `${data.new_name.trim()} ${data.new_last_name.trim()}`,
                data.new_email,
                new_password_hashed,
                req.session.user_data.id
            )

            return res.status(200).json({
                success: true,
                status: 200,
                content: {
                    message: "Dados atualizados com sucesso!",
                }
            })
        }

        catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).json({
                success: false,
                status: 500,
                content: {
                    message: "Erro interno! ",
                }
            })
        }
    }
    else {

        return res.status(401).json({
            success: false,
            status: 401,
            content: {
                message: "Nenhuma sessão  iniciada! ",
            }
        })
    }
}

