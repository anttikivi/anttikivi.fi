// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { useIntl } from 'react-intl';

import LocaleSwitcher from './LocaleSwitcher';
import SchemedImage from '../SchemedImage';

import createIntl from '../../util/createIntl';

const Footer = styled.footer`
  margin: 4em ${(props) => props.theme.layout.marginMobile} 2em;
  text-align: center;

  @media screen and ${(props) => props.theme.devices.mobileL} {
    margin: 4em ${(props) => props.theme.layout.marginTablet} 2em;
  }

  @media screen and ${(props) => props.theme.devices.tablet} {
    margin: 4em ${(props) => props.theme.layout.marginDesktop} 2em;
  }
`;

const Div = styled.div`
  margin: 2em 0;
`;

const SocialMediaTitle = styled.h3`
  margin: 2rem 0 0;

  @media screen and ${(props) => props.theme.devices.mobileL} {
    margin: 3rem 0 0;
  }

  @media screen and ${(props) => props.theme.devices.tablet} {
    margin: 4rem 0 0;
  }
`;

const SocialMediaDiv = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialMediaImage = styled(SchemedImage)`
  margin: 1rem;
`;

const GithubImage = styled(SocialMediaImage)`
  filter: brightness(0) saturate(100%) invert(24%) sepia(50%) saturate(252%) hue-rotate(166deg)
    brightness(93%) contrast(88%);

  @media screen and (prefers-color-scheme: dark) {
    filter: brightness(0) saturate(100%) invert(100%);
  }
`;

const InstagramImage = styled(SocialMediaImage)`
  @media screen and (prefers-color-scheme: dark) {
    filter: invert(100%);
  }
`;

const LinkedinImage = styled(SocialMediaImage)`
  @media screen and (prefers-color-scheme: dark) {
    filter: invert(100%);
  }
`;

const TwitterImage = styled(SocialMediaImage)`
  @media screen and (prefers-color-scheme: dark) {
    filter: invert(100%);
  }
`;

export default (props) => {
  const i = createIntl(useIntl());

  const data = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            defaultEmail
            socialMedia {
              github
              instagram
              linkedin
              twitter
            }
          }
        }
        facebook: file(relativePath: { eq: "footer/facebook.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        facebookColor: file(relativePath: { eq: "footer/facebook-color.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        github: file(relativePath: { eq: "footer/github.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        instagram: file(relativePath: { eq: "footer/instagram.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        instagramColor: file(relativePath: { eq: "footer/instagram-color.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        linkedin: file(relativePath: { eq: "footer/linkedin.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        linkedinColor: file(relativePath: { eq: "footer/linkedin-color.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        twitter: file(relativePath: { eq: "footer/twitter.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
        twitterColor: file(relativePath: { eq: "footer/twitter-color.png" }) {
          childImageSharp {
            gatsbyImageData(width: 32)
          }
        }
      }
    `,
  );

  const { defaultEmail, businessId, vatNumber, socialMedia } = data.site.siteMetadata;

  return (
    <Footer>
      {/* <Search {...props} /> */}
      {(() => {
        if (!props.noLocaleSwitcher) {
          return (
            <Div>
              <LocaleSwitcher {...props} />
            </Div>
          );
        }
      })()}
      <SocialMediaTitle>{i('footerSocialMediaTitle')}</SocialMediaTitle>
      <SocialMediaDiv>
        <a href={socialMedia.instagram} rel="noopener noreferrer" target="_blank">
          <InstagramImage
            alt={i('footerInstagramAlt')}
            light={getImage(data.instagramColor)}
            dark={getImage(data.instagram)}
          />
        </a>
        {/* <a href={socialMedia.facebook} rel="noopener noreferrer" target="_blank">
          <SocialMediaImage
            alt={i('footerFacebookAlt')}
            light={getImage(data.facebookColor)}
            dark={getImage(data.facebook)}
          />
        </a> */}
        <a href={socialMedia.twitter} rel="noopener noreferrer" target="_blank">
          <TwitterImage
            alt={i('footerTwitterAlt')}
            light={getImage(data.twitterColor)}
            dark={getImage(data.twitter)}
          />
        </a>
        <a href={socialMedia.linkedin} rel="noopener noreferrer" target="_blank">
          <LinkedinImage
            alt={i('footerLinkedinAlt')}
            light={getImage(data.linkedinColor)}
            dark={getImage(data.linkedin)}
          />
        </a>
        {/* <a href={socialMedia.github} rel="noopener noreferrer" target="_blank">
          <GithubImage
            alt={i('footerGithubAlt')}
            light={getImage(data.github)}
            dark={getImage(data.github)}
          />
        </a> */}
      </SocialMediaDiv>
      {/* <Div>
        <DataProtectionP>
          <LocalizedLink to="/data-protection" locale={props.locale}>
            {i('footerDataProtection')}
          </LocalizedLink>
        </DataProtectionP>
        <CookieSettingsP>
          <CookieNotice {...props} />
        </CookieSettingsP>
        <TermsOfUseP>
          <LocalizedLink to="/terms-of-use" locale={props.locale}>
            {i('footerTermsOfUse')}
          </LocalizedLink>
        </TermsOfUseP>
      </Div>
      <Div>
        <p dangerouslySetInnerHTML={{ __html: i('footerOcticons') }} />
      </Div> */}
      <Div>
        <p dangerouslySetInnerHTML={{ __html: i('footerCopyright') }} />
      </Div>
      <Div>
        <p>
          {i('footerMadeBy', {
            a: (...chunk) => (
              <OutboundLink href="https://visiosto.fi" rel="noopener noreferrer" target="_blank">
                {chunk}
              </OutboundLink>
            ),
          })}
        </p>
      </Div>
    </Footer>
  );
};