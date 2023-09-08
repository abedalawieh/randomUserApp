import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "randomuserapp",
});
db.connect((error) => {
  if (error) throw error;
  console.log("database connected succesfully");
});
export { db };
