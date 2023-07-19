import jwt from 'jsonwebtoken'

export const CreateToken = (data, expaire = '1d' ) => {

    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn : expaire
    });

};