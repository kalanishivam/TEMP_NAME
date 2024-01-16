const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');


const jwt_secret = 'SAMPLESECRET';   // to be changed later

exports.handleSignup  = async (req, res)=>{
    try{
        const {name, email , password, phone} = req.body;

        const existingUser = await user.findOne({ $or: [{ email }, { phone }] });  // yet to be created

        if(existingUser){
            return res.status(400).json({error : "Email already existis"});
        }else{
            const salt = bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(password , salt);
            const newUser = await User.create({
                name,
                email, 
                phone,
                password : hashedPassword
            })

            const payload = {
                userPayload : {
                    name : name,         // payload to be updated later
                    email : email
                }
            }
            const authToken  = jwt.sign(payload, jwt_secret);
            return res.status(201).json({success : true , authToken : authToken , userEmail : newUser.email})
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

        const isExists = await User.findOne({$or : [{email} ,{phone}, {username} ]});
        if(!isExists){
            return res.staus(400).json({error : "INVALID USER  CREDENTIALS"});
        }else{
            const passwordCompare = await bcrypt.compare(password , userFind.password);  // comparing passwords
            if(!passwordCompare){
                return res.status(400).json({error : "INVALID USER CREDENTIALS"});
            }else{

                const payload = {
                    userPayload : {
                        email : email,           // payload to be updated later
                        username : userName,
                        phone : phone
                    }
                }
                const authToken = jwt.sign(payload, jwt_secret, { expiresIn: '24h' });
                return res.status(200).json({ result: { authToken: authToken, user : payload } });
            }

        }


    }catch(error){
        console.log(`errror in handle-Login : ${error.message}`)
        return res.status(500).json({error  : "INTERNAL SERVER ERROR "});
    }
}