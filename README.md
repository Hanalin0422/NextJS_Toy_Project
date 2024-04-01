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

