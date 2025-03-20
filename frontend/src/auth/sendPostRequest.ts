export async function sendPostRequest<T>(url: string, payload: Record<string, unknown>): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Handle error responses
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;

      if (response.status === 401) {
        errorMessage = "Incorrect username or password.";
      } else if (response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else {
        // Try parsing JSON error message, if available
        try {
          const errorData: { message?: string } = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.warn("Response is not valid JSON:", jsonError);
        }
      }

      throw new Error(errorMessage);
    }

    // If the response is successful, return the parsed JSON (if available)
    try {
      return (await response.json()) as T;
    } catch {
      return {} as T; // Return an empty object if there's no JSON body
    }
  } catch (error) {
    console.error("POST request failed:", error);
    throw error; // Re-throwing the error for the caller to handle
  }
}
