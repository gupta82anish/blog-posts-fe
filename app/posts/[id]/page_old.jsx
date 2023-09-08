'use client'
import { useState } from 'react';

async function getNote(noteId) {
    const res = await fetch(`http://localhost:3030/posts/${noteId}`);
    const data = await res.json();
    return data;
}

export default async function PostPage({ params }) {
    const note = await getNote(params.id);
    console.log(note);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(note.content);

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">NOTES {note.title}</h1>
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Edit
                    </button>
                </div>
                {isEditing ? (
                    <textarea 
                        className="w-full p-2 rounded border" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                    />
                ) : (
                    <p className="text-gray-700 text-lg">{content}</p>
                )}
            </div>
        </div>
    );
}
