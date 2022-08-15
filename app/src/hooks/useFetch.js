import { useState, useCallback} from "react";

const useFetch = () => {
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const sendRequest = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			// eslint-disable-next-line no-undef
			const abortController = new AbortController();

			try {
				setLoading(true);
				// eslint-disable-next-line no-undef
				const response = await fetch(url,{
					method,
					body,
					headers,
					signal: abortController.signal
				});
                
				const responseData = await response.json();
            
				if(!response.ok){
					throw new Error(responseData.message);
				}
                
				return {response: responseData, status: response.status};

			} catch (error) {
				if(error.name === "AbortError") return ;
                
				if (!abortController.signal.aborted) {
					setError(error.message);
				}
               
			}
			finally {
				if (!abortController.signal.aborted) {
					setLoading(false);
				}
			}

			return () => {
				abortController.abort();
			};

		}, []);

	const clearError = () => {
		setError(null);
	};

	return { isLoading, error, sendRequest, clearError };
};


export default useFetch;
