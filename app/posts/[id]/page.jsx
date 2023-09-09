'use client'
import Link from 'next/link';

async function getNote(noteId) {
    const res = await fetch(`http://localhost:3030/posts/${noteId}`);
    const data = await res.json();
    return data;
}

const deletePost = async () => {
    console.log('delete function called');
    fetch(`http://localhost:3030/posts/${params.id}`, {
        method: 'DELETE'
    }).then(() => router.replace('/'));
}

export default async function PostPage({ params }) {
    const note = await getNote(params.id);
    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition" >
                Back
            </Link>
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">{note.title}</h1>
                    <Link href={
                        {
                            pathname: `/posts/${params.id}/edit`,
                            query:{...note}
                    }}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={deletePost} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Delete
                    </button>
                </div>  
                    <p className="text-gray-700 text-lg">{note.content}</p>
            </div>
        </div>
    );
}
