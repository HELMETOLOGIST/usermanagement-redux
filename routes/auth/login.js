const express = require('express');
const axios = require('axios');
const cookie = require('cookie');
const router = express.Router();

router.post('/api/user_account/login', async (req, res) => {
    const { email, password } = req.body;

    const body = JSON.stringify({ email, password });

    try {
        const apiRes = await axios.post(`${process.env.API_URL}/api/token/`, {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });

        const data = await apiRes.json()

        if (apiRes.status == 200) {
            res.setHeader('Set-Cookie', [
                cookie.serialize('access', data.access, {
                    httpOnly: true,
                    maxAge: 60 * 30,
                    sameSite: 'strict',
                    path: '/api/',
                    secure: process.env.NODE_ENV === 'production',
                }),
                cookie.serialize('refresh', data.refresh, {
                    httpOnly: true,
                    maxAge: 60 * 60 *24,
                    sameSite: 'strict',
                    path: '/api/',
                    secure: process.env.NODE_ENV === 'production',
                // `access_token=${data.access}; HttpOnly; Max-Age: 1800; Path: /api/; SameSite: Strict`,
                }),
            ]);
            return res.status(200).json({success: 'Logged in successfully'});
        } else {
            return res.status(apiRes.status).json(data);
        }
    } catch(err) {
        return res.status(500).json({
            error: 'Something went wrong. Please try again later.',
        });
    }
});

module.exports = router;