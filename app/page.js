import { connectDB } from "@/util/database";
import WriteLink from "./WriteLink";
import Login from "./Login";

export default async function Home(){
  let db = (await connectDB).db("forum");
  let result = await db.collection('post').find().toArray();

  return (
    <div>
      {result[0].title}
      <br></br>
      <WriteLink></WriteLink>
      <Login></Login>
    </div>
  )
}