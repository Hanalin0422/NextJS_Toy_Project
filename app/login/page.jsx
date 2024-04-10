export default function Login(){
    return(
        <div className="login">
            <h4>[회원가입]</h4>
            <form action="/api/post/login" method="POST">
                <p>아이디</p>
                <input type="text" name="id" placeholder="아이디 입력"/>
                <p>비밀번호</p>
                <input type="password" name="pwd" placeholder="비밀번호 입력"/>
                <button type="submit">회원가입 완료하기</button>
                
            </form>
        </div>
    )
}