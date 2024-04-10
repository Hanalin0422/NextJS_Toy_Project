export default function Startlogin(){
    return(
        <div className="login">
            <h4>[로그인하기]</h4>
            <form action="/api/post/startlogin" method="POST">
                <p>아이디</p>
                <input type="text" name="id" placeholder="아이디 입력"/>
                <p>비밀번호</p>
                <input type="password" name="pwd" placeholder="비밀번호 입력"/>
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}