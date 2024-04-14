import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    if(req.method == "DELETE"){
        let db = (await connectDB).db('forum');
        await db.collection('post').deleteOne({_id : new ObjectId(req.body)})

        res.redirect(302, '/list');
    }
}