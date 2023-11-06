'use client';
//import 'server-only'
import { Combobox } from '@headlessui/react';
import useIsClient from '../lib/hooks';
import {useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import { useRouter } from 'next/navigation';




export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query,300)
  const [reviews, setReviews] = useState([]);
useEffect(()=>{
if(debouncedQuery.length > 1){
  const controller = new AbortController();
  (async () => {
    const url = '/api/search?query='+ encodeURIComponent(debouncedQuery)
    
    const response = await fetch(url,{signal:controller.signal});
    const Reviews = await response.json();
    setReviews(Reviews);
  })();
  return () => controller.abort();
} else {
  setReviews([]);
}
},[debouncedQuery])

  const handleChange = (review)=>{
router.push(`/reviews/${review.slug}`)
  }
  // console.log('[SearchBox] isClient:', isClient);
  if (!isClient) {
    return null;
  }
 // const filtered = reviews.filter((review) =>
//   review.title.toLowerCase().includes(query.toLowerCase())
// ).slice(0, 5);
  return (<div className="relative w-48 pr-4">

      <Combobox onChange={handleChange}>
        <Combobox.Input placeholder="Search…" value={query} onChange={(event)=> setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span className={`block px-2 truncate w-full ${
                  active ? 'bg-orange-100' : ''
                }`}>
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
