# NEXT.JS
---
### 개발 환경 셋팅하기
1. node.js 검색 후 설치하기 (18버전 이상으로) : 설치 중 chocolatey 어쩌구 설치 하지 말기
2. vscode 에디터 설치
3. 코드를 짤 작업 폴더 생성

### 프로젝트 생성하기
~~~
npx create-next-app@latest
~~~
만약 git pull 했는데 next가 안깔려서 실행이 안된다면
~~~
npm install next react react-dom
~~~

실행은 
~~~
npm run dev
~~~
- app 폴더 : 여기에서 코드 작성
- page.js : 우리의 메인 페이지
- layout.js : 메인페이지 감싸는 용도의 페이지   
    - page.js 바깥에 적을게 있으면 여기에 적으면 됨. ex) header, 상단바 메뉴 등등...  
- public 폴더 : 이미지나 static 파일 보관용 
- api 폴더 : 서버기능 만드는 곳
- globals.css : 모든 페이지에 적용할 스타일
- xxx.module.css : 특정 페이지에만 적용하고 싶은 스타일은 이런 식으로 css를 작성하면 됨.
- public : 이미지, 폰트 파일 등등 소스코드 외의 파일들 보관용  
&nbsp;
- next.config.js : nextjs 설정 파일 
- node_modules 폴더 : 설치한 라이브러리 보관용 폴더 
- package.json : 설치한 라이브러리 버전 기록용 파일, 쓸수 있는 명령어도 입력이 되어있음


&nbsp;
---
### 페이지 레이아웃 만들기 (React 기초 문법)
---
~~~
export default function Home(){
  return(
    <div>
      
    </div>
  )
}
~~~
- 여기 안에 리엑트 버전 HTML 문법으로 사용해야함. -> JSX 문법이라고 함.
    1. return() 안에 HTML 넣을 때, 태그를 두 개 이상 넣을 수 없음.
    1개의 <태그>로 시작해서 1개의 <태그>로 끝나야함.
    2. class 넣고 싶으면
        ~~~
        <h4 className="classname"></h4>
        ~~~
        이렇게 하는 이유는 javascript의 class와 겹치게 하지 않게 하기 위해서.
    3. HTML안에 변수넣으려면 {} / 데이터바인딩 문법
        ~~~
        export default function Home(){
        let name = 'park'
        return(
                <div>
                    <h4 className="title">비랑후레시</h4>
                    <p className="title-sub">by dev {name}</p>
                </div>
            )
        }
        ~~~
        ~~~
        export default function Home(){
            let name = 'park'
            let link = 'http://google.com'
            return(
                <div>
                    <h4 className="title">비랑후레시</h4>
                    <p className="title-sub">by dev {name}</p>
                    <a href={link}>링크</a>
                </div>
            )
        }
        ~~~
    4. style 속성 넣으려면
        ~~~
         <h4 style={{color:'red', fontSize:'30px'}}>비랑후레시</h4>
        ~~~
        - 여기서 주의할 점은 스타일 속성 안에서는 '-' (대쉬)기호를 쓸 수 없음
        - '-'기호 대신 이어지는 단어를 대문자로 써주면 됨.

&nbsp;
---
### 여러 페이지 만들기 (라우팅)
---
REST API원칙 참고하면 좀더 예쁜 URL 만들수 있음  
/로 페이지를 나누는 행위를 라우팅이라고함
Next.js는 자동 라우팅 기능이 있어서 파일, 폴더 하나 만들면 라우팅 끝임. 자동으로 페이지 완성됨.

- Next.js에서 URL과 페이지를 하나 만들고 싶으면 app 폴더 안에다 자유롭게 폴더를 생성  
-> 그러면 그게 URL이 되는 거임.  
-> 그 폴더 안에 다시 파일을 만들면 /(폴더명)로 접속하면 그 안에 있는 파일의 내용물을 보여줌.  

- 라우팅 하고 싶은 폴더를 만들고 그 안에 파일은 만들었다면 
    ~~~
    export default function Home(){
        return(
            <div>
            </div>
        )
    }
    ~~~
    이 형식 안에 내가 보여주고 싶은 내용물을 적으면 보여주게 되는 것!  

&nbsp;

<정리>  
URL과 페이지만들고 싶으면
1. app폴더 안에 폴더 만들고
2. 그 안에 page.js 넣고
3. 그 안에 레이아웃 넣기

- page.js 만들때 component를 넣으면 되는데 일단 page.js 안에  
export default function List(){}
이렇게 써서 사용하면 됨.
&nbsp;
&nbsp;
---
#### 링크 만들기
- 보통 link를 하나 만들고 싶으면 html에서 a태그를 썼지만 여기서는 Link 태그를 사용함.
- 그 이유는 a태그 보다 좀더 부드럽게 화면 전환을 해주기 때문.
~~~
import Link from "next/link"

