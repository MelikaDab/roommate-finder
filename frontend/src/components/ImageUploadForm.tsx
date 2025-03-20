import { useId, useState } from "react";

interface ImageUploadFormProps {
  authToken: string;
}

const readAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(file);
  });
};

export function ImageUploadForm({ authToken }: ImageUploadFormProps) {
  const id = useId();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const dataURL = await readAsDataURL(file);
        setPreviewSrc(dataURL);
      } catch (error) {
        console.error("Error reading file:", error);
        setErrorMessage("Failed to read file.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;

    if (!image || !name) {
      setErrorMessage("Please provide an image and a name.");
      setIsUploading(false);
      return;
    }

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        let errorMsg = `Request failed with status ${response.status}`;
        if (response.status === 401) errorMsg = "Unauthorized access.";
        else if (response.status === 500) errorMsg = "Server error. Please try again later.";

        try {
          const errorData = await response.json();
          if (errorData.message) errorMsg = errorData.message;
        } catch (jsonError) {
          console.warn("Response is not valid JSON:", jsonError);
        }

        throw new Error(errorMsg);
      }

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred.");
    } finally {
      setIsUploading(false);
    }
  };
return (
    <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl"
    >
        <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            Choose an image to upload:
        </label>
        <input
            name="image"
            id={id}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileChange}
            required
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
        </div>
        {previewSrc && (
        <div className="mb-4 flex justify-center">
            <img
            src={previewSrc}
            alt="Image preview"
            className="max-w-xs h-auto rounded-lg shadow-md"
            />
        </div>
        )}
        <button
        type="submit"
        disabled={isUploading}
        className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
            isUploading
            ? "!bg-gray-400 cursor-not-allowed"
            : "!bg-blue-500 hover:bg-indigo-700"
        }`}
        >
        {isUploading ? "Uploading..." : "Confirm Upload"}
        </button>
        {errorMessage && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
        )}
    </form>
    );

}
