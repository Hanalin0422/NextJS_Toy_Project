'use client'

import Link from "next/link"

export default function Login(){
    return(
        <div>
            <Link href={"/login"}>
                <button>회원 가입 하러 가기</button>
            </Link>
            <Link href={"/startlogin"}>
                <button>로그인 하러 가기</button>
            </Link>
        </div>
    )
}