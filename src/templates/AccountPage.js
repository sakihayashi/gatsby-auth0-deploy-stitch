import React from 'react'
import { graphql } from 'gatsby'
import { login, isAuthenticated, getProfile } from "../utils/auth"
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'



// Export Template for use in CMS preview
export const AccountPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
}) => (
  <main className="Account">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />


  </main>
)

const AccountPage = ({ data: { page } }) => {
  if (!isAuthenticated()) {
    
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  console.log('user: ', user);
  
  return (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <AccountPageTemplate {...page.frontmatter} body={page.html} />
    </Layout>
  )
}

export default AccountPage

export const pageQuery = graphql`
  query AccountPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone
        email
        locations {
          mapLink
          lat
          lng
        }
      }
    }
  }
`