//import {readdir,readFile} from 'node:fs/promises'
import 'server-only';
import {marked} from 'marked'
//import matter from 'gray-matter'
//import {writeFileSync} from "node:fs";
import qs from 'qs';

const cms_url='http://localhost:1337';
// export async function getFeaturedReview(){
// const revs = await getReview();
// //const newRevs=revs.reduce((a, b) => { return new Date(a.date) > new Date(b.date) ? a : b;});
//  return revs[0];
// }

export async function  Review(slugs){
// let text = await readFile(`./app/content/reviews/${slug}.md`,'utf8');
  
//  const {content, data:{title,date,image}}=matter(text);
//  const body = marked(content);  
//  return{slug,title,date,image,body}
const {data} = await fetchReviews({
  filters:{slug:{$eq:slugs}},
  fields:['slug','title','subtitle','publishedAt','body'],
  //populate:'*',
  populate:{image:{fields:['url']}},
  //sort:['publishedAt:desc'],
  pagination:{pageSize:1 ,withCount: false},
});
if(data.length===0){
  return null;
}
const item = data[0];
   return {
    slug: item.attributes.slug,
    title: item.attributes.title,
    subtitle:item.attributes.subtitle,
    date: item.attributes.publishedAt.slice(0,'yyyy-mm-dd'.length),
    image : cms_url + item.attributes.image.data.attributes.url,
    body: marked(item.attributes.body,{headerIds:false,mangle:false})
   };
}
async function fetchReviews(parameters){
  const url =`${cms_url}/api/reviews?` + qs.stringify(
    parameters,{encodeValueOnly:true});
  const response = await fetch(url,{
    //cache:'no-cache',
    next:{
      //revalidate:20,
      tags:['reviews']
    }
  });
  if(!response.ok){
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}
export async function  getReview(pageSize,page){
const {data , meta:{pagination:{pageCount}}} = await fetchReviews({
  fields:['slug','title','subtitle','publishedAt'],
  //populate:'*',
  populate:{image:{fields:['url']}},
  sort:['publishedAt:desc'],
  pagination:{pageSize,page},
});
   return data.map((item)=>({
    pageCount,
    slug: item.attributes.slug,
    title: item.attributes.title,
    subtitle:item.attributes.subtitle,
    date: item.attributes.publishedAt.slice(0,'yyyy-mm-dd'.length),
    image : cms_url + item.attributes.image.data.attributes.url,
   }));
  }

// export async function getReview(){
//   const slugs = await getSlugs();
//   const reviews = [];
//   for(const slug of slugs){
//     const review = await Review(slug);
//     reviews.push(review);
//   }
  //const sortRev=reviews.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
   // return new Date(b.date) - new Date(a.date);
  //});
  
  //return sortRev ;
//}


export async function getSlugs() {
  // const files = await readdir('./app/content/reviews');
  // return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0,-'.md'.length));
  const {data} = await fetchReviews({
    fields:['slug'],
    //populate:'*',
    sort:['publishedAt:desc'],
    pagination:{pageSize:100},
  });
  return data.map((item)=> item.attributes.slug);
}

export async function getSearchableReviews(query) {
  const { data } = await fetchReviews({
    filters:{title:{$containsi: query}},
    fields: ['slug', 'title'],
    sort: ['title'],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}