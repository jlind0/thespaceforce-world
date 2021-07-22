///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/@types/knockout/index.d.ts"/>
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
    constructor(protected panel : HTMLElement, videoId: string, protected aspectRatio : number){
        var size = this.CalcVideoSize();
        this.Player = new YT.Player(panel, {
            videoId: videoId,
            height: size.Height,
            width: size.Width,
            events: {
                onReady: () =>{
                    this.Player.playVideo();
                }
            },
            playerVars:{
                autoplay: YT.AutoPlay.AutoPlay,
                playsinline: YT.PlaysInline.Inline
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
        var width = Math.floor($(this.panel).width() * 0.98);
        var height = Math.floor(width*this.aspectRatio)
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

