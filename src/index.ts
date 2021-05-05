import app from "./server";
import config from "../config.json";

const db = require("./app/db");
// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.info("Express application started on port: " + port);
    });
  })
  .catch((err: any) => console.log({ err }));
