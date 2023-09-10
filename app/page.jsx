'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

async function getPosts(page, limit= 10) {
  console.log('page', page)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?$limit=10&$skip=${(page - 1)*10}`, {cache: 'no-store'});
    const data = await res.json();
    return data;
  }
  
export default function PostsList(){
    // const posts = await getPosts();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [disableNext, setDisableNext] = useState(false);
    useEffect(() => {
      const fetchPosts = async () => {
        const data = await getPosts(page);
        const total = data?.total;
        console.log('total', total)
        const limit = data?.limit
        total > limit ? setDisableNext(false) : setDisableNext(true);
        data?.data.length < 10 ? setDisableNext(true) : setDisableNext(false);
        setPosts(data?.data);
      }
      fetchPosts();
    }, [page]);

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">Posts are here</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {posts?.map((post) => (
              <Post key={post.id} post={post} />
              ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link className="top-0 md:top-50 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
              href="/posts/addBlogPost">Write Something Good</Link>
          </div>
          <div className="flex justify-between mt-4">
            <button disabled={page===1} onClick={() => setPage(prev => Math.max(prev - 1, 1))}> &lt; Previous</button>
            <button disabled={disableNext} onClick={() => setPage(prev => prev + 1)}>Next &gt;</button>
          </div>
        </div>
    );
}

function Post({ post }) {
    const { title, description } = post || {};
    return (
      <Link href={`/posts/${post.id}`}>
        <div className="p-4 border rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-100 hover:shadow-lg hover:text-blue-500">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    );
  }