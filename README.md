# NextJS CRUD 게시판
---

## mongoDB 환경 설정하기
- 비관계형 DB들은 분산처리를 잘하기 때문에 많은 데이터들을 빠른 시간 안에 입출력을 시켜야 한다면 비관계형을 사용하는 것이 좋음.
- MongoDB는 500MB 정도 무료 호스팅을 제공함.
![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/d722a2ad-c5b8-42c5-a77c-b463dc34ab48)
- 일단 데이터베이스에 접속할 수 있는 아이디/비번 만들어주기.
    - 하나의 데이터베이스를 여러사람이 사용할 수도 있으니까.
    - 이때의 주의점은 역할을 atlas admin으로 설정하기.
    - 그래야 내가 설정한 아이디로 DB 접속시 뭐든지 다 할 수 있음.
    ![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/c8b7b0dc-4640-435b-9dcb-949121f3e34d)
- 그 다음 Network Access 메뉴에서 IP를 추가하기
    - 데이터베이스에 접속할 수 있는 IP를 미리 정의해놓은 일종의 보안 장치.
    - 신뢰할 만한 IP만 추가하는 게 좋지만 옮겨다니면서 개발을 할 거라면 일단 그냥 allow access from anywhere을 하거나 0.0.0.0/0을 추가하기.  

![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/c86f8713-e1eb-4aca-883a-8351452d12c7)
- 여기 들어가면 내가 집어넣은 데이터를 미리 볼 수 있음.
![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/74cfe521-6dec-45cc-bd68-0f51aa8d0283)
- 데이터를 넣고 싶으면 여기서 'Add My Own Data'에 들어가면 됨.
![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/a5d85340-2bc3-4ab2-9db0-ceb6294e430f)
- 여기서 의미하는 Database name은 그냥 하나의 프로젝트를 의미함.
    - 때에 따라서 하나의 사이트가 여러개의 데이터베이스를 운영하는 경우도 있음.
- Collection name은 하나의 폴더를 의미.
    - 지금 몽고 디비에 데이터를 저장할 때 collection이라는 폴더 안에 document라는 파일을 만들고 그 안에 하나의 object데이터들을 저장하는 방식으로 진행이 되고 있음.  
    collection > document > object data
    - document는 하나의 메모장 파일이라고 생각하면 됨.  

![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/8f9dce1f-b4bb-4779-bb99-302ab5b1cf16)
- 이제 여기서   
![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/77aee367-f2a4-4491-b7fd-4bfbb3329ccf)  
이거 누르면 됨.
![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/0ecffceb-9317-4365-8400-d553eeba6c9e)  
- 대충 데이터를 넣으면 이런 느낌.  
- 여기서 _id는 알다시피 몽고디비가 만들어주는 기본적인 인덱스 아이디.  

&nbsp;

## 내 프로젝트에 mongoDB 셋팅하기
~~~
npm install mongodb
~~~
- 몽고 디비 접속이랑 데이터 입출력을 도와주는 라이브러리임.  

몽고 디비 연결은 server component 안에다가
~~~
import { MongoClient } from "mongodb"

export default async function Home(){
  const client = await MongoClient.connect('DB접속 URL~~~', {useNewUrlParser : true});
  const db = client.db("forum");
  
  return ()
}
~~~
이렇게 써주면 됨.
- 내가 만든 post collection의 데이터들을 찾고 싶다면
~~~
db.collection('post').find()
~~~
이렇게 쓰고 실행하면 mongodb 데이터를 출력해줌.
- 내가 만든 DB의 URL을 찾고 싶다하면,
<img width="410" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/4f9135fc-61e5-4f79-8cb7-9867ca610879">
여기서 Connect를 누르면 된다.
<img width="780" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/af2dd28f-fa6b-4b9c-9b3e-d7de66264801">  
그리고 난 vscode와 몽고 디비를 연결하여 사용하는 것을 선택했다.
- 비번 쓸때는 
<img width="360" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/33ea9e37-67ab-4bff-9757-1487f5162030">  
여기서 꺽쇠 빼고 설정해두었던 비번을 작성하면 된다.  

