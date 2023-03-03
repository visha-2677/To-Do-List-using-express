const express=require("express");
const bodyParser= require("body-parser");
const date= require(__dirname+"/date.js");
const app=express();

// avoid var key use in globle variable use let and const key word
let items =["Buy Food","Cook Food","Eat Food"];
let workitems=[];

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

    // V1
    // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay 
    // var today=new Date();
    // var currentDay=today.getDay();
    // var day="";
    // // if(today.getDay() === 6 || today.getDay() === 0){
    // //     // res.send("<h1>Ye its's weekend</h1>");//multiple html is use for res.write() method
    // //     // res.write("<h1>Ye its's weekend</h1>");
    // //     // send html file than 
    // //     // res.sendFile(__dirname+"/weekend.html");

    // //     // use "Ejs" than simple from website https://ejs.co/
    // //     day="weekend";
        
    // // }
    // // else{
    // //     // res.write("<p>It is not weekend !.</p>")
    // //     // res.write("<h1>Work it .</h1>");
    // //     // res.send();//why this res.send(); all message of res.write() can send
    // //     // send html file than 
    // //     // res.sendFile(__dirname+"/notweekend.html");

    // //     // use "Ejs" than simple from website https://ejs.co/
    // //     day="weekday";
    // // }

    // // simple to use switch  statement
    // switch(currentDay){
    //     case 0: day="Sunday";
    //     break;
    //     case 1: day="Monday";
    //     break;
    //     case 2: day="Tuesday";
    //     break;
    //     case 3: day="Wednesday";
    //     break;
    //     case 4: day="Thursday";
    //     break;
    //     case 5: day="Friday";
    //     break;
    //     case 6: day="Saturday";
    //     break;
    //     default:
    //         console.log("Error: current day is equal to:"+ currentDay);
    
    // }
    // // https://github.com/mde/ejs/wiki/Using-EJS-with-Express this website
    // res.render("list",{kindofDay: day});






 
    // V2
    // more than function than function of getDate() function call
    // let day=date.getDay();
    let day=date.getDate();
    // console.log(day);
    // current day can add list item in ejs file than use newListItem:item 
    res.render("list",{ListTitle:day,newListItem:items});

});

app.post("/",function(req,res){
    // console.log("add");
    // var item=req.body.newItem;

    console.log(req.body);//how to point workitems ? 

    var item=req.body.newItem;
    if(req.body.list === "Work"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

    // console.log(add); 
    //res.render("list",{newListItem:item}); //this not work because of every day in todo list not add listitem than only current data can add item in todo list than get request in res.render("list",{kindofDay:day,newListItem:item}); and post request is redirect to get request than item var can globle varible

})

app.get("/work",function(req,res){
    res.render("list",{ListTitle:"Work List",newListItem:workitems});
})
// not work because of redirect by ejs file in post method action is "/" than  push item in items array not push in workitems than post method "/" in logic of if else method to solve it
// app.post("/work",function(req,res){
//     let item=req.body.newItem;
//     workitems.push(item);
//     res.redirect("/work");
// })

app.get("/about",function(req,res){
    res.render("about");
})
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
