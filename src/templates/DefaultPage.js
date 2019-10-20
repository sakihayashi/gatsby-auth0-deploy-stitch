import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'

import PostTopic from '../components/PostTopic';
import TopicDigest from '../components/TopicDigest';
import { isAuthenticated } from "../utils/auth"


// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  topics,
  body,
  
}) => {

  console.log('topics: ', topics); 
  console.log('isAuthenticated(): ', isAuthenticated());   
  

  let topicArray = topics.edges.map((topic) => {
       
    return (
      <TopicDigest {...topic}/>
    )
  })

      return (
      <main className="DefaultPage">
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundImage={featuredImage}
        />
        <section className="section">
          <div className="container">
            {/* <FormForum /> */}
            {isAuthenticated()? <PostTopic /> : <div>Please log in to create a topic </div> }
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h3><strong>最新のトピック</strong></h3><br />
            
          <ul className="post-list">{topicArray}</ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Content source={body} />
          </div>
        </section>
      </main>
    )
  }

const DefaultPage = ({ data: { page, topics } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DefaultPageTemplate {...page.frontmatter} body={page.html} 
      topics={topics}
    />
  </Layout>
)
export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
    topics: allMongodbForumTopic(limit: 10, sort: {order: DESC, fields: time}) {
    edges {
      node {
        question
        title
        id
        picture
        time
        nickname
        owner_id
        userEmail
      }
    }
  }
  }
`
