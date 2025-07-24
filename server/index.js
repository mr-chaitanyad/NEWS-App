const express  = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const News  = require("./models/news")


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

mongoose.connect("mongodb://127.0.0.1:27017/newsDB").then(()=>{
    console.log("Mongo DB connected")
}).catch(err=>console.log(err))

app.get("/home",async(req,res)=>{
    try{
        const newsList = await News.find();
        res.json(newsList)
    }
    catch(err){
        console.log(err);
        res.json({message:"Server error"}).status(500)        
    }
})


app.post("/add_news",async (req,res)=>{
    const data = req.body;
    try{
        const newNews = new News(data);
        await newNews.save();
        console.log("Data stored");
        
    }
    catch(err){
        console.log(err);
    }
})

app.put("/edit_news",async (req,res)=>{
    try{
    const data = req.body;
    console.log("New edited",data);
    const updatedNews = await News.findByIdAndUpdate(
        data.id,
        {
            $set:{
                title:data.title,
                content:data.content,
                author:data.author,
                category:data.category,
                imageUrl:data.imageUrl,
                publishedAt:data.publishedAt,
                isPublished:data.isPublished
            },
        },
        {new : true}
    )
    res.json({
        message: "Data updated successfully",
        updatedNews,
    });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
        message: "Failed to update data",
        error: err.message,
    });
    }
})

app.delete("/delete_news/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Deleting ID:", id);
    try {
        const data = await News.findByIdAndDelete(id);
        if (data) {
            res.json({ message: "News deleted successfully", deleted: data });
            console.log("Deleted:", data);
        } else {
            res.status(404).json({ message: "News not found" });
            console.log("News not found");
        }
    } catch (err) {
        console.error("Error deleting news:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.listen(5000,()=>{
    console.log("Server Started");
})