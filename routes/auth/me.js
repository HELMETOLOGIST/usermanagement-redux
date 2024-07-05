// const express = require('express');
// const axios = require('axios'); // Ensure that axios is imported
// const router = express.Router();

// router.post('/api/user_account/me', async (req, res) => {
//     const { access } = req.cookies;

//     try {
//         const apiRes = await axios.get(`${process.env.API_URL}/api/user_account/me`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${access}`
//             },
//         });
//         const data = await apiRes.json();

//         return res.status(apiRes.status).json(data);
//     } catch (error) {
//         if (error.response) {
//             return res.status(error.response.status).json(error.response.data);
//         } else if (error.request) {
//             return res.status(500).json({ error: 'No response received from the server' });
//         } else {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// });

// module.exports = router;
