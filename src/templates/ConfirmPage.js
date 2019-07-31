import React from 'react'
import { graphql } from 'gatsby'
import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";
import app from '../stitch/app'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'

// function handleCallback() {
//   const url = window.location.search;
//   const params = new URLSearchParams(url);
//   const token = params.get('token');
//   const tokenId = params.get('tokenId');

//   const emailPassClient = app.auth
//     .getProviderClient(UserPasswordAuthProviderClient.factory);

//   return emailPassClient.confirmUser(token, tokenId);

// }

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

class ConfirmPage extends Component {
  
  componentDidMount() {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get('token');
    const tokenId = params.get('tokenId');

    const emailPassClient = app.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPassClient.confirmUser(token, tokenId);
  }
  

render() {
    return (
      <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
      >
        <ConfirmPageTemplate {...page.frontmatter} body={page.html} />
      </Layout>
    );
  }
}
export default ConfirmPage;

// const ConfirmPage = ({ data: { page } }) => {

//   componentDidMount() {
//     handleCallback()
//   }
  
//   return (
//     <Layout
//       meta={page.frontmatter.meta || false}
//       title={page.frontmatter.title || false}
//     >
//       <ConfirmPageTemplate {...page.frontmatter} body={page.html} />
//     </Layout>
//   )
// }

// export default ConfirmPage

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