export default function Home(){
  let name = 'park'
  return(
    <Link href="/">홈</Link>
    <Link href="/list">List</Link>
    </div>
  )
}
~~~
- href="이 안에 이동하고 싶은 페이지를 써주면 됨.  
&nbsp;&nbsp;
---
#### 모든 페이지에 보여야할 HTML은 layout.js에 작성
~~~
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
~~~
이런 식으로 적어주면 됨!!  

그리고 또 한가지.  
Next.js의 동작 원리!  
1. page.js를 보여줄 때, 옆에 layout.js가 있으면 그걸로 page.js를 싸맴  
2. 상위 폴더에 layout.js가 있으면 그걸로 1번을 싸맴.  
그러니까 즉, 라우팅할때 안으로 계속 들어가는 것처럼 상위 폴더의 layout.js > layout.js > page.js 이런 식으로 계속 싸매듯 이어지는 것.  
-> 유치원 버전 : page.js를 보여줄 때는 옆에, 상위에 있는 모든 layout.js를 합쳐서 보여줌  

결론적으로 보여주고 싶은 거는 상위 layout.js에 적어넣으면 된다는 이야기.  
<img width="240" alt="image" src="https://github.com/Hanalin0422/Vue-Project/assets/78638427/85e16adc-15b3-41e1-ad1c-bb75c900150d">

그러면 이제 무슨 일이 벌어지느냐  
내가 cart page와 payment page 안에서 모두 공통적인 일이 일어났으며 할 때,
![image](https://github.com/Hanalin0422/Vue-Project/assets/78638427/6b4b69f2-eed2-47a5-83f4-f93312790a51)

이와 같은 파일 구조에서 cart 폴더 안에 layout.js 파일을 만들어
~~~
export default function Layout({children}){
    return(
        <div>
            <p>현대카드 무이자 이벤트 중</p>
            {children}
        </div>
    )
}
~~~
이런 식으로 작성을 할 수 있다는 말임.  

&nbsp;&nbsp;
---
### HTML을 반복문으로 줄이고 싶으면 map
---
- jsx에서는 for문과 if문을 사용하지 못함  
=> 그렇다면 우리가 쓸 수 있는 것은 map() 함수임.

~~~
let array = [2, 3, 4]

array.map((a, i)=>{
    ~~ 이 안에 js를 마음껏 쓸 수 있음 ~~
    return 도 넣을 수 있음. 여기에 함수를 실행하고 나서 반환하는 값이 담긴 array 자료형을 반환해줌.  
    ex) return 10 이렇게 쓰면 -> [10, 10, 10] 이라는 배열 반환
})
~~~
a 라는 파라미터는 array 안에 있는 내용이 출력됨.  
i 라는 파라미터는 반복 실행 될때마다 0부터 1씩 증가하는 정수임.  

~~~
{
    상품.map((a)=>{
        return(
            <div className="food" key={i : 반복문 가져다 쓸때 여기다가 유니크한 값을 넣어주어야 함}>
            <h4>{a}__$40</h4>
        </div>
        )
    })
}
~~~
이렇게 작성하면 됨.  
&nbsp;&nbsp;

---
### Next.js에서 이미지 넣는 법 2가지
---
~~~
<img src="/food0.png" alt="토마토라고 이미지를 설명합니다." className="food-img"/>
~~~
- 보통 public 폴더 안에 이미지를 저장하면 됨.
- 나중에 빌드할때 public 안에 있는 것들은 사이트 root 경로로 바로 이동하기 때문에 public 안에 이미지를 넣었다면 그냥 "/이미지.png" 이렇게 작성해서 사용해도 무방함.  

그래서 이런식으로 집어넣어도 상관은 없는데 이미지를 최적화하여 집어넣는 방법이 있음.  

- lazy loading
- 사이즈 최적화
- layout shift 방지 (이미지 로딩이 늦게 되서 사이트가 약간씩 밀리는거 말함)

와 같은 것들임  

~~~
import Image from "next/image"
~~~
- 일단 Image import 해오고
- 최적화된 이미지를 넣으려면 이미지를 import해서 경로를 넣어야함.
~~~
import Image from "next/image"
import foods from '/public/food0.png'

export default function List(){
    return(
      <div>          
        <Image src={foods} className="food-img"/>
      </div>
    )
}
~~~
- 반복문 안에서 각각 다른 이미지를 보여주고 싶다면 src 안에 require('이미지 경로') 이런 거 써야함  
- 외부 사이트 이미지를 집어 넣을 때는 조건이 있음.
  ~~~
  <Image src="s3에 있는 이미지 링크" width={} height={}/>
  ~~~
  이렇게 외부 이미지는 정확한 width, height 속성이 필요함.  
  또한, next.config.js 파일에 가서 
  ~~~
  const nextConfig = {
    experimental:{
        appDir:true,
    },
    images:{
        remotePatterns:[
            {
                protocol : 'https',
                hostname : 's3.amazonaws.com',
                port:'',
                pathname: '/my-bucket/**',
            },
        ],
    },
  }
  ~~~

  이런 식으로 어디서 무슨 이미지를 끌어와 사용하겠다라고 셋팅을 해줘야함.

