const db = require("./../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    const data = await db.query("SELECT ID, email, type from users");

    res
      .status(200)
      .json({ status: "success", results: data[0].length, data: { data: data[0] } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.query(
      `SELECT ID, email, type from users WHERE ID=?`,
      [id]
    );

    res.status(200).json({ status: "success", data: { users: data[0] } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, type } = req.body;


    const data = await db.query(
      `INSERT INTO users (email, password, type) VALUES (?,?,?)`,
      [email, password, type]
    );

    res.status(200).json({ status: "success", message: { data } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
