'use client'
import Link from 'next/link';

async function getNote(noteId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${noteId}`);
    const data = await res.json();
    return data;
}

const deletePost = async () => {
    console.log('delete function called');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, {
        method: 'DELETE'
    }).then(() => router.replace('/'));
}

export default async function PostPage({ params }) {
    const note = await getNote(params.id);
    return (
        <div className="container mx-auto p-4 pt-16 md:pt-4">
            <Link href="/" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
                Back
            </Link>
            <div className="flex flex-col max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="flex flex-col mb-4 sm:mb-0">
                        <h1 className="text-3xl font-bold text-black mb-2">{note.title}</h1>
                        <h4 className="font-extralight text-black">{note.description}</h4>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={{ pathname: `/posts/${params.id}/edit`, query: { ...note } }} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
                            Edit
                        </Link>
                        <button 
                            onClick={deletePost} 
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <p className="text-gray-700 text-lg">{note.content}</p>
            </div>
        </div>
    );
}
