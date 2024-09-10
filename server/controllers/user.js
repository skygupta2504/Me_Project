import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Generating token with secret: from signin', secret);

    const oldUser = await UserModal.findOne({ email });
     console.log("old user data : ",oldUser);
    console.log("real check");
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    console.log("1");
    
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    console.log(await bcrypt.hash(password, 12));
    console.log(oldUser.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log("Error from Signin Controller")
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  
  const { email, password, firstName, lastName } = req.body;

  try {
    console.log('Generating token with secret:', secret);
    const oldUser = await UserModal.findOne({ email });
    console.log('Generating token with secret1', secret);
    if (oldUser) return res.status(400).json({ message: "User already exists" });
console.log("email: ",email)
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Generating token with hashed : ', hashedPassword);
    console.log(`${firstName} ${lastName}`);
      const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
      console.log("result:", result);
   
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    console.log(token);
    res.status(201).json({ result, token });
  } catch (error) {
    console.log('Secret:', secret);
    console.log("Error From Controller")
    res.status(500).json({ message: "Something went wrong" });
  }
};