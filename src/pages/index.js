import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol className="divide-y divide-gray-300 max-w-2xl">
        {posts.map((post, index) => {
          const title = post.node.frontmatter.title || post.node.slug
          const classes = index === 0 ? "pb-12" : "py-12"
          return (
            <li key={post.node.slug} className={classes}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <small className="font-yrsa text-gray-200 text-lg">
                    {post.node.frontmatter.date}
                  </small>
                  <h2 className="text-2xl font-exo font-black text-white mt-3">
                    <Link
                      to={post.node.slug}
                      itemProp="url"
                      className="rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      post.node.excerpt || post.node.frontmatter.description,
                  }}
                  itemProp="description"
                  className="text-lg font-yrsa text-gray-100 mt-3"
                />
                <section className="font-yrsa text-gray-200 uppercase md:text-sm space-x-2 mt-3">
                  {(post.node.frontmatter.tags || "")
                    .split(",")
                    .map(s => s.trim())
                    .map(s => (
                      <span key={s}>{`#${s}`}</span>
                    ))}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          slug
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
