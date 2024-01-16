const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/User.js')


const jwt_secret = 'SAMPLESECRET';   // to be changed later

exports.handleSignup  = async (req, res)=>{
    try{
        const {name, email , password, phone, userName} = req.body;

        // const existingUser = await User.findOne({ $or: [{ email }, { phone }] });  // yet to be created
        const existingUser = await User.findOne({email})


        if(existingUser){
            return res.status(400).json({error : "Email already existis"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt);
            const newUser = await User.create({
                name,
                email, 
                phone,
                password : hashedPassword,
                username : userName
            })

            const payload = {
                userPayload : {
                    email : email,
                    username : userName,
                    phone : phone,
                    name : name,         // payload to be updated later
                }
            }
            const authToken  = jwt.sign(payload, jwt_secret);
            return res.status(201).json({ result: {authToken : authToken , user : payload}})
        }

    }catch(error){
        console.log(`error in handle-Signup : ${error.message}`);
        return res.status(500).json({ error: "error creating user" });
    }
}



exports.handleLogin = async (req, res)=>{
    try{
        const {email , password, phone, userName} = req.body;
        if(!email || !password){
            return res.status(400).json({error : "PLEASE PROVIDE ALL DETAILS"});
        }

        const isExists = await User.findOne({$or : [{email} ,{phone}, {userName} ]});
        if(!isExists){
            return res.staus(400).json({error : "INVALID USER  CREDENTIALS"});
        }else{
            if(isExists.block == true){
                return res.status(400).json({error : "YOU ARE BLOCKED. CONTACT ADMIN FOR SUPPORT"})
            }
            const passwordCompare = await bcrypt.compare(password , isExists.password);  // comparing passwords
            if(!passwordCompare){
                return res.status(400).json({error : "INVALID USER CREDENTIALS"});
            }else{

                const payload = {
                    userPayload : {
                        email : email,           // payload to be updated later
                        username : isExists.username,
                        phone : isExists.phone,
                        name : isExists.name
                    }
                }
                const authToken = jwt.sign(payload, jwt_secret, { expiresIn: '24h' });
                return res.status(201).json({ result: { authToken: authToken, user : payload } });
            }

        }


    }catch(error){
        console.log(`errror in handle-Login : ${error.message}`)
        return res.status(500).json({error  : "INTERNAL SERVER ERROR "});
    }
}