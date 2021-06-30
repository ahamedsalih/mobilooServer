const express=require("express")
const router = express();
const passport=require("passport")
const GoogleStrategy=require("passport-google-oauth20")
const User=require("../models/userAuth")

const google = {
  clientID: '1062621261439-7lv5q9seva7ubke1ac1t7arp7fj75bma.apps.googleusercontent.com',
  clientSecret: 'gSGyllC7tFMBV5V0d2q6efSa',
  callbackURL: 'http://localhost:5000/auth/google/callback',
};



// Register Google Passport strategy
passport.use(new GoogleStrategy(google,
  async (accessToken, refreshToken, profile, done)=>{
    console.log(profile)
  User.create({googleId:profile.id},(err,user)=>{
    return done(err,user)
  }).catch(err=>console.log)
  }
));

router.use(passport.initialize());
router.use(passport.session());
// Serialize user into the sessions
// Initialize Passport


// passport registration
passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne( {googleId: id})
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// Set up Google auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect("/"));

module.exports=router;