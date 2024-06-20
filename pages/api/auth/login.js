import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import pool from '../../../utils/db';

export default handler = async (req, res) => {
    if(req.method != 'POST'){
        return res.status(405).end();
    }

    const { email, pasword } = req.body;
    const [users] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if(users.length == 0){
        return req.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
}