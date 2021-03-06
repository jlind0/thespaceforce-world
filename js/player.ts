///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/@types/youtube/index.d.ts"/>
///<reference path="../node_modules/@types/youtube-player/index.d.ts"/>
export 
declare var StartVideo : YouTubePlayer;
/*export function onYouTubeIframeAPIReady() : void{
    StartVideo = new YouTubePlayer($("#topPlayer").get(0), "M6bumUQwQIU", 16.0/9.0);
}*/
declare global{
    interface Window{
        YouTubePlayer? : typeof YouTubePlayer;
    }
}
export class YouTubePlayer{
    protected Player : YT.Player;
    protected HostPanel : HTMLElement;
    constructor(protected panel : HTMLElement, videoId: string, protected aspectRatio : number){
        this.HostPanel = $("#playerWrapper").get(0);
        var size = this.CalcVideoSize();
        this.Player = new YT.Player(panel, {
            videoId: videoId,
            height: size.Height,
            width: size.Width,
            host: "https://www.youtube.com",
            playerVars:{
                playsinline: YT.PlaysInline.Inline,
                origin: 'https://'+ window.location.host,
                autoplay: YT.AutoPlay.AutoPlay
            },
            events: {
                onReady: (evt) =>{
                    evt.target.mute();
                    evt.target.playVideo();
                    //setTimeout(() => evt.target.unMute(), 5000); -Stops Video Playback at 5sec
                }
            }
        });
        window.onresize = ()=>{
            if(this.Player != null){
                size = this.CalcVideoSize();
                this.Player.setSize(size.Width, size.Height);
            }
        };
    }
    protected CalcVideoSize() : VideoSize{
        var width: number; 
        var height: number;
            width = Math.floor($("#playerInner").width() * 0.98); 
            height = Math.floor(width*this.aspectRatio)
        
        return{
            Width: width,
            Height: height
        }
    }
}
window.YouTubePlayer = YouTubePlayer;

export interface VideoSize{
    Width: number;
    Height: number;
}


