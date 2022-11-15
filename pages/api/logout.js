import { serialize } from "cookie";

export default async function logout(req, res) {
  res.setHeader("Set-Cookie", [
    serialize("token", "", {
      expires: new Date(0),
      path: "/",
    })
  ]);

  return res.status(200).json({
    status: 200,
    message: "Successfully logged out",
  });
};
