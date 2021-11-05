import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { QueryResult } from '../models';

interface Props {
  description?: string;
  lang?: any;
  meta?: any;
  title: string;
}
const SEO = ({ description, lang, meta, title }: Props) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data: QueryResult) => {
        const metaDescription = description || data.site.siteMetadata.description;
        const defaultTitle = data.site.siteMetadata.title;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            defaultTitle={defaultTitle}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title || defaultTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:image`,
                content: `${data.site.siteMetadata.siteUrl}/images/ogp.png`,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `google-site-verification`,
                content: "imj7G-ZerBh3MsHkiadmx_eAwSqAeRatmOr0p2L0eJs",
              },

              {
                name: `naver-site-verification`,
                content: "159e698b7dfa582ec3ebdb9c2ad273a4d9a0ed4c",
              },
            ].concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: `ko`,
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
      }
    }
  }
`;
