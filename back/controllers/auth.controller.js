import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//Función para el registro.
export const register = async (req, res) => {
    const { username, email, password, activo, tipo } = req.body;
    try {
        const userFound = await User.findOne({email});

        if(userFound)
            return res.status(400).json(["Este correo ya está en uso"]);

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            activo,
            tipo
        })
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id});
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            tipo: userSaved.tipo,

        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

};
//Función para el login.
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: 
            "Usuario no Encontrado!"
        });
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ message: "Contraseña Incorrecta"});

        const token = await createAccessToken({ id: userFound._id});
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            tipo: userFound.tipo,
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

};
//Función para el logout
export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
//Función para el Perfil
export const profile =  async(req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({ message: "Usuario no encontrado!"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        tipo: userFound.tipo,
    })
    res.send('Bienvenido a tu Perfil')
};

//Función para el json webtoken
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if(!token) return res.status(401).json({ message: "Sín autorización"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Sín autorización"});

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({ message: "Sín autorización"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            tipo: userFound.tipo,
        });
    });
};