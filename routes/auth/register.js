const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/api/user_account/register', async (req, res) => {
    const { username, email, password } = req.body;

    const body = {
        username,
        email,
        password
    };

    try {
        const apiRes = await axios.post(`${process.env.API_URL}/api/user_account/register`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = apiRes.data;

        return res.status(apiRes.status).json(data);
    } catch (err) {
        return res.status(500).json({
            error: 'Failed to register user',
        });
    }
});

module.exports = router;
