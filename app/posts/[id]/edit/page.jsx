import { revalidatePath } from "next/cache";

import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function BlogEditPage({searchParams}){

    const {
        id, title, description, content
    } = searchParams;

    async function updatePost(formData) {
        "use server"
        console.log('formdata', formData.get('content'));
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: formData.get('content') })
        })
        revalidatePath(`/posts/${id}`);
        // setIsEditing(false);
    }

    async function updateAndGoBack(formData) {
        "use server"
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: formData.get('content') })
        })
        // redirect(`/posts/${id}`);
        redirect(`/posts/${id}`);
    }

    return (
        <div className="container mx-auto p-4 pt-16 md:pt-4">
            <Link href="/" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition" >
                Back
            </Link>
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">Edit Your Note here</h1>
                </div>
                <div>
                    <form className="flex flex-col gap-y-4" action={updatePost}>
                        <input 
                            className="border max-w-2xl rounded-lg p-2 text-black" 
                            type="text" 
                            placeholder="Title" 
                            name="title"
                            defaultValue={title}
                            required
                            maxLength={50}
                    />
                        <input 
                            className="border max-w-2xl rounded-lg p-2 text-black" 
                            type="text" 
                            placeholder="Description" 
                            name="description" 
                            defaultValue={description}
                            required
                            maxLength={100}
                    />
                        <textarea 
                            className="border max-w-2xl rounded-lg p-2 w-full text-black h-40 resize-y" 
                            rows="8"
                            defaultValue={content} 
                            name="content" 
                            required 
                            minLength="10"
                        />
                        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-2">
                            <Link 
                                href={`/posts/${id}`}
                                className="bg-gray-500 text-white py-2 px-2 sm:px-4 w-full sm:w-auto text-center rounded hover:bg-gray-700 transition-colors duration-300 mb-2 sm:mb-0"
                            >
                                Cancel
                            </Link>
                            <button type='submit'
                                className="bg-blue-500 text-white py-2 px-2 sm:px-4 w-full sm:w-auto text-center rounded hover:bg-blue-700 transition-colors duration-300 mb-2 sm:mb-0"
                            >
                                Save
                            </button>
                            <button formAction={updateAndGoBack} type='submit'
                                className="bg-blue-500 text-white py-2 px-2 sm:px-4 w-full sm:w-auto text-center rounded hover:bg-blue-700 transition-colors duration-300"
                            >
                                Save and return
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}