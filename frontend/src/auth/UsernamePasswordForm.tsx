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
