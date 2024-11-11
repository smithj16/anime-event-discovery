// pages/api/auth/login.js
import axios from 'axios';
import { serialize } from 'cookie';

const baseUrl = 'https://99b5-67-165-141-227.ngrok-free.app';

// export default async function loginHandler(req, res) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     try {
//       // Forward the login request to your backend API
//       const response = await axios.post(`${baseUrl}/api/login`, {
//         email,
//         password,
//       });

//       // Extract the token and user data from the response
//       const { cookiesessiontoken, user } = response.data;

//       if (cookiesessiontoken) {
//         // Set the token in an HTTP-only cookie
//         res.setHeader(
//           'Set-Cookie',
//           serialize('cookiesessiontoken', cookiesessiontoken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             path: '/',
//             maxAge: 60 * 60 * 24 * 7, // 1 week
//           })
//         );

//         // Return user data
//         return res.status(200).json({ user });
//       } else {
//         // Handle case where token is not returned
//         return res.status(400).json({ message: 'Authentication failed' });
//       }
//     } catch (error) {
//       // Handle errors from the backend API
//       console.error('Login error:', error.response?.data || error.message);
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } else {
//     // Handle incorrect HTTP methods
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

//Testng function for loginHandler
export default async function loginHandler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Simulate authentication success
    const cookiesessiontoken = 'hardcoded-token-for-testing';

    // Simulate user data
    const user = {
      id: 1,
      firstName: 'Joshua',
      lastName: 'Smith',
      email: email,
      avatar: "tengen",
      userName: "ThatFla$hyBoi"
    };

    // Set the token in an HTTP-only cookie
    res.setHeader(
      'Set-Cookie',
      serialize('cookiesessiontoken', cookiesessiontoken, {
        httpOnly: true,
        secure: false, // Set to false for local testing (true in production)
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
    );

    // Return user data
    return res.status(200).json({ user });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}