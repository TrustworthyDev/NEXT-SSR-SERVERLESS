import { verify } from 'jsonwebtoken';
import { prisma } from '../../../utils/db';

export default handler = async (req, res) => {
    const { authrization } = req.heanders;

    if(!authrization){
        return res.status(401).end();
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).end()
    }
}