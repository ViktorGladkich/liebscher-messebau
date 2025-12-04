import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, url, image }) => {
  useEffect(() => {
    document.title = `${title} | Liebscher Messestandbau`;
    
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Helper function to create or update meta tags
    const updateMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // OpenGraph tags
    updateMetaTag("meta[property='og:title']", 'property', 'og:title', title);
    updateMetaTag("meta[property='og:description']", 'property', 'og:description', description);
    updateMetaTag("meta[property='og:type']", 'property', 'og:type', 'website');
    if (url) {
      updateMetaTag("meta[property='og:url']", 'property', 'og:url', url);
    }
    if (image) {
      updateMetaTag("meta[property='og:image']", 'property', 'og:image', image);
    }

    // Twitter Card tags
    updateMetaTag("meta[name='twitter:card']", 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag("meta[name='twitter:title']", 'name', 'twitter:title', title);
    updateMetaTag("meta[name='twitter:description']", 'name', 'twitter:description', description);
    if (image) {
      updateMetaTag("meta[name='twitter:image']", 'name', 'twitter:image', image);
    }

  }, [title, description, url, image]);

  return null;
};
