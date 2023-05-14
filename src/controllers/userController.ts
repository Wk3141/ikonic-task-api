var User = require("../modal/user");
// Get all users from
const jwt_user = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const JWT_user_SECRET = process.env.JWT_SECRET;

exports.getUsers = async function (req: any, res: any, next: any) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create all users from database

exports.createUser = async function (req: any, res: any, next: any) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Password encrpting with bcrypt
    const encrypted_password = await bcrypt.hash(password, 10);

    //Storing data in db via mongoose User model
    const newUser = await User.create({
      name,
      email,
      password: encrypted_password,
      role,
    });
    const token = jwt_user.sign(
      { email: newUser.email, id: newUser._id },
      JWT_user_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ newUser: newUser, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// // Get single user by email

exports.getUserByID = async function (req: any, res: any) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// //  Update user by id

exports.updateUserByID = async function (req: any, res: any) {
  try {
    const { id } = req.params;
    const { role, name, password, oldPassword } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role) {
      user.role = role;
    }

    if (name) {
      user.name = name;
    }

    if (password && oldPassword) {
      const match_password = await bcrypt.compare(oldPassword, user.password);
      if (!match_password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const encrypted_password = await bcrypt.hash(password, 10);
      user.password = encrypted_password;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// //  Delete user by email

exports.deleteUserByID = async function (req: any, res: any) {
  const id = req.params.id;

  try {
   
    const deletedUser = await User.findByIdAndDelete(id);


    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
