'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlogPost() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        content: ''
    })

    const router = useRouter();

    const createPost = async () => {

        await fetch('http://localhost:3030/posts', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...form, created_at: new Date()
            })
        })

        setForm({
            title: '',
            description: '',
            content: ''
        });
        router.push('/');
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="flex flex-col max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md gap-y-4" onSubmit={createPost}>
            <h3 className="text-2xl font-semibold text-black mb-2">Create a new post!</h3>
            <input 
                className="border max-w-2xl rounded-lg p-2 text-black" 
                type="text" 
                placeholder="Title" 
                name="title" 
                onChange={handleChange}
                required
                maxLength={50}
            />
            <input 
                className="border max-w-2xl rounded-lg p-2 text-black" 
                type="text" 
                placeholder="Description" 
                name="description" 
                onChange={handleChange}
                required
                maxLength={100}
            />
            <textarea 
                className="border max-w-2xl rounded-lg p-2 w-full text-black h-40 resize-y" 
                placeholder="Content" 
                name="content" 
                onChange={handleChange}
                required
                maxLength={2000}
            />
            <button 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300" 
                type="submit"
            >
                Create post
            </button>
        </form>

    )
}
