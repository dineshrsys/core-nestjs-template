import slugify from 'slugify';

export const toSlug = (title: string) => slugify(title);

export const toBucketUrl = (path: string) => `${process.env.AWS_BUCKET_URL}/${path}`;
