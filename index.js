const express=require('express');
const app=express();
const mongodb=require('mongodb');
const bodyParser=require('body-parser');
const cors=require('cors');
//const url="mongodb://localhost:27017";
const url="mongodb+srv://admin:admin123@cluster0.sln75.mongodb.net/crm-new?retryWrites=true&w=majority"
const ObjectId = require('mongodb').ObjectId; 
app.use(bodyParser());
app.use(cors());

app.get("/getusers", async (req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("users").find().toArray();
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt get users");
    }
});
app.post("/addusers", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("users").insertOne(req.body);
        res.send(data.ops);
        client.close();
    }catch(err){
        console.log("Couldnt Add users");
    }
})
app.post("/editusers", async (req,res)=>{
    
    try{
        var o_id=new ObjectId(req.body.id);
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("users").findOneAndUpdate(
            {_id:o_id},
            {$set:{"status":req.body.status}},
            {returnOriginal:false});
        res.send(data.value);
        
        client.close();

    }catch(err){
        console.log("Couldnt edit Users")
    }
})
app.get("/getleads", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("leads").find().toArray();
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt get leads");
    }
});

app.post("/addleads", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("leads").insertOne(req.body);
        res.send(data.ops);
        client.close();
    }catch(err){
        console.log("Couldnt Add Leads");
    }
})

app.post("/editleads", async (req,res)=>{
    
    try{
        var o_id=new ObjectId(req.body.id);
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("leads").findOneAndUpdate(
            {_id:o_id},
            {$set:{"lead_status":req.body.value}},
            {returnOriginal:false});
        res.send(data.value);
        
        client.close();

    }catch(err){
        console.log("Couldnt edit Leads")
    }
})

app.get("/deleteleads/:id", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        var o_id=new ObjectId(req.params.id)
        let data=await db.collection("leads").deleteOne({_id:o_id});
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt delete leads");
    }
});
app.get("/getservices", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("services").find().toArray();
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt get services");
    }
});
app.post("/addservices", async(req,res)=>{
    
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("services").insertOne(req.body);
        console.log("backend add",data.ops)
        res.send(data.ops);
        client.close();
    }catch(err){
        console.log("Couldnt Add Services");
    }
})
app.post("/editservices", async (req,res)=>{
    
    try{
        var o_id=new ObjectId(req.body.id);
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("services").findOneAndUpdate(
            {_id:o_id},
            {$set:{"name":req.body.name,"status":req.body.status,"contact_detail":req.body.contact_detail,"service":req.body.service}},
            {returnOriginal:false});
        res.send(data.value);
        console.log(data.value);
        client.close();

    }catch(err){
        console.log("Couldnt edit Services")
    }
})
app.get("/deleteservices/:id", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        var o_id=new ObjectId(req.params.id)
        let data=await db.collection("services").deleteOne({_id:o_id});
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt delete Service");
    }
});

app.get("/getcontacts", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("contacts").find().toArray();
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt get contacts");
    }
});
app.post("/addcontacts", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        let data=await db.collection("contacts").insertOne(req.body);
        res.send(data.ops);
        client.close();
    }catch(err){
        console.log("Couldnt Add COntacts");
    }
})
app.get("/deletecontacts/:id", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm-new");
        var o_id=new ObjectId(req.params.id)
        let data=await db.collection("contacts").deleteOne({_id:o_id});
        res.send(data);
        client.close();
    }catch(err){
        console.log("Couldnt delete contacts");
    }
});
app.listen(process.env.PORT ||4040,()=>{
    console.log("Listening...")
});