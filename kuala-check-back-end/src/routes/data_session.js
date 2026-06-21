module.exports =  function data_session(req, res) {
    res.json(req.sessionStore.sessions);
}