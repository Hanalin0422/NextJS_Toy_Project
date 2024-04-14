import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function Edit(props){

    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});

    return(
        <div className="p-20">
            <h4>글 수정 페이지</h4>
            <form action="/api/post/edit" method="POST">
                <input style={{display : 'none'}} name="_id" defaultValue={result._id.toString()}/>
                <input name="title" defaultValue={result.title}/>
                <input name="content" defaultValue={result.content}/>
                <button type="submit">수정 확인 버튼</button>
            </form>
        </div>
    )
}