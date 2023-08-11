<template>
    <div class="video-group">
        <div class="video-container mr-4">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>

        <div class="video-container ml-4">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</template>

<style scoped>
.video-group {
    display: flex;
    width: 100%;
}

.video-container {
    position: relative;
    height: auto;
    width: 50%;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
}
</style>