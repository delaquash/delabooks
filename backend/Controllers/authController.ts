import { NextFunction, Request, RequestHandler, Response } from 'express';
import User, { IUSER } from '../Model/User';
import generateToken from '../utils/GenerateToken';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Handles user registration by validating input, checking for existing users, 
 * and creating a new user account. Returns appropriate HTTP responses based 
 * on validation results and success of user creation.
 *
 * @param req - Express request object containing user details in the body
 * @param res - Express response object used to send HTTP responses
 * 
 * @returns A JSON response with a message indicating the result of the 
 * registration process. Possible responses include:
 * - 400 Bad Request: Missing fields, password too short, username too short, 
 *   username/email already exists.
 * - 201 Created: User successfully created.
 */

/*******  a81375a5-b851-4c22-bc80-eec2535bbd61  *******/
 export const registerRoute = async( req: Request, res: Response ) => {
    try {
        const { username, password, email } = req.body as IUSER;

        if(!username || !email) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        if(username.length < 3){
            return res.status(400).json({ message: 'Username must be at least 3 characters' });
        }

        // Check if user and username already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
          });
          
          if (existingUser) {
            if (existingUser.username === username) {
              return res.status(400).json({ message: 'Username already exists' });
            }
            if (existingUser.email === email) {
              return res.status(400).json({ message: 'Email already exists' });
            }
          }

        const profileImage = "https://api.dicebear.com/9.x/adventurer/svg?seed=Destiny"
       // Create new user
         const newUser = await User.create({
          username,
          password,
          email,
          profileImage
         });

         const token = generateToken(newUser._id)
         console.log("Generated token:", token);
         res.status(201).json({ 
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImage: newUser.profileImage,
            },
            message: 'User created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
} 

/*************  ✨ Windsurf Command ⭐  *************/

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' })
    }

    // check if user exists
    const user = await User.findOne({ email })
    if(!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }
    // compare password
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    // generate token
    const token = generateToken(user._id)

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      message: 'User logged in successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}