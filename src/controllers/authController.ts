const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var User = require("../modal/user");
const JWT_SECRET= process.env.JWT_SECRET 
exports.signup = async function (req: any, res: any) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ desc: "User already exists" });
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
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ newUser: newUser, token: token , desc:"User SignUp Successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async function (req: any, res: any) {
  try {
    const email = req.body.email;
    const password = req.body.password;
   
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(201).json({ desc: "User Not exists" });
    }
    bcrypt.compare(
      password,
      existingUser.password,
   
      function (error: any, isPasswordCorrect: any) {
        if (!isPasswordCorrect) {
          return res.status(400).json({ desc: "Invalid credentials" });
        }

        var token = jwt.sign(
          { email: existingUser.email, id: existingUser._id ,role: existingUser.role},
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token: token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ desc: "Something went wrong" });
  }
};












