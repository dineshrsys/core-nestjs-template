import slugify from 'slugify';
import { toLower } from 'lodash';

export const toSlug = (title: string) => toLower(slugify(title));
export const toBucketUrl = (path: string) => `${process.env.STORAGE_CONTAINER_URL}/${path}`;
