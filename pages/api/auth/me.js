import jwt from 'jsonwebtoken';
import pool from '../../../utils/db';

export default handler = async (req, res) => {
    const { authrization } = req.heanders;

    if(!authrization){
        return res.status(401).end();
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.userId])

        if(users.length === 0){
            return res.status[401].end();
        }

        res.status(200).json({ user: users[0] });
    } catch (error) {
        res.status(401).end()
    }
}