/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      options: {
        name: `Blog`,
        url: `https://raccoons-5252152.hs-sites.com/blog/rss.xml`,
      },
      resolve: require.resolve(`../`),
    }
  ],
}
