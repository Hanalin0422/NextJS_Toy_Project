import { connectDB } from "@/util/database";

export default async function handler(req, res){
    if(req.method == "POST"){
        if(req.body.id == '' || req.body.pwd == ''){
            return res.status(500).json('아이디 혹은 비밀번호 입력 안함');
        }

        try{
            const db = (await connectDB).db("user");
            let user = await db.collection('login').findOne({id : req.body.id, pwd : req.body.pwd});
            if(user){
                return res.status(200).redirect('/');
            }else{
                return res.status(404).json("회원가입이 되어있지 않습니다.");
            }
        }catch(e){
            return res.status(500).json(e);
        }
    }
}