import { nodeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin";

async function getNote(noteId){
    const res = await fetch(`http://localhost:3030/posts/${noteId}`);

    const data = await res.json();
    return data;

}

export default async function PostPage({params}){
    const note = await getNote(params.id);
    console.log(note);
    return (
        <div>
            <h1>NOTES {note.title}</h1>
        </div>
    )
}