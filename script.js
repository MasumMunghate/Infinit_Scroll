document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("img-container");
    const loader = document.getElementById("loader");
    const apikey = "xJxJPJ1pk4HgFuMIsX9RFCavN6IGU4Yawa14P5Aq31s";
    let page = 1;

    async function getPhotos() {
        loader.style.display = "block";
        const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=10&page=${page}`;

        try {
            const response = await fetch(apiUrl);
            const photosArray = await response.json();
            loader.style.display = "none";

            photosArray.forEach((photo) => {
                const item = document.createElement("div");
                const img = document.createElement("img");

                img.src = photo.urls.small;
                img.alt = photo.alt_description;
                item.appendChild(img);

                img.addEventListener("click", () => {
                    window.location.href = photo.links.html;
                });

                imageContainer.appendChild(item);
            });

            page++;
        } catch (error) {
            console.error(error);
        }
    }

    getPhotos();

    window.addEventListener("scroll", () => {
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            getPhotos();
        }
    });
});