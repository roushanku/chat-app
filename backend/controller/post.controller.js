
async function CreatePostController(req , res) {
    try{
        const {content , author} = req.body;

        if(!content || !author) {
            return res.status(400).json({message: "Content and Author are required"});
        }


    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}