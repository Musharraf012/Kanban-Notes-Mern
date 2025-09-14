export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with an error code
        console.error("API Error:", error.response.data?.message || error.response.statusText);
        throw new Error(error.response.data?.message || "Something went wrong");
    } else if (error.request) {
        // No response from server
        console.error("Network Error:", error.request);
        throw new Error("Network error. Please try again later.");
    } else {
        // Something else went wrong
        console.error("Unexpected Error:", error.message);
        throw new Error("Unexpected error occurred");
    }
};
