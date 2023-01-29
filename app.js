const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ICO = require("icojs")
mongoose.set('strictQuery', false);

const app= express();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static("public"))

mongoose.connect("mongodb+srv://gautam:gautam01@cluster0.zevujkx.mongodb.net/FitnessHubDB", {useNewUrlParser : true});
 
//Schema
const detailSchema = mongoose.Schema({
    name :{
        type:String,
        required : [1,"Please Give Task"]
    },
    email : {
        type : String,
        required : [1,"Please Enter Your Email"]
    },
    goals :{
        type : String,
        required : [1,"Please Select your goal"]
    },
    Deit : {
        type : String,
        required : [1,"Please mention your diet"]
    },
    baseline :{
        type : String,
        required : [1,"Please mention your Baseline"]
    },
    Gender : {
        type : String,
        required : [1,"Please select Gender"]
    },
    age : {
        type : Number,
        required : [1,"Please Enter your age"]
    },
    height:  {
        type: Number,
        required : [1,"Please Enter your height"]
    },
    weight : {
        type : Number,
        required : [1,"Please Enter your Wieght"]
    },
    tweight :
    {
        type : Number,
        required : [1,"Please Enter your Target Wieght"]
    },
    pwd : {
        type : String,
        required : [1,"Please Enter your Password"]
    },
    cpwd : {
        type : String,
        required : [1,"Please Conform your Password"]
    }
});
//Model
const Person = mongoose.model("person",detailSchema);


app.get("/",(req,res)=>{
    res.render("index");
})


app.get("/register",(req,res)=>{
    res.render("signup");
});

app.post("/register",(req,res)=>{


    // console.log(req.body.name);
    const newperson = new Person({
        name : req.body.name,
        email : req.body.email,
        goals : req.body.goals,
        baseline : req.body.baseline,
        Deit : req.body.Deit,
        Gender : req.body.gender,
        age : req.body.age,
        height : req.body.height,
        weight : req.body.weight,
        tweight : req.body.tweight,
        pwd : req.body.pwd,
        cpwd : req.body.cpwd
    });
    newperson.save();
    res.render("signin");
})



app.get("/login",(req,res)=>{
    res.render("signin");
})
let bmi = 0; 
let tweight = 0;
let goal = ""
app.post("/login",(req,res)=>{

    Person.findOne({email : req.body.email},(err,doc)=>{
        if (err) console.log(err);
        if (doc==null) res.send("Email not found");
        else {
            if (doc.pwd === req.body.pwd)
            {
                const h= (doc.height)/100;
                bmi=Math.round((doc.weight)/(h*h));
                tweight = doc.tweight;
                goal = doc.goals;
                res.render("home_after");
            }
            else res.send("Wrong Password");
        }
    })

})

app.get("/journey",(req,res)=>{
        const objt={bmi,tweight,goal}
        res.render("journey",{obj:objt});
})

app.get("/:page",(req,res)=>{
    const page = req.params.page;
    res.render(page);
})






app.listen(3000,()=>
{
    console.log("Server is Started at port:3000");
})
