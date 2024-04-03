const ytKey = "AIzaSyCpCaVNkQpCR4WUgXZizZF6GZjXvoMwGEg";

function createVideoContainer(videoId, videoTitle) {
    const videoContainer = document.getElementById("videoContainer");
    const container = document.createElement("div");
    container.className = "video-container";

    const iframe = document.createElement("iframe");
    iframe.title = "Walkthrough the place";
    iframe.width = "600";
    iframe.height = "350";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    container.appendChild(iframe);

    const title = document.createElement("div");
    title.className = "video-title";
    title.textContent = videoTitle;
    container.appendChild(title);

    videoContainer.appendChild(container);

    // Add gap between videos
    const gap = document.createElement("div");
    gap.className = "video-gap";
    videoContainer.appendChild(gap);
}

function clearVideoContainer() {
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = "";
}

function submitForm(event) {
    event.preventDefault();

    const placeInput = document.getElementById("addressInput");
    const nameofplace = placeInput.value.trim();

    if (nameofplace === "") {
        return;
    }

    clearVideoContainer(); // Clear previous videos

    axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
            q: `${nameofplace} walk`,
            part: "snippet",
            key: ytKey,
        },
    })
            .then(response => {
                const videoItems = response.data.items;
                videoItems.forEach((item, index) => {
                    const videoWalk = item.id.videoId;
                    const videoTitle = item.snippet.title;
                    createVideoContainer(videoWalk, videoTitle);

                    const gap = document.createElement("br");
                    const gap2 = document.createElement("br");
                    gap.className = "video-gap";
                    videoContainer.appendChild(gap);
                    videoContainer.appendChild(gap2);

                });
            })
            .catch(error => {
                console.error(error);
            });

}
