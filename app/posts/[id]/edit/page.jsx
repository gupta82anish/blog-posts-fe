import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export default async function BlogEditPage({searchParams}){
    // console.log(searchParams);
    
    const {
        id, title, description, content
    } = searchParams;

    async function updatePost(formData) {
        "use server"
        // console.log('formdata', formData.get('content'));
        await fetch(`http://localhost:3030/posts/${id}`, {
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
        await fetch(`http://localhost:3030/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: formData.get('content') })
        })
        redirect(`/posts/${id}`);
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition" >
                Back
            </Link>
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-black">{title}</h1>
                </div>
                <div>
                    <form action={updatePost}>
                        <textarea 
                            className="w-full p-2 rounded border text-black" 
                            defaultValue={content} name="content"
                        />
                        <Link 
                            // onClick={() => setIsEditing(!isEditing)} 
                            href={`/posts/${id}`}
                            className="bg-slate-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                        >
                            Cancel
                        </Link>
                        <button type='submit'
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                        >
                            Save
                        </button>
                        <button formAction={updateAndGoBack} type='submit'
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                        >
                            Save and return
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}