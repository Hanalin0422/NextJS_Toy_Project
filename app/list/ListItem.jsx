'use client'

import DetailLink from "./DetailLink";
import Link from "next/link";


export default function ListItem(props){

    return(
        <div>
            {
                props.result.map((a, i)=>
                    <div className="list-item" key={i}>
                        <Link href={"/detail/" + props.result[i]._id}>
                        <h4>{props.result[i].title}</h4>
                        <p>{props.result[i].content}</p>
                        </Link>
                        <Link href={'/edit/' + props.result[i]._id}>✏️수정</Link>
                        &nbsp;&nbsp;&nbsp;
                        
                        {/* <span className="delete" onClick={(e)=>{
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
                        }}>🗑️삭제</span> */}

                        <span className="delete" onClick={(e)=>{
                            fetch(`/api/post/delete?_id=${props.result[i]._id}`)
                            .then(()=>{
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(()=>{
                                    e.target.parentElement.style.display = 'none'
                                }, 1000)
                            })
                        }}>🗑️삭제</span>

                        &nbsp;&nbsp;&nbsp;
                        <DetailLink></DetailLink>
                    </div>    
                )
            }
        </div>
    )
}

