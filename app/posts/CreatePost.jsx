'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const [description, setDescription] = useState('');

    const [form, setForm] = useState({
        title: '',
        description: '',
        content: ''
    })

    const router = useRouter();

    const createPost = async () => {

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...form, created_at: new Date()
            })
        })

        // setContent('');
        // setTitle('');
        // setDescription('');
        setForm({
            title: '',
            description: '',
            content: ''
        });
        router.refresh();
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="flex flex-col gap-y-2" 
            onSubmit={createPost}>
            <h3>Create a new note!</h3>
            <input className="text-black"
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}/>
            <input className="text-black"
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}/>
            <textarea className="w-full p-2 rounded border text-black"
                placeholder="Content"
                name="content"
                onChange={handleChange}/>
            <button type="submit">Create post</button>
        </form>
    )
}

