module.exports = {
  set_water_pump: async function water_pum(req, res) {
    if (req.session && req.session.user_data) {
      try {
        const actual_status = req.session.actions.water_pum;
        req.session.actions.water_pum = !actual_status;

        return res.status(200).json({
          success: true,
          content: {
            message: "Estado actualizado! ",
            status: actual_status,
          },
        });
      } catch (error) {
        return res.status(200).json({
          success: false,
          content: {
            message: "Estado não actualizado! ",
            status: !actual_status,
          },
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        content: {
          message: "Sem sessão iniciada! ",
        },
      });
    }
  },
};
