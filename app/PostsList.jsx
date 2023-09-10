import Link from "next/link";
async function getPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const data = await res.json();
    return data?.data;
  }
  
export default async function PostsList(){
    const posts = await getPosts();
    console.log(posts);
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Posts are here</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts?.map((post) => (
            <Post key={post.id} post={post} />
            ))}
        </div>
        {/* <CreatePost /> */}

        </div>
    );
}

function Post({ post }) {
    const { title, description } = post || {};
    return (
      <Link href={`/posts/${post.id}`}>
        <div className="p-4 border rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-100 hover:shadow-lg hover:text-blue-500">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    );
  }