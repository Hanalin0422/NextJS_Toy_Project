'use client'

import { useRouter } from "next/navigation"

export default function DetailLink(){
    let router = useRouter();
    return(
        <button onClick={()=>{router.push('/')}}>첫 화면으로 돌아가기</button>
    )
}