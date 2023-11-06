import {writeFileSync} from "node:fs";
import { qs } from "qs";
const url ="http://localhost:1337/api/reviews" + qs.stringify({
  fields:['slug','title','subtitle','publishedAt'],
  //populate:'*',
  populate:{image:{fields:['url']}},
  sort:['publishedAt:desc'],
  pagination:{pageSize:6}
},{encodeValueOnly:true});
const response = await fetch(url);
const body = await response.json();
const file = 'scripts/strapi.json';
writeFileSync(file,formatted,'utf8');