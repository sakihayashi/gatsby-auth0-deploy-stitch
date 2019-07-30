import React from 'react'
import { graphql } from 'gatsby'
// import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";
import { app } from '../stitch/app'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'

function handleCallback() {

  // Stitch.initializeDefaultAppClient("forumtopic-wuzgl");
  // Parse the URL query parameters
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const token = params.get('token');
  const tokenId = params.get('tokenId');

  // Confirm the user's email/password account
  const emailPassClient = app.auth
    .getProviderClient(UserPasswordAuthProviderClient.factory);

  return emailPassClient.confirmUser(token, tokenId);

}

// Export Template for use in CMS preview
export const ConfirmPageTemplate = ({
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

const ConfirmPage = ({ data: { page } }) => {

  handleCallback()
  
  return (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <ConfirmPageTemplate {...page.frontmatter} body={page.html} />
    </Layout>
  )
}

export default ConfirmPage

export const pageQuery = graphql`
  query ConfirmPage($id: String!) {
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