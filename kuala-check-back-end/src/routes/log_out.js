module.exports = async function log_out(req, res) {
  try {
    if (req.session && req.session.user_data) {
      req.session.destroy((error) => {
        if (error) {
          return res.status().json({
            success: false,
            status: 500,
            content: {
              message: error,
            },
          });
        } else {
          res.clearCookie("connect.sid");
          return res.status(200).json({
            success: true,
            status: 200,
            content: {
              message: "Sessão terminada ",
            },
          });
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        status: 401,
        content: {
          message: "Sem nenhuma sessão detectada! ",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      content: {
        message: errorMonitor.message,
      },
    });
  }
};
