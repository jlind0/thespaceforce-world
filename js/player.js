var YouTubePlayer = (function () {
    function YouTubePlayer(panel, videoId, aspectRatio) {
        var _this = this;
        this.panel = panel;
        this.aspectRatio = aspectRatio;
        this.HostPanel = $("#playerWrapper").get(0);
        var size = this.CalcVideoSize();
        this.Player = new YT.Player(panel, {
            videoId: videoId,
            height: size.Height,
            width: size.Width,
            host: "https://www.youtube.com",
            playerVars: {
                playsinline: 1,
                origin: 'https://' + window.location.host,
                autoplay: 1
            }
        });
        window.onresize = function () {
            if (_this.Player != null) {
                size = _this.CalcVideoSize();
                _this.Player.setSize(size.Width, size.Height);
            }
        };
    }
    YouTubePlayer.prototype.CalcVideoSize = function () {
        var width = Math.floor($("#playerInner").width() * 0.98);
        var height = Math.floor(width * this.aspectRatio);
        return {
            Width: width,
            Height: height
        };
    };
    return YouTubePlayer;
}());
export { YouTubePlayer };
window.YouTubePlayer = YouTubePlayer;
//# sourceMappingURL=player.js.map