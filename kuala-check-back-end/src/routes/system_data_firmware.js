const globals = require("../hooks/global");


module.exports = async function get_data_system(req, res) {
  const data = req.body;


  const command = globals.water_pump;

  console.log("| > dados do sistema: ", data.data);

  console.log("| > Estado atual da bomba de água: ", command);

  try {
    if (data.data) {

      globals.data_system = data.data;

      return res.status(200).json({
        success: true,
        content: {
          message: "dados recebidos com sucesso! ",
          actors: {
            water_pump: command,
          }
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        content: {
          message: "Erro no corpo da requisição! ",
          actors: {
            water_pump: command,
          }
        },
      });
    }
  } catch (error) {
    console.log("| > Erro interno no servidor: ", error);
    return res.status(500).json({
      success: false,
      content: {
        message: "Erro interno ",
        actors: {
          water_pump: command,
        }
      },
    });
  }
};
