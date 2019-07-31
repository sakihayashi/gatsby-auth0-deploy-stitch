// import React from 'react'
// import { graphql } from 'gatsby'

// import PageHeader from '../components/PageHeader'
// import Layout from '../components/Layout'
// import CallbackPiece from '../components/CallbackPiece'

// export const ConfirmPageTemplate = ({
//   body,
//   title,
//   subtitle,
//   featuredImage,
// }) => (
//   <main className="Account">
//     <PageHeader
//       title={title}
//       subtitle={subtitle}
//       backgroundImage={featuredImage}
//     />


//   </main>
// )



// const ConfirmPage = ({ data: { page } }) => (
//       <React.Fragment>
//         <CallbackPiece />
//         <Layout
//         meta={page.frontmatter.meta || false}
//         title={page.frontmatter.title || false}
//         >
//           <ConfirmPageTemplate {...page.frontmatter} body={page.html} />
//         </Layout>
//       </React.Fragment>
// )
// export default ConfirmPage

// // const ConfirmPage = ({ data: { page } }) => {

// //   componentDidMount() {
// //     handleCallback()
// //   }
  
// //   return (
// //     <Layout
// //       meta={page.frontmatter.meta || false}
// //       title={page.frontmatter.title || false}
// //     >
// //       <ConfirmPageTemplate {...page.frontmatter} body={page.html} />
// //     </Layout>
// //   )
// // }

// // export default ConfirmPage

// export const pageQuery = graphql`
//   query ConfirmPage($id: String!) {
//     page: markdownRemark(id: { eq: $id }) {
//       ...Meta
//       html
//       frontmatter {
//         title
//         template
//         subtitle
//         featuredImage
//         address
//         phone
//         email
//       }
//     }
//   }
// `