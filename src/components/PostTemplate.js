import React from 'react'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import { graphql } from 'gatsby'

const PostTemplate = ({postSlug, postId, siteAddress}) => {
    console.log('siteAddress: ', siteAddress);

    
    let disqusConfig = {
      url: `http://localhost:8000/posts/${postSlug}/`,
      identifier: postId,
      title: postSlug,
    }
    return (
      <div>
        {/* <h1>{postSlug}</h1> */}
        <CommentCount config={disqusConfig} placeholder={'...'} />
        <Disqus config={disqusConfig} />
      </div>
    )
  }
  
  export default PostTemplate