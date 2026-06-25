const globals = require("../hooks/global");

module.exports = {
  set_water_pump: async function water_pum(req, res) {

    const { command } = req.body;

    if (req.session && req.session.user_data) {
      try {
        const actual_status = globals.water_pump;
        const new_status = command;
        globals.water_pump = command;

        return res.status(200).json({
          success: true,
          content: {
            message: "Estado actualizado! ",
            status: new_status,
          },
        });
      } catch (error) {
        return res.status(200).json({
          success: false,
          content: {
            message: "Estado não actualizado! ",
            status: actual_status,
          },
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        content: {
          message: "Sem sessão iniciada! ",
          status: actual_status,
        },
      });
    }
  },
};
