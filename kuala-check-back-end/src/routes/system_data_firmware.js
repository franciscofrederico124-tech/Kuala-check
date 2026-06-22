module.exports = async function get_data_system(req, res) {
  const { data } = req.body;

  try {
    if (data.system && data.data.actors && data.data.sensors) {
      req.session.system_data = data;

      const comand = req.session.actions.water_pump;

      return res.status(200).json({
        sucess: true,
        content: {
          message: "dados recebidos com sucesso! ",
        },
      });
    } else {
      return res.status(400).json({
        sucess: false,
        content: {
          message: "Erro nocorpoa da requisição! ",
          water_pump: command,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: true,
      content: {
        message: "Erro interno ",
      },
    });
  }
};
