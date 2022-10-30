const express = require('express')
const app = express()
const port = 3000

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./key.json");

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

app.set('view engine',"ejs")


app.get('/', (req, res) => {
  res.send('hi hello vanakkam')
})

app.get('/signin', (req, res) => {
    res.render('signin')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/signinsubmit', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    db.collection('users')
        .where("email","==",email)
        .where("password","==",password)
        .get()
        .then((docs) => {
            if (docs.size > 0){
                res.render("home");
            }
            else{
                res.send("Login Failed")
            }
        });
});

app.get('/signupsubmit', (req, res) => {
    const full_name = req.query.full_name;
    const email = req.query.email;
    const password = req.query.password;
    db.collection('users').add({
        name:full_name,
        email:email,
        password:password,
    }).then(()=>{
        res.send("SIGNUP Successful.")
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})