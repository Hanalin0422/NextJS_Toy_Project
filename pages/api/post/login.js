import { connectDB } from "@/util/database";

export default async function handler(req, res){
    if(req.method == "POST"){
        console.log(req.body)
        if(req.body.id == '' || req.body.pwd == ''){
            return res.status(500).json('아이디 혹은 비밀번호 입력 안함');
        }

        try{
            const db = (await connectDB).db("user");
            let result = await db.collection('login').insertOne(req.body);

            return res.status(302).redirect('/');
        }catch(e){
            return res.statsu(500).json(error);
        }
    }
}