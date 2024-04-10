import { connectDB } from "@/util/database";

export default async function handler(req, res){
    if(req.method == "POST"){
        if(req.body.title == ''){
            return res.status(500).json('너 왜 제목 안씀');
        }
        // db가 죽어서 저장이 안되는 경우가 있는데 그때 에러 예외 처리는
        try{
            const db = (await connectDB).db("forum");
            let result = await db.collection('post').insertOne(req.body);
            // redirect를 통해 원하는 곳으로 돌아가게 할 수 있음.
            return res.status(302).redirect('/list');
        }catch(error){
            // DB 저장 실패시 여기가 실행됨
            return res.status(500).json(error);
        }
    }
}