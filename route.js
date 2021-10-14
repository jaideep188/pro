const User = require('./../models/db')

const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')


router.post('/signup',(req,res)=>{
    let {name,email,password} = req.body;

    User.find({email}).then((result)=>{
        if (result.length){
            res.json({
                status:'FAILED',
                message:"User already exits"
            })
        }else{
            bcrypt.hash(password,10).then((hashedPassword)=>{
                const newUser = new User({
                    name,
                    email,
                    password:hashedPassword
                });
                newUser.save().then(result=>{
                    res.json({
                        status:'SUCCESS',
                        message:"DONE",
                        data: result,
                    })
                })
                .catch(err=>{
                    res.json({
                        status:'FAILED',
                        message:'An error while saving'
                    })
                })

            })
            .catch((err)=>{
                res.json({
                    status:'FAILED',
                    message:"Password error"
                })
            })
        }        
    }).catch((err)=>{
        console.log(err);
        res.json({
            status:'FAILED',
            message:'Error while checking for existing mail user'
        })
    })
})

router.post('/signin',(req,res)=>{
    let {email,password} = req.body;
    User.find({email}).then((data)=>{
        if (data){
            const hashedPassword = data[0].password;
            console.log(data)
            bcrypt.compare(password,hashedPassword).then(result=>{
                if (result){
                    res.json({
                        status:"SUCCESS",
                        message:"Sign in done",
                        data: data
                    })
                }else{
                    res.json({
                        status:"FAIL",
                        message:"Password mismatch"
                    })
                }
            }).catch(err=>{
                res.json({
                    status:'FAIL',
                    message:'password matching problem'
                })
            })
        }else{
            res.json({
                status:'FAIL',
                message:'wrong entry'
            })
        }
    }).catch(err=>{
        res.json({
            status:"FAIL",
            message:"Error while checking existing emails"
        })
    })
})

module.exports = router;