var YouTubePlayer = (function () {
    function YouTubePlayer(panel, videoId, aspectRatio) {
        var _this = this;
        this.panel = panel;
        this.aspectRatio = aspectRatio;
        var size = this.CalcVideoSize();
        this.Player = new YT.Player(panel, {
            videoId: videoId,
            height: size.Height,
            width: size.Width,
            events: {
                onReady: function () {
                    _this.Player.playVideo();
                }
            },
            playerVars: {
                autoplay: YT.AutoPlay.AutoPlay,
                playsinline: YT.PlaysInline.Inline
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
        var width = Math.floor($(this.panel).width() * 0.98);
        var height = Math.floor(width * this.aspectRatio);
        return {
            Width: width,
            Height: height
        };
    };
    return YouTubePlayer;
}());
export { YouTubePlayer };
//# sourceMappingURL=player.js.map