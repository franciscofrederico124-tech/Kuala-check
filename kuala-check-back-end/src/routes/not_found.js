module.exports = function not_found(req, res)
{
    return res.json({
        success: false,
        content: {
            message: "Route not found! ",
        }
    })
}