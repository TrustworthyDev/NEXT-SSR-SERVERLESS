import bcrypt from 'bcryptjs';
import pool from '../../../utils/db';

export default handler = async (req, res) => {
    if(req.method != 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await pool.query(
        `INSERT INTO USERS (email, password) VALUES (?, ?)`,
        [email, hashedPassword]
    )

    res.status(201).json({ user });
}