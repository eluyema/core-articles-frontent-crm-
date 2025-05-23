import ky from "ky";

export const api = ky.create({
    hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
        afterResponse: [
            async (_request, _options, response) => {
                if (response.status === 401 && window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
                return response;
            },
        ],
    },
});
