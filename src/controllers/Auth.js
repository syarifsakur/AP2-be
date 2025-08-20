import Admin from "../models/ModelAdmin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Berhasil Membuat Akun!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "Username tidak ditemukan!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { userId: user.uuid },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "24h" }
    );

    await Admin.update({ token }, { where: { uuid: user.uuid } });

    const dataForClient = {
      userId: user.uuid,
      username: user.username,
    };

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    });

    return res.status(200).json({ dataForClient, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan server.", error });
  }
};

export const refreshTokenAuth = async (req, res) => {
  try {
    const refreshToken = req.cookies.token;
    if (!refreshToken) return res.sendStatus(401);

    const user = await Users.findOne({
      where: {
        token: refreshToken,
      },
      include: {
        model: Roles,
        as: "roles",
        foreignKey: "role_id",
      },
    });

    if (!user) return res.sendStatus(401);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_TOKEN,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const userId = decoded.userId;

        const accessToken = jwt.sign(
          { userId },
          process.env.ACCESS_SECRET_TOKEN,
          {
            expiresIn: "10m",
          }
        );

        const dataForClient = {
          userId: user.uuid,
          email: user.email,
          username: user.username,
          fullname: user.fullname,
          role: user.roles?.role_key,
        };

        return res.status(200).json({ dataForClient, token: accessToken });
      }
    );
  } catch (error) {
    console.error("Error in refreshTokenAuth:", error);
    return res
      .status(500)
      .json({ message: "Server error", detail: error.message });
  }
};

export const logout = async (req, res) => {
  const { userId } = req;

  try {
    await Admin.update({ token: null }, { where: { uuid: userId } });

    res.clearCookie("token");
    return res.status(200).json({ message: "Anda berhasil logout!" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
