const db = require("../config/data_base_config");

module.exports = async function remove_account(req, res) {
    if (req.session && req.session.user_data && +req.session.user_data.id !== 1) {
        try {
            const delete_user = `
                DELETE FROM users WHERE id = ?
            `;
            db.prepare(delete_user).run(req.session.user_data.id);
            req.session.destroy((err) => {
                if (err) {
                    console.error("Erro ao destruir a sessão:", err);
                }
            });

            return res.status(200).json({
                success: true,
                status: 200,
                content: {
                    message: "Conta removida com sucesso! ",
                }
            })
        }
        catch (error) {
            console.error("Erro ao remover conta:", error);
            return res.status(500).json({
                success: false,
                status: 500,
                content: {
                    message: "Erro interno! ",
                }
            })
        }
    }
    else if (req.session && req.session.user_data && +req.session.user_data.id === 1) {
        return res.status(403).json({
            success: false,
            status: 403,
            content: {
                message: "A conta do administrador não pode ser removida! ",
            }
        })
    }
    else {
        return res.status(401).json({
            success: false,
            status: 401,
            content: {
                message: "Nenhuma sessão iniciada! ",
            }
        })
    }
}