또한, DB 연결은 Next.js 서버 띄울 때 1번만 실행하면 되기 때문에 다른 파일에 빼두는 것이 좋음.
- app 폴더 바깥에 util이라는 폴더 안에 database.js 만들기
~~~
import { MongoClient } from 'mongodb'
const url = 'DB접속URL~~'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }
~~~
- 그 다음 이거 복사 붙여넣기 해서 DB접속 URL만 채워넣으면 됨.
- 이 코드는 Next.js에서 MongoDB를 사용하는 방식임.
- 위와 같이 DB와 연결해주는 코드를 connectDB라는 변수에 저장해놓고 쓰면 매번 실행이 안되고 좋음.
- 그러면 코드를 매번 실행하지 않아도 되어 효율적임.
- 그런데 Next.js는 개발할 때 코드를 작성하는 순간 (파일을 저장하는 순간) 거의 모든 JS파일 코드를 전부 다시 읽고 지나감. -> 개발 중일땐.  
- 그래서 개발할때는 한번만 연결할 수 있도록 해달라 라는게 
    ~~~
    if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect()
    }
    connectDB = global._mongo
    } 
    ~~~
    이 부분임.
- 이제 디비에 있는 데이터를 꺼내오고 싶으면 다음과 같이 쓰면 됨.
    ~~~
  import { connectDB } from "@/util/database";

  export default async function Home(){
    let db = (await connectDB).db("forum");
    let result = await db.collection('post').find().toArray();
    ~~~
- db 입출력 코드는 server component 안에서만 써야함!!!
- 민감한 데이터들이 많으니 그러는 것.

#### 근데 나 왜 오류남?
![image](https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/94af63aa-ae30-458f-898b-bb97ae06a744)  
- 뭔가 이런 식으로 무지막지한 오류가 났다.   

<strong>[에러 로그]</strong>  
Error: URI must include hostname, domain name, and tld  
-> 찾아보니 이유가 디비 접속 비밀번호에 특수문자가 포함되면서 인코딩 에러가 났고 그래서 읽히지 못한 것이었다.  

따라서 비밀번호의 특수문자를 제거해서 다시 시도.  
근데 안됨....

<strong>[에러 로그]</strong>  
Unhandled Runtime Error
Error: 00102DDF01000000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1590:SSL alert number 80  

- 원인 : access IP를 잘못 설정해놓은 것이었다.
- 해결법 : access IP를 다시 제대로 입력하여 실행하자 바로 해결되었다.  
<img width="668" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/4a8eba1e-a27d-4d03-9bc7-d7dd70130668">  
  - 여기서 ADD CURRENT IP ADDRESS를 눌러서 확인을 누르면 된다.


&nbsp;

## 글목록 조회기능 만들기 (DB 데이터 출력)
처음보는 프로그램 만들기
1. 프로그램에 필요한 기능 전부 정리
2. 쉬운 기능부터 하나씩 개발

그러니 게시판에 필요한 가능
- 글목록 조회기능
- 상세페이지
- 글발행기능
- 수정삭제기능  
이것들중 가장 쉬워 보이는 거 잡아서 하면 됨.  

첨보는 세부 기능 만들기
1. 어떤 식으로 동작하는지 상세하게 한글로 설명
2. 그거 코드로 번역  
하면 또 할 수 있음.  

=> 기능 정의를 먼저 해두면 내가 뭘 모르는지 정확히 알 수 있음.  

#### 그러면 이제부터 글 목록을 보여준 HTML 페이지를 만들어 보자!  
1. DB 조회하기
2. DB의 table에서 원하는 정보를 배열로 가져오기
3. HTML에 가져온 정보를 나타내기  
-> 이 순서대로 하면 됨.

&nbsp;&nbsp;

## 상세페이지 만들기 1 (Dynamic route)
혹시 함수 쓸때,
~~~
result.map((a, i)=>{
    return(
        <div className="list-item">
            <h4>{a.title}</h4>
            <p>{a.content}</p>
        </div>
    )
~~~
다음과 같은 코드에서 return이 한개면 return() + 중괄호 동시에 생략 가능함!!!
~~~
{
  result.map((a, i)=>
      <div className="list-item">
          <h4>{a.title}</h4>
          <p>{a.content}</p>
      </div>    
  )
}
~~~
이런 식으로.  

### 아무튼 상세페이지 만들기
1. 글제목 누르면 상세페이지 이동
2. 상세페이지 방문시 DB에서 글 1개 꺼내서 HTML에 보여주기  
상세페이지 URL은 어떻게 만드는 게 좋을까?  
=> /list/(글번호) 이런 식으로 하면 되지 않을까?  

그럴 때 쓸 수 있는게  
<strong> Dynamic route </strong>  
이걸 쓰면 비슷한 페이지 여러개를 만들 필요 없음.  

-> 폴더를 만들 때, detail/[어쩌구]폴더를 만들고 이 안에 page.js를 만들면 저 detail/[이 안에 아무거나] 들어가면 그 안에 있는 page.js 파일을 보여주세요 라고 하는 것과 같음.

- DB에서 게시물 1개만 가져오려면
~~~
.findOne({찾을 document 정보})

let result = await db.collection('post').findOne({title : '안녕'});

let result = await db.collection('post').findOne({_id : new ObjectId("6608172dead55cdab4f31284")});
    
~~~
- 그런데 조금더 정확하게 내가 원하는 정보를 가지고 오고 싶다면 props를 통해서 유저가 [어쩌구] 자리에 입력한 값을 가지고 올 수 있음.  
~~~
result[i]._id
~~~
했는데 ObjectId(어쩌구)라고 나오는 경우 뒤에
~~~
result[i]._id.toString()
~~~
이라고 붙여줘야 잘 동작함.  

그리고 문자 뒤에 변수를 넣고 싶다면  
~~~
<Link href={"/detail/" + a._id}>
~~~
이런식으로 '+'를 사용해 줘야 함.  

&nbsp;&nbsp;

###  페이지 이동 방법에는 여러가지가 있음
- client component에서 페이지 이동시키는 방법  
~~~
useRouter()
~~~
이건 client component에서만 사용 가능.
~~~
'use client'

import { useRouter } from "next/navigation"

export default function DetailLink(){
    let router = useRouter();
    return(
        <button onClick={()=>{router.push('이동할 경로')}}>버튼</button>
    )
}
~~~
- Link 태그를 사용하지 않고 이렇게 사용하는 이유
~~~
router.back() => 뒤로 가기
router.forward() => 앞으로 가기
router.refresh() => 변동이 있는 HTML 부분만 새로고침
router.prefetch('') => 코드가 실행이 되면 안의 페이지에 필요한 모든 파일들이 미리 로드되어 조금 더 빨리 페이지를 넘어갈 수 있음.
~~~
그래서 이런 식으로 만약 server component 안에 router기능을 넣고 싶다면 따로 component를 만들어서 불러다가 쓰는 방법이 있음.  

- 근데 여기서 prefetch()는 Link 태그만 써도 자동으로 동작함.  
- Link 태그에도 prefetch 기능이 내장되어 있음.  
- 그래서 만약 prefetch() 기능을 끄고 싶다면
~~~
<Link prefetch={false} href={~~~}></Link>
~~~
이렇게 쓰면 됨.  근데 개발중일땐 prefetch 여부 확인 불가함.  
나중에 사이트를 발행했을 때 확인 가능함.  

또한,
~~~
usePathname() : 현재 URL을 출력할 수 있음
useSearchParams() : 쿼리스트링 출력
useParams() : 유저가 [dynamic route] 입력한 거 출력
~~~

그래서  
1. 여러페이지 만들려면 [Dynamic Route]
2. 현재 URL이 뭔지 궁금하면 props/useRouter
3. 페이지 이동, prefetch 등은 useRouter  

&nbsp;&nbsp;
## 글 작성기능 만들기 (서버기능 개발은)
1. 글 작성 페이지 필요
2. 버튼 누르면 서버에 글 저장해달라고 부탁
3. 서버는 부탁받으면 검사해보고 DB에 저장
<img width="1043" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/d26b428f-c278-4d73-977d-9b218a54a50b">  
저 중간에 있는게 server임.  

서버 : 이거 해달라고 요청하면 진짜 해주는 프로그램.  
서버 개발자가 짜는 코드  
-> method 종류 : GET, POST, PUT, DELETE, PATCH  
- GET : 유저에게 데이터 전송시
- POST : 새로운 데이터 추가시
- PUT : 데이터 수정시 (전체를 다 변경해줌)
- DELETE : 데이터 삭제시
- PATCH : 데이터 수정시 (바뀐 부분만 변경해줌)  

### 서버 기능을 만드는 두가지 방법이 있음.
1. app 폴더 안에 api 폴더를 만들어서 거기에 서버 기능 만들기
2. pages라는 폴더를 root 경로에 하나 만들어서 api 폴더를 만들어서 그 안에 서버 기능을 만들기  

그런데 1번이 조금 더 신버전이긴 하나 나사가 빠져 있으므로 2번의 방법을 선택하는 것이 좋음.  

- 누군가가 /api/test로 요청을 보내면 그 파일 안의 코드를 실행해주는게 Next.js의 동작 원리임.
- 서버는 기능을 실행한 후에 유저에게 응답을 해줘야함.
~~~
// test.js에 있는 내용
// get 요청임.

export default function handler(요청, 응답){
    console.log(123);
    return 응답.status(200).json('처리완료');
}
~~~
- post 요청 보내는 법
~~~
export default function Write(){
    return(
        <div>
            <h4>글작성</h4>
            <form action="/api/test" method="POST">
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}
~~~
post 요청에 따른 처리를 하고 싶다면
~~~
export default function handler(요청, 응답){

    if(요청.method == 'POST'){
        return 응답.status(200).json('처리완료');
    }
}
~~~
이렇게 처리하면 됨. 그러면 GET말고 POST 요청 올때만 실행해줌.  

내가 만약에 /api/list로 GET요청을 보낸다면
~~~
import { connectDB } from "@/util/database";

export default async function showList(req, res){
    let db = (await connectDB).db("forum");
    let result = await db.collection('post').find().toArray();

    return res.status(200).json(result);
}
~~~
이렇게 응답을 상태 코드와 함께 json 형태에 담아서 전송할 수 있음.  

어쨌든 전송버튼을 눌러서 서버에 글을 보내면  
서버는 DB에 글을 저장하는 방식으로 글 작성 기능이 동작함.  
~~~
export default function Write(){
    return(
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="글 제목"/>
                <input name="content" placeholder="글내용"/>
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}
~~~
이러면 서버는 post 요청에 대한 처리로  
(req.body는 유저가 입력한 내용이 담김)
~~~
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
            return res.status(200).redirect('/list');
        }catch(error){
            // DB 저장 실패시 여기가 실행됨
            return res.status(500).json(error);
        }
    }
}
~~~
결론:  
1. 유저 -> 서버 -> DB 이런 식으로 개발하자  
2. 서버기능은 /api 폴더에 만들면 됨  
3. document 하나 발행은 insertOne() 


## 글 수정 기능 만들기
1. 글마다 수정버튼, 누르면 수정 페이지 이동
2. 수정페이지 만들기 (글가져와서 채워놔야함)
3. 발행 누르면 DB에 있던 글 수정  

- 현재 URL에 입력한 id를 받아오는 법
~~~
export default async function Edit(props){
}
---> prps.params.id
~~~
- 이렇게 해주면 찾아올 수 있음.

#### input에 값을 미리 입력하려면
~~~
defaultValue={}
or
value={}
~~~
이렇게 사용하면 됨.  

#### DB의 내용을 변경하고 싶다면
~~~
let editBoard = await db.collection('post').updateOne({수정할 정보의 게시물(즉 어떤걸 수정하고 싶은지 id 같은 것)}, {$set:{title : '바보', content : '멍청이'}})
~~~
- 수정할 내용은 console.log(req.body)에 다 담겨져 있음.  
- 서버에서 없는 정보는  
    - 유저에게 보내라고 하거나  
    - DB에서 꺼내보거나  
    하면 됨.  

- 서버의 데이터는 문자와 숫자만 주고 받을 수 있음!!
그래서
~~~
<input style={{display : 'none'}} name="_id" defualtValue={result._id_toString()} />

이런 식으로 일단 숨겨서 id값을 보내게 하고  
서버에서는 

let 바꿀거 = {title : 요청.body.title, content : 요청.body.content}

let result = await db.collection('post').updateOne({_id : new ObjectId(요청.body._id)}, {$set : 바꿀거})

이렇게 해볼 수 있겠음.
~~~
그런데 덮어쓰기 말고 기존 값에서 증감만 해줄 수 있는 방법도 있음.  
이때는 set이 아니라  
~~~
$inc : 1
~~~
이렇게 쓰면 원래 값에서 1만 증가시킬 수 있음.  

## 글 삭제 기능 만들기
- 검색했을 때 상단에 뜨고 싶다면 큰 페이지들은 서버 컴포넌트, js기능 넣을 부분만 클라이언트 컴포넌트로 만들어서 진행시키는 것이 좋음.  

- client component에서 DB 데이터를 가져오려면
~~~
useEffect(()=>{
    서버에 부탁해서 DB 게시물을 가져오는 코드를 짜야함.
    그런다음 그걸 result = DB 게시물
})
~~~
이렇게 가져오면 되는데  
- 이렇게 하면 단점이 검색 노출이 어려울 수도 있음.  
    - 왜냐하면 HTML을 먼저 보여주고 그 다음 useEffect()가 실행되기 때문.  
    - 구글 검색 엔진 봇들이 데이터를 수집해서 검색 결과를 보여주는 건데 페이지에 내용을 방문했을 때 내용이 비어있으면 실망하고 다름 페이지로 넘어갈 때가 있는거임.
    - 검색 엔진에 친화적이지 않다는 것.  
- 그러면 검색 엔진에 친화적이고 싶다면? => props로 전송하여 데이터를 보내는 형식으로 짜는게 좋음.  

또한 props 문법 편하게 쓰려면
~~~
export default function ListItem({result}){
    ...
    result.map((a, i)=> ...)
}
~~~
이런 식으로 props를 안쓰고 부모에게 받은 데이터를 그대로 가져다 쓸 수 있게 할 수도 있음. (destructing 문법)  

#### form 태그 말고도 서버에게 get이나 post 요청을 할 수 있는 또 다른 한가지 방법이 있음 => Ajax
- client component 안에서만 사용할 수 있는 기능임.
- fetch('/여기에 URL을 적음') 이렇게 작성하면 get 요청을 보내줌.  
- Ajax의 장점은 form 태그로 요청시 항상 새로고침이 되는데 ajax는 브라우저의 새로고침없이 get/post 요청을 보내줌.  
- 요청 완료시 코드 실행은 .then()
~~~
<span onClick={()=>{
    fetch('/api/test').then(()=>{
        console.log('get요청이 완료되면 이 코드가 실행이 된답니다.')
    })
}}> </span>
~~~
- post 요청을 하고 싶으면
~~~
<span onClick={()=>{
    fetch('/api/test',{
        method : 'POST',
        body : '서버로 보낼 데이터, 문자와 숫자만 가능.'
        // Object나 Array를 보내고 싶다면 JSON.stringify([1,2,3]) 이런 식으로 보내면 됨.
    })
    .then(()=>{
        console.log('get요청이 완료되면 이 코드가 실행이 된답니다.')
    })
}}> </span>
~~~

#### 다시 정리!! 서버로 Array, Object 전송하고 싶으면
- 서버와 데이터 주고 받을 땐 원래 문자나 숫자밖에 주고 받을 수 없음.  
- Array, object 그런 이상한 건 안됨.
- 하지만 array, object에 따옴표를 쳐두면 문자취급을 해주기 때문에 그렇게 전송할 수 는 있음.
- 큰 따옴표를 쳐둔 Array, object 자료들을 JSON이라고 부름.  
- {name : 'kim'} -> {"name" : "kim"}이러면 JSON 되는 거고 이걸 서버로 전송할 수는 있음.
~~~
JSON.stringify({name : 'kim'})
~~~
근데 귀찮게 직접 따옴표 칠 필요는 없고 JSON.stringify() 안에 담으면 JSON 변환해서 그 자리에 남겨줌.  
그래서 이렇게 해두면 서버로 array, object 전송 가능함.  
~~~
// JSON 자료를 다시 Object로 변환해주는 함수
JSON.parse({'{"name" : "kim"}'})
~~~
참고로 JSON에 붙은 따옴표를 제거해서 array, object로 만들고 싶으면 JSON.parse() 안에 넣으면 됨.


## 글 삭제 기능 만들기 2 (Ajax 추가 내용과 에러 처리)
- db에서 삭제를 하고 그걸 let result 에 담게 되면 result에는 document 삭제 결과를 알려줌.  
- 그래서 console.log(result)라고 치면 삭제된 횟수와 실제 삭제가 되었는지에 대한 여부가 뜸.  
- 삭제된게 0이면 500, 삭제된게 1이면 200을 보내주세요 와 같은 에러 처리를 할 수도 있겠음.  

Ajax 요청 완료시 코드 실행은
~~~
fetch('/URL', {method : 'POST', body : 전송할 데이터})
.then((r)=>{
    return r.json()
})
.then((r)=>{
    console.log(r)
    // 이렇게 하면 서버에서 보낸 메세지를 확인할 수 있음
})
~~~

Ajax 에러 처리는  
~~~
fetch('/URL')
.then((r)=>{
    if(r.status == 200) {
        // 서버에서 동작 성공시 주는 메세지를 출력해주는 부분
        return r.json()
    } else {
        //서버가 에러코드전송시 실행할코드
    }
})
.then((result)=>{ 
    //성공시 실행할코드
}).catch((error)=>{
    //인터넷문제 등으로 실패시 실행할코드
    console.log(error)
})
~~~
이런건 복붙해서 쓰면 됨!!! ⭐️⭐️⭐️⭐️⭐️⭐️  
- 에러가 났을 때는 보통 2가지 경우가 있음.  
    - 서버가 status(500) 같은 거 보낼때
    - 인터넷이 끊겨서 네트워크 에러가 났을 때  
보통 이 2가지가 대표적인 에러임.  
그런데 나는 서버가 에러 코드 같은 것을 전송했을때 (200 or 500) 서버가 에러코드 전송시 실행할 코드에 코드를 적어주면 됨.  
- 이렇게 fetch라는 문법은 길고 복잡하기 때문에 보통 axios라는 라이브러리를 사용하여 코드를 짧게 줄임.
- axios 같은 라이브러리 쓰면 코드 짧아짐.  

#### Ajax (Asynchronous JavaScript And XML)
Ajax는 서버에서 데이터를 가져와 전체 페이지를 새로 고치지 않고도 DOM을 업데이트 하는 모든 클라이언트 측 과정을 의미함.  
- XMLHttpRequest (XHR) : AJAX 요청을 생성하는 JavaScript API. XHR의 메서드를 활용하면서 브라우저와 서버의 네트워크 요청을 전송할 수 있음. XHR은 브라우저에서 제공하는 Web API이기 때문에 브라우저 환경에서만 정상적으로 동작함. (node 환경에서는 제공 X)
- 여기서 Axios는 XHR을 활용한 라이브러리임.  
~~~
const url = "https://jsonplaceholder.typicode.com/todos";

axios
  .get(url)
  .then((response) => console.log(response.data))
  .catch((err) => {
    console.log(err.message);
  });
~~~
위와 같은 형태로 axios 요청을 쓸 수 있음.
- fetch와 axios는 각각의 장단점이 있으므로 개발자가 편하고 손에 익는걸 사용하면 됨.  


## 글 삭제 기능 만들기 3 (query string / URL parameter)
애니메이션 주는 법 알아볼 거임.  
애니메이션을 주려면  
1. 애니메이션 동작 전/ 동작 후 스타일을 먼저 결정 ex ) 투명도 1 -> 0  
2. 애니메이션 동작 전 스타일 넣기  
3. 원하는 시점에 애니메이션 동작 후 스타일을 넣으면 됨.
~~~
fetch('/api/post/delete',{
    method:'DELETE',
    body : props.result[i]._id.toString()
})
.then(()=>{
    e.target.parentElement.style.opacity = 0;
    setTimeout(()=>{
        e.target.parentElement.style.display = 'none'
    }, 1000)
})
~~~

### 서버에 데이터를 보내는 다른 방법
- 서버에 데이터를 보내는 방법 2가지가 나왔음.  
    - form 태그를 이용하여 데이터를 input에 넣어 보내는 방법  
    - fetch 안에서 body : result[i]._id 이런 방식으로 데이터를 넣어 보내는 방법  
이렇게 2가지.  
하지만 한가지 더있다면 그건 쿼리문을 사용하여 URL에 정보를 담아 보내는 방법임.  
~~~
fetch('/api/test?데이터이름=값&데이터이름=값')
fetch('/api/test?name=kim&age=20')

export default function handler(요청, 응답){
    console.log(요청.query)
    return 응답.status(200).json('처리완료');
}
~~~
- 이걸 멋진 말로 query string 이라고 부름.  
<strong>URL 뒤에 ?데이터이름=값 입력 가능</strong>

- query string의 장점 : 간단함, GET요청도 데이터 전송 가능함.  
- 단점 : 길고 복잡한 데이터를 집어넣으면 좀 많이 더러움, URL에 중요한 데이터 넣으면 안됨.  

또한, api 만들때도 pages/api/abc/[어쩌구].js 이렇게 파일 하나를 만들고  
누가 /api/abc/아무문자로 요청을 하면 어쩌구 파일 안에 있는 코드가 실행됨.  
이걸 <strong>URL 파라미터 문법</strong>이라고 함.  
- URL 파라미터 문법을 써서 서버로 데이터 전송을 가능하게 할 수 있다는 말임.  
~~~
fetch('/api/abc/kim')

이렇게 하면 kim이 전송됨.
export default function handler(요청, 응답){
    console.log(요청.query)
    return 응답.status(200).json()
}
=> { '어쩌구': 'kim' } 라고 콘솔에 찍힘.
~~~

요약 정리  
1. DB document삭제는 deleteOne  
2. 서버랑 ajax로 통신 가능
3. 서버로 데이터전송시 귀찮으면 query string / URL parameter  


