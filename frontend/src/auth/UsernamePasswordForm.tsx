// import { useActionState } from "react";


// export function UsernamePasswordForm({onSubmit}) {
//     const [result, submitAction, isPending] = useActionState(
//         async (previousState, formData) => {
//             const username = formData.get("username");
//             const password = formData.get("password");

//             if (!username || !password) {
//                 return {
//                 type: "error",
//                 message: `Please fill in your username and password.`,
//                 };
//             }

//             //   await fakeSendEmail();
//             const submitResult = await onSubmit({username, password})
//             return submitResult;
//         },
//         null
//     );
//     return(<>
//     <form action={submitAction}>
//         <label htmlFor="">
//             Username
//             <input id="username" name="username" type="text" />
//         </label>
//         <label htmlFor="">
//             Password
//             <input id="password" name="password" type="password" />
//         </label>
//         <button type="submit">submit</button>
//     </form>
//     {result?.type === "error" && (
//     <p style={{ color: "red", marginTop: "10px" }}>
//         {result.message}
//     </p>
//     )}
//     </>)
// }
// import { useActionState } from "react";

// interface FormData {
//     username: string;
//     password: string;
// }

// export function UsernamePasswordForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<any> }) {
//     const [result, submitAction, isPending] = useActionState(
//         async (previousState: any, formData: FormData) : Promise<{ type: string; message: string } | undefined> => { // Specify the type for previousState and formData
//             const username = formData.username
//             const password = formData.password
//             if (!username || !password) {
//                 return {
//                     type: "error",
//                     message: `Please fill in your username and password.`,
//                 };
//             }

//             const submitResult = await onSubmit({ username, password });
//             return submitResult;
//         },
//         null
//     );

//     return (
//         <>
//             <form action={submitAction}>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                     Username
//                     <input id="username" name="username" type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
//                 </label>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                     <input id="password" name="password" type="password" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
//                 </label>
//                 <button type="submit" className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200" disabled={isPending}>
//                     {isPending ? "Loading..." : "Submit"}
//                 </button>
//             </form>
//             {result?.type === "error" && (
//                 <p className="text-red-600 mt-4 text-center">
//                     {result.message}
//                 </p>
//             )}
//         </>
//     );
// }
import React from "react";

interface FormData {
    username: string;
    password: string;
}

export function UsernamePasswordForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<any> }) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(event.currentTarget); // Create FormData from the form

        const username = formData.get("username") as string; // Get the username
        const password = formData.get("password") as string; // Get the password

        if (!username || !password) {
            // Handle error case
            console.error("Please fill in your username and password.");
            return;
        }

        // Call the onSubmit function with the form data
        await onSubmit({ username, password });
    };

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <label htmlFor="username" className="block text-md font-medium text-gray-700 p-2">
                Username
                <input id="username" name="username" type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <label htmlFor="password" className="block text-md font-medium text-gray-700 p-2">
                Password
                <input id="password" name="password" type="password" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </label>
            <button type="submit" className="w-full !bg-blue-400 text-white rounded-md p-2 hover:text-black transition duration-200">
                Submit
            </button>
        </form>
    );
}
