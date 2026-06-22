module.exports = function me(req, res) {
  if (!req.session || !req.session.user_data) {
    return res.status(401).json({
      success: false,
      message: "Sessão inválida ou expirada.",
    });
  }

  return res.status(200).json({
    success: true,
    user: req.session.user_data,
    data_system: req.session.system_data,
  });
};
