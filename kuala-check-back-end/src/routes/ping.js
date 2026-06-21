module.exports = function ping(req, res) {
    return res.json({
        sucess: true,
        content: {
            message: "Pong ",
        }
    })
}