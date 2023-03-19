import React from 'react'



const PostItem = ({ postItem }) => {
    console.log(postItem)
    return <>
        <article
            className='card p-5 w-75'
        >
            <div>
                {postItem.text}
                <br />
                <span className='fw-lighter fst-italic'>
                    user: {postItem.author}
                </span>
            </div>
        </article>
    </>
}

export default PostItem