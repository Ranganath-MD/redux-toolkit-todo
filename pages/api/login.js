import { serialize } from "cookie";

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

let users = [];

const generateToken = async (user) => {
  const tokenData = {
    email: user.email,
    createdAt: Number(new Date()),
  };
  const token = jwt.sign(tokenData, "secret@1212");
  return token;
};

const encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const encryptedPassword = await bcryptjs.hash(password, salt);
  return encryptedPassword;
};

const addUser = async (req, res) => {
  const { username, email } = req.body;
  const password = await encryptPassword(req.body.password);
  const token = await generateToken(req.body);

  req.body.password = password;
  req.body.token = token;
  users.push(req.body);

  res.setHeader(
    "Set-Cookie",
    serialize("token", String(token), {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: true,
      sameSite: "strict",
      path: "/"
    })
  );
  

  res.status(200).send({ username, email, token });
};

export default async function login(req, res) {
  if (users.length === 0) {
    await addUser(req, res);
  } else {
    const user = users.find(
      (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
    );

    if (user) {
      res
        .status(409)
        .json({ message: `User already exists with this ${req.body.email}` });
    } else {
      await addUser(req, res);
    }
  }
}
