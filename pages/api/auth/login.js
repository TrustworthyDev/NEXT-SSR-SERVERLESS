import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../utils/db';

export default handler = async (req, res) => {
    if(req.method != 'POST'){
        return res.status(405).end();
    }

    const { email, pasword } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if(!user || !(await compare(password, user.password))){
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.status(200).json({ token });
}