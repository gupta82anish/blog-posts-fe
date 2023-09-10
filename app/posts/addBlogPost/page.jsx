'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlogPost() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        content: ''
    })

    const [displayMessage, setDisplayMessage] = useState(false)

    const router = useRouter();

    const createPost = async () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...form, created_at: new Date()
            })
        }).then((res) =>{
            console.log(res)
            setDisplayMessage(true)
                // setForm({
                //     title: '',
                //     description: '',
                //     content: ''
                // })
                // router.push('/')
            }
        )
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container mx-auto p-4 pt-16 md:pt-4">
        <form 
    className="flex flex-col items-center max-w-2xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md gap-y-4" 
    onSubmit={createPost}
>
    <h3 className="text-2xl font-semibold text-black mb-2">Create a new post!</h3>
    <input 
        className="w-full border rounded-lg p-2 text-black md:max-w-2xl" 
        type="text" 
        placeholder="Title" 
        name="title" 
        onChange={handleChange}
        required
        maxLength={50}
    />
    <input 
        className="w-full border rounded-lg p-2 text-black md:max-w-2xl" 
        type="text" 
        placeholder="Description" 
        name="description" 
        onChange={handleChange}
        required
        maxLength={100}
    />
    <textarea 
        className="w-full border rounded-lg p-2 text-black h-40 resize-y md:max-w-2xl" 
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
{displayMessage ? <h3 className="flex justify-center text-2xl font-semibold text-white mb-2">New post created!</h3> : null}
{/* <h3 className="flex justify-center text-2xl font-semibold text-white mb-2">New post created!</h3> */}
</div>

    )
}
