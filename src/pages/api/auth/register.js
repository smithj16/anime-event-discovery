// pages/api/auth/register.js
import axios from 'axios';
import { serialize } from 'cookie';

const baseUrl = 'https://99b5-67-165-141-227.ngrok-free.app';

export default async function registerHandler(req, res) {
  if (req.method === 'POST') {
    const userData = req.body;

    try {
      // Forward the registration request to your backend API
      const response = await axios.post(`${baseUrl}/api/register`, userData);

      // Extract the token from the response (adjust according to your API)
      const { token } = response.data.token;

      if (token) {
        // Set the token in an HTTP-only cookie
        res.setHeader(
          'Set-Cookie',
          serialize('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
          })
        );

        // Return success response
        return res.status(200).json({ message: 'Registration successful' });
      } else {
        // Handle case where token is not returned
        return res.status(400).json({ message: 'Registration failed' });
      }
    } catch (error) {
      // Handle errors from the backend API
      console.error('Registration error:', error.response?.data || error.message);
      return res.status(400).json({ message: 'Registration failed' });
    }
  } else {
    // Handle incorrect HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
