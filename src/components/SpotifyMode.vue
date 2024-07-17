<template>
    <a @click="getRefreshToken()"
           aria-label="Toggle dark mode"
           class="navbar-item is-inline-block-mobile">
        <img src="/public/assets/icons/spotify.svg" alt="spotify">
    </a>
</template>

<script>
export default {
    data() {},
    methods: {
        async getRefreshToken() {
            const refreshToken = localStorage.getItem("refresh_token_spotify") || "";
            const url = localStorage.getItem('endpoint_spotify') + "/api/token" || "";
            const clientId = localStorage.getItem('client_id_spotify') || "";
            const clientSecret = localStorage.getItem('client_secret_spotify') || "";

            const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                "Basic " + btoa(`${clientId}:${clientSecret}`),
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            };

            const response = await fetch(url, payload)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error("Error:", error);
            });

            if (response && response.access_token) {
                localStorage.setItem("access_token_spotify", response.access_token);
            } else {
                console.error("Failed to refresh token", response);
            }
        },
    }
}
</script>