import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    try{
        let db = (await connectDB).db('forum');
        let ret = await db.collection('post').deleteOne({_id : new ObjectId(req.query._id)})
        
        console.log(ret);
        return res.status(200).json('잘 삭제됨');
    }catch(error){
        console.error(error);
        return res.status(500).json({error : '서버 오류'});
    }
}