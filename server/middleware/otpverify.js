import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const otpVerificationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.otpToken;

    if (!token) {
      return res.status(401).send('Unauthorized: No OTP token provided');
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

    if (user && !user.otp) {
      // User is OTP verified
      req.otpToken = token;
      req.otpVerifiedUser = user;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: User is not OTP verified' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