- 그래서 보통!!!! 다 만들고 나서 나중에 최적화 해주는 게 좋음.
- 그러니까 그냥 이미지 파일 가져다 쓰고 싶으면 public에 넣고 일단 개발하고 나중에 바꾸는 게 좋음.
  ~~~
  <img src={`/food${i}`} className="food-img"/>
  ~~~
  이렇게 이미지 파일 경로 중간에 변수 집어넣고 싶으면 이런 식으로 집어 넣어도 됨.

&nbsp;&nbsp;
---
### client/server component, import 문법
---
#### 컴포넌트 만드는법
1. function 작명(){}
2. return (축약할 긴 HTML)
3. <작명/> 사용

~~~
  function CartItem(){
    return(
        <div className="cart-item">
          <p>상품명</p>
          <p>$40</p>
          <p>1개</p>
        </div>
    )
  }

  => <CartItem/>
~~~
- 재사용이 잦은 html 덩어리들을 주로 Component로 사용하기

#### component 문법 쓰는 이유
1. 더러운 코드 한 단어로 축약
2. 같은 코드 재사용

### Next.js 컴포넌트는 종류가 2개임
---
1. server component -> 아무데나 대충 만들면 전부 server
2. client component -> 파일의 가장 상단에 'use client' 넣고 만들면 client
~~~
'use client'

이 밑에 export default ~~~
~~~

#### server component vs client component
- 서버 컴포넌트에는 html에 자바스크립트 기능을 넣을 수 없음
~~~
export default function Cart() {
  let 변수 = 이런 변수 설정은 됨.
    return (
      <div onclick = {이렇게 자바스크립트를 넣을 수는 없음}>
      </div
    )
}
~~~
  이런 게 안된다는 것!
- useState, useEffect 등도 사용불가
- 반면, 'use client'라고 위에 쓰면 onClick 뭐 이런 자바스크립트 기능을 사용할 수 있음.
- 즉, html에 자바스크립트 기능과 useState, useEffect 등을 넣어 사용할 수 있다는 뜻임.


##### 그러면 'use client'가 좋은 거 아님?
-> 맞음. 실제로 개발할때 훨씬 편함, 그런데 server component를 사용하는 이유는  
[server component]의 장점
- 로딩 속도가 빠름
- 검색엔진 노출 유리  

[client component]의 단점
- 로딩 속도 느림1 (자바스크립트 파일이 좀 많이 필요함)
- 로딩 속도 느림2 (hydration 필요)  
(hydration : html 유저에게 보낸 후에 자바스크립트로 html 다시 읽고 분석하는 일)  

#### 그래서 추천하는 점
큰 페이지들은 server component,  
큰 페이지 안에서 기능들이 필요한 부분은 client component

### import
- 일부 코드는 다른 파일로 분할하기도 함.
- 만약 다음과 같이 파일이 분할이 되어 있다면  
  <img width="114" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/fd34e890-6abb-4a8c-ab45-377f6b941de4">

~~~
let age = 20;
export default age;
~~~
라고 하고 가져와서 사용하고 싶으면
~~~
import 작명 from './data.js'
~~~
이렇게 적기.  
파일 경로를 적을 때는 './' 이렇게 점을 항상 찍는 방향을 추천함.  

여러개의 함수 혹은 변수를 export 하고 싶다면
~~~
export { 변수/함수명 }


export {age, name};
~~~
이렇게 하고 import 할때는 작명하지 말고 그대로 가져다 써야함.
~~~
import {age, name} from './data'
~~~
<img width="837" alt="image" src="https://github.com/Hanalin0422/NextJS_Toy_Project/assets/78638427/c0d569cb-407f-4856-acbf-30d5e4b72b01">


&nbsp;&nbsp;
---
### Component에 데이터 전해주려면 props
---
- props는 함수 파라미터랑 비슷함

[props 문법]
1. <자식 Component 작명 = "전할 데이터"/>
2. 자식은 props.작명 사용

~~~

export default function Cart() {
  let 장바구니 = ['Tomatoes', 'Pasta'] // 대충 DB에서 가져온 장바구니
    return (
      <div>
        <h4 className="title">Cart</h4>
        <CartItem 장바구니="장바구니"/>
        <CartItem/>
        <CartItem/>
      </div>
    )
  } 

  function CartItem(props){
    return(
        <div className="cart-item">
          <p>상품명 {props.장바구니}</p>
          <p>$40</p>
          <p>1개</p>
        </div>
    )
  }
