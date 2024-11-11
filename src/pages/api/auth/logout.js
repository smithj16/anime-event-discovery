// pages/api/auth/logout.js

import { serialize } from 'cookie';

export default function logoutHandler(req, res) {
  if (req.method === 'POST') {
    // Clear the token cookie
    res.setHeader(
      'Set-Cookie',
      serialize('cookiesessiontoken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0),
      })
    );

    return res.status(200).json({ message: 'Logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
