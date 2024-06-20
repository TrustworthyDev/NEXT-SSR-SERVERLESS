import { bash } from 'bcryptjs';
import { prisma } from '../../../utils/db';

export default handler = async (req, res) => {
    if(req.method != 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;
    const hasedPassword = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hasedPassword
        }
    })

    res.status(201).json({ user });
}