~~~

그리고 여기서  
- 중괄호 열면 변수, 함수 등 아무거나 전송 가능함
~~~
 <CartItem 장바구니={장바구니}/>
~~~

- 자식 -> 부모의 패륜관계는 전송 불가, 옆집으로의 불륜도 불가
- props는 항상 부모에서 자식으로!!
- 데이터가 많은 컴포넌트에서 필요하면 그들 중 최고 부모 컴포넌트에 보관해야 좋음.

근데 보통
~~~

export default function Cart() {
  let 장바구니 = ['Tomatoes', 'Pasta'] // 대충 DB에서 가져온 장바구니
    return (
      <div>
        <h4 className="title">Cart</h4>
        <CartItem item={장바구니[0]}/>
        <CartItem item = {장바구니[1]}/>
      </div>
    )
  } 

  function CartItem(props){
    return(
        <div className="cart-item">
          <p>{props.item}</p>
          <p>$40</p>
          <p>1개</p>
        </div>
    )
  }
~~~
- 이런 구조에서 CartItem()에 데이터를 가져오나 Cart()에서 데이터를 가져오나 상관 없을 수도 있음.  
=> 보통 데이터들은 fetch()로 DB 데이터를 가져오기 때문에.  
그래서 같은 데이터 요청이 여러개면 1개로 압축해주는 deduplication 기능이 있음.
- 그래서 비슷한 컴포넌트가 여러개가 필요하다 하면
  ~~~
  <Banner content="롯데카드"/>


  function Banner(props){
    return <h5>{props.content} 결제 행사중</h5>
  }
  ~~~
  이런식으로 사용 가능.  
  => 비슷한 컴포넌트는 굳이 여러개를 만들 필요가 없다는 말.

혹시나 Next.js에서 태그의 스타일을 변경하는 방법
~~~
function Button(props){
  return <button style={{ background : 'red'}}>버튼</button>
}

function Button(props){
  return <button style={{ background : props.color }}>버튼</button>
}
~~~
이렇게 변경하면 됨.

&nbsp;&nbsp;
---
### 좋아요 버튼 만들기 (useState, onClick)
---
onClick과 같은 것을 쓰고 싶으면 일단 파일의 상단에  
<strong>'use client'</strong>
써야
~~~
<button onClick={()=>{}}>+</button>
~~~
이런식으로 쓸 수 있음.  
- 이런걸 이벤트 핸들러라고 함.
- 마우스를 대면 MouseOver
- 드래그를 하면 Drag이벤트 발생

#### Next.js에는 두가지 데이터를 저장하는 방법이 있음
- 변수 : 데이터 저장
- state : 데이터 잠깐 저장 가능, 용도는 변수랑 똑같음
~~~
import { useState } from "react"

let [수량, 수량변경] = useState(0)
~~~
- 여기서 왼쪽에 들어가는 건 변수명, 오른쪽에 들어가는 건 state변경 도와주는 함수임.
- useState 또한 use client 컴포넌트 안에서만 사용 가능
- useState를 사용하는 이유 :
  - state의 장점 : state가 변경되면 state 쓰는 html 부분도 자동 재렌더링
  - 근데 일반 변수로 하면 자동으로 html에 업데이트가 안됨.

- state 변경은 state변경함수() 써야함!!!!
~~~
<button onClick={()=>{ 수량변경(수량++) }}>+</button>
~~~
- 자주 안바뀌는 것들은 그냥 하드코딩 하셈.
- 자주 변경되는 사항들만 state를 가져다 쓰는 거임.

&nbsp;&nbsp;
---
### 좋아요 버튼 만들기 2 (array, object state 변경하려면)
---
- 변수든 useState는 값을 그냥 변경할 수 없음.
~~~
  let [수량, 수량변경] = useState([0, 0, 0])
~~~
useState의 배열이 이렇게 되어있는 경우,
~~~
<button onClick={()=>{
    let copy = [...수량];
    copy[0]++;
    수량변경(copy);
}}></button>
~~~
이렇게 해줘야함.  
- 왜 복사를 해야 하냐면 next에서 state 변경함수를 가져다 쓸때 항상 실행을 시키지 않고 기존 state와 다를 때만 변경을 해줌.
- 거기에다가 복사 또한 
  ~~~
  [...데이터] 
  ~~~
  이런식으로 비교를 해줘야함.
  - 이유는 알다시피 자바스크립트는 그냥 복사하면 그 데이터를 가리키는 주소값을 복사해주기 때문.

[정리]  
array/object인 state의 경우 ...로 복사해서 수정하고 state 변경함수를 쓰기
