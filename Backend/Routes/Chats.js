import express from "express";
import Thread from "../Models/Thread.js"
import getOpenAIAPIResponse from "../utils/openai.js";


const router = express.Router()


// thread list get route


router.post("/test",async (req,res)=>{
    try{
        const new_thread = new  Thread({
            threadId : "uuid122",
            title : "testing title-2"
        })

        const data = await new_thread.save()
        console.log(data)
        res.send(data)
    }
    catch(err){
        console.log(`Error while Inserion of data : ${err}`)
        res.status(500).json({error: "Failed to save in DB"});
    }
})


// thread list get route
router.get("/thread",async (req,res)=>{
    try{
        const thread = await Thread.find({}).sort({updatedAt:-1})  // it gives the threads in  decending order (-1 represents dece order)
        res.send(thread)
        // console.log(thread)
    }
    catch(err){
        res.status(500).json({error :"Failed to fetch threads"})
    }

})

router.get("/thread/:threadId",async(req,res)=>{
    let {threadId} = req.params;

    try{

        const thread = await Thread.findOne({ threadId })

        if(!thread){
            res.status(404).json({error :"Thread not found"})
        }

        res.json(thread.messages);
    }
    catch(err){
        res.status(500).json({error :"Failed to fetch messages"})
    }
})


router.delete("/thread/:threadId",async(req,res)=>{
    let {threadId} = req.params;

    try{

        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread){
            res.status(404).json({error :"Thread not found"})
        }

        res.status(200).json("Thread deleted successfully")
        
    }
    catch(err){
        res.status(500).json({error :"Failed to fetch thread (delete route)"})
    }
})




router.post("/chat",async (req,res)=>{

    let{threadId,message} = req.body;

    if(!threadId || !message){
         return res.status(400).json({error: "missing required fields"});
    }

    try{

        let thread = await Thread.findOne({threadId})

        if(!thread){


                                // Limit title length to 50 chars
            const maxLength = 50;
            const shortTitle = message.length > maxLength 
            ? message.substring(0, maxLength) + "..." 
            : message;


            // creating new thread (chat/conversation)
            thread = new Thread({
                threadId,
                title: shortTitle,
                messages: [{role: "user", content: message}]
            });
        }
       else {
            thread.messages.push({role: "user", content: message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});
    }
    catch(err){
        console.log(`Error while fetching from api : ${err}`);
        res.status(500).json({error: "something went wrong white fetching from api"});
    }
})


export default router;