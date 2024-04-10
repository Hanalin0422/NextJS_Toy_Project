'use client'

import Link from "next/link"

export default function WriteLink(){

    return (
        <Link href={"/write"}>
            <button>글 작성하러 가기</button>
        </Link>
    )
}
