import Link from 'next/link';

async function getPosts(){
  const res = await fetch('http://localhost:3030/posts');
  const data = await res.json();
  return data?.data;
}
export default async function SmallPosts() {
  const posts = await getPosts();
  console.log(posts);
  return (
      <div>
          <h1 className="text-center">Posts are here</h1>
          <div className="{styles.grid}">
              {posts?.map((post) => (
                  <Post key={post.id} post={post} />
              ))}
          </div>
      </div>
  )
}

function Post({ post }) {
  const { title, description } = post || {};
  return (
      <Link href={`/posts/${post.id}`}>
          <div className='{styles.node}'>
              <h2>{title}</h2>
              <p>{description}</p>
          </div>
      </Link>
  )
}
