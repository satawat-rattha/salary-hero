const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const userRepo = require('../repositories/user-pgdb')
const passwords = require('../libs/passwords')
const {jwt} = require('../config')

passport.use('login',new localStrategy({
    usernameField:'username',
    passwordField:'password',
},async(username,password,done) => {
    try {
        const user = await userRepo.getByUsername(username)
        if(!user){
            return done(null,false,{message:'User not found'})   
        }

        if (!passwords.compare(password,user.password)) {
            return done(null,false,{message:'Wrong Password'})
        }

        return done(null,user,{message:'Logged in Successfully'})
    } catch (error) {
        return done(error)
    }
}))

passport.use(new JWTStrategy({
    secretOrKey:jwt.secret,
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken()
},async (token,done) => {
    try {
        return done(null,token.user)
    } catch (error) {
        done(error)
    }
}))

module.exports = passport