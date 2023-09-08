'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function PostPage({ params }) {
    const [note, setNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState('');
    const router = useRouter();
    useEffect(() => {
        async function fetchNote() {
            const res = await fetch(`http://localhost:3030/posts/${params.id}`);
            const data = await res.json();
            setNote(data);
            setContent(data.content);
        }
        
        fetchNote();
    }, [params.id]);

    if (!note) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition" onClick={() => router.back()}>Back</button>
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">NOTES {note.title}</h1>
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Edit
                    </button>
                </div>
                {isEditing ? (
                    <div>
                    <textarea 
                        className="w-full p-2 rounded border" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    </div>
                ) : (
                    <p className="text-gray-700 text-lg">{content}</p>
                )}
            </div>
        </div>
    );
}
