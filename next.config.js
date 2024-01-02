/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = module.exports = {
    // other configurations...
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'], // add any other extensions you are using
    images: {
      domains: ['deepblog.s3-ap-southeast-1.amazonaws.com']
    },
  };