 
 // 2. This code loads the IFrame Player API code asynchronously.
            // 2. 変数tagにscriptタグを作って入れる。Element=要素、Attrubute=属性
var tag = document.createElement('script');
    
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
// 3. APIのコードを読み込んでから、この関数を<iframe>内に影響させる。
var player;
let youtubeId = 'ntRWt_vyY2Y';
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: youtubeId,
        playerVars: {
        //③パラメータの設定
        playsinline: 1,
        controls: 0
    },
    events: {
        onReady: onPlayerReady, //エラーで効かない。
         // onStateChange: onPlayerStateChange
    }
    });
}
    
// 4. The API will call this function when the video player is ready.
// 4. このAPIは、video playderが準備でしたら、この関数を呼び出します。
function onPlayerReady(event) {
    event.target.playVideo(); //①最初の再生を止める
    let currentVol = 50; //②最初のボリュームを設定（0〜100）
    event.target.setVolume(currentVol); //③Playerのボリュームに設定
    document.querySelector('#volume').value = currentVol; //④rangeFormに音量を設定
    document.querySelector('#volumeNum').textContent = currentVol; //⑤テキストにも音量を数値で表示
}
    
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
/* 5. video playerのステート（状態）が変更されたら、この関数を呼び出す。
動画を再生するときの設定は、state=1にしておきます。
プレイヤーは、6000ミリ秒後に終了します。 */
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
//停止関数
function stopVideo() {
    player.stopVideo();
}
//再生関数
function playTheVideo() {
player.playVideo();
}
//一時停止関数
function pauseTheVideo() {
    player.pauseVideo();
}
//ミュート関数
function onMute() {
    //ミュートの時、trueを返すのでミュートを解除します。
    if (player.isMuted()) {
        player.unMute();
    } else {
        //ミュートが解除されている時はfalseなので、ミュートにします。
        player.mute();
    }
}
//10秒前にの関数
function onePrev() {
    let currentTime = player.getCurrentTime();
    player.seekTo(currentTime - 10);
}

//10秒後にの関数
function oneNext() {
    let currentTime = player.getCurrentTime();
    player.seekTo(currentTime + 10);
}
//ボリューム関数
function volumeFn(vol) {
    let currentVol = player.getVolume();
    player.setVolume(vol);
}
//再生スピード関数
function playSpeed(num) {
    //setPlaybackRateが再生スピードをセットするメソッド
    console.log(num);
    player.setPlaybackRate(num);
    player.playVideo();
}
//再生イベント
let doplayBtn = document.querySelector('#doplay');
doplayBtn.addEventListener('click', function () {
    playTheVideo(); //関数名に変更
});

//一時停止イベント
let dopauseBtn = document.querySelector('#dopause');
dopauseBtn.addEventListener('click', function () {
    pauseTheVideo();
});
//ミュートイベント
let onMuteBtn = document.querySelector('#mute');
onMuteBtn.addEventListener('click', function () {
    onMute();
    if (onMuteBtn.innerText === 'ミュート') {
        onMuteBtn.innerText = 'ミュート解除';
    } else {
        onMuteBtn.innerText = 'ミュート';
    }
});

//ボリュームイベント
let volumeBtn = document.querySelector('#volume');
let volumeTxt = document.querySelector('#volumeNum');
volumeBtn.addEventListener('change', function () {
    volumeFn(this.value);
    volumeTxt.textContent = this.value;
});
//動画切り替えイベント
let movieid = document.querySelector('#MovieId');
movieid.addEventListener('change', function () {
    youtubeId = movieid.value;
    //プレイヤー削除
    player.destroy();
    onYouTubeIframeAPIReady();
});

let ytSearchBtn = document.querySelector('#searchBtn');
ytSearchBtn.addEventListener('click', function (e) {
    let ytSearchVal = document.querySelector('#ytSearch').value;
    console.log(ytSearchVal);//検索ワードの表示
    ytSearch(ytSearchVal)//関数の実行。引数で検索ワードを与えたい

    e.preventDefault(); //検索ボタンの送信をストップしておく。
});
//検索関数[Ajax]
function ytSearch(val) {
    let key = 'AIzaSyC0QUgrDMD28Dtocuf9n7qw_IwWsj2UB6U'; //自分のキーに書き換えます。
    let num = 10;
    let part = 'snippet';
    let type = 'video';
    let query = val;
    fetch(`https://www.googleapis.com/youtube/v3/search?type=${type}&part=${part}&maxResults=${num}&key=${key}&q=${query}&playsinline=1`)
        .then((data) => data.json())
        .then((obj) => {
            console.log(obj);
            movieid.innerHTML = null;
            for (let i in obj["items"]) {
                //各videoIdとタイトルを取得
                console.log(obj["items"][i]["id"]["videoId"]);
                console.log(obj["items"][i]["snippet"]["title"]);
                //各videoIdとタイトルを取得して変数に代入
                let ytId = obj["items"][i]["id"]["videoId"];
                let ytTitle = obj["items"][i]["snippet"]["title"];
                //optionを作成して、videoIdとtitleを所定の場所に設置し、要素を追加していく。
                let optionTag = document.createElement('option');
                optionTag.textContent = ytTitle;
                optionTag.setAttribute('value', ytId);
                movieid.appendChild(optionTag);
            }
        });
}
document.getElementById("dopause").style.display = "none";
const p1 = document.getElementById("doplay");
const p2 = document.getElementById("dopause")
function clickBtn1(){
    p1.style.display="none";
    p2.style.display="block"
}
function clickBtn2(){
    p1.style.display="block";
    p2.style.display="none"
}

let button = document.querySelector(".syutyubutton");
 let sousa = document.querySelector(".sousa");
 let settei  =document.querySelector(".settei");
 let start = document.querySelector(".start");
let time = document.querySelector(".sytutime");
let kyukei = document.querySelector(".kyukei");
let syutyu = document.querySelector(".syutyu")
let stime = document.querySelector(".time");
let ktime = document.querySelector(".kyukeitime");
let players = document.querySelector("#player");
let kyukeibuton = document.querySelector(".kyukeibuton");
let karea = document.querySelector(".kyukeiarea");
let kretrun = document.querySelector(".kreturn");
let ytframe = document.querySelector(".player");
let kktime = document.querySelector(".kyukeitimekyukei")
var spanedSec = 0;
var secondSec = 0;
var intervalId;
var intervalsecond;
 console.log(button);
 button.addEventListener("click",function(){
    sousa.classList.toggle('move');
    if(sousa.classList.contains("move")==true){
        sousa.setAttribute("style","display:none");
        settei.setAttribute("style","display:block");
        button.innerHTML="やめる"
    }else{
        sousa.setAttribute("style","display:block");
        settei.setAttribute("style","display:none");
        syutyu.setAttribute("style","display:none");
        karea.setAttribute("style","display:none")
        syutyu.classList.remove("move")
        ytframe.classList.remove("none");
        ytframe.setAttribute("style","display:block")
        console.log(ytframe)
        button.innerHTML="集中する";
        stop();
    }
 })
 
 
start.addEventListener("click",function(){
    console.log(ytframe)
    syutyu.classList.toggle('move');
    if(syutyu.classList.contains("move")==true){
        syutyu.setAttribute("style","display:block");
        settei.setAttribute("style","display:none");
        ytframe.classList.add("none");
    }
    let timecout = time.value;
    let kyuukeicount = kyukei.value;
    ytframe.setAttribute("style","display:none");
    console.log(timecout);
    stime.innerHTML=timecout;
    ktime.innerHTML=kyuukeicount;
    starts(timecout);
    let quiz = document.querySelector(".quiz");
    let quiznumber =[];
    let answer = [];

    for(let i=0;i<4;i++){
        let numbers = Math.floor(Math.random()*3000)+5000;//5000~8000
        let answernumber = Math.floor(Math.random()*6000)+10000;//10000~16000
        answer[i]=answernumber;
        quiznumber[i]=numbers;
        console.log(quiznumber)
        console.log(answer)
    }

    let sentakusi =[]
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            sentakusi[i] = quiznumber[i]+quiznumber[j];
        }
    }
    console.log(sentakusi);

    let quzitext = document.querySelector(".quiztext");
    quzitext.innerText = quiznumber[0]+"+"+quiznumber[1]+"は？"

    for(let i=0;i<4;i++){
        let ans = document.createElement("input");
        ans.setAttribute("type","submit");
        ans.setAttribute("value",sentakusi[i]);
        // ans.innerText=sentakusi[i];
        ans.classList.add("answerbutton")
        quiz.appendChild(ans);
    }
    let ansnum = quiznumber[0]+quiznumber[1];
    console.log(ansnum)
    let ran = Math.floor(Math.random()*4);
    let quesution = document.querySelectorAll(".answerbutton")
    quesution[ran].setAttribute("value",ansnum);
    console.log(quesution);
    for(let i =0;i<quesution.length;i++){
        quesution[i].addEventListener("click",function(){
            if(quesution[i].value==ansnum){
                 karea.classList.toggle('move');
                if(karea.classList.contains("move")==true){
                    syutyu.setAttribute("style","display:none")
                    karea.setAttribute("style","display:block")
                }
                let kyuukeicount = kyukei.value;
                kktime.innerHTML=kyuukeicount;
                console.log(kyuukeicount);
                ytframe.setAttribute("style","display:block")
                kyutarts(kyuukeicount)
                stop();
            }else{
                    let aori = document.querySelector(".aori");
                    aori.innerText="こんな問題間違えてるなんて、、もしかしてさっきから集中してない？？"
                }
           
        })
    }
        
})
let timet="";
function starts(minit){
    console.log(minit)
    if(intervalId == null){
        intervalId = setInterval(function(){
            // timet = 0;
            // spanedSec=0
            spanedSec ++;
            timet = minit-spanedSec;
            stime.innerText = minit-spanedSec;
            if(timet == 0){
                pauseTheVideo();
                alert("お疲れさまでした。");
                stop();
            }
        },1000*60)
    }
}
kyukeibuton.addEventListener("click",function(){
    karea.classList.toggle('move');
    if(karea.classList.contains("move")==true){
        syutyu.setAttribute("style","display:none")
        karea.setAttribute("style","display:block")
    }
    let kyuukeicount = kyukei.value;
    kktime.innerHTML=kyuukeicount;
    console.log(kyuukeicount);
    ytframe.setAttribute("style","display:block")
    kyutarts(kyuukeicount)
    stop();
});
function stop() {
    clearInterval(intervalId);
    intervalId = null;
    spanedSec = 0
}
function stopky() {
    clearInterval(intervalsecond);
    intervalsecond = null;
    secondSec = 0
}
let kerimet=0;
function kyutarts(kinit){
    console.log(kktime)
    if(intervalsecond == null){
        intervalsecond = setInterval(function(){
            secondSec++;
            kerimet = kinit-secondSec;
            kktime.innerText = kinit-secondSec;
            console.log(kktime)
            if(kerimet ==0){
                alert("休憩が終了しました");
                stopky();
            }
        },1000*60)
    }
}
kretrun.addEventListener("click",function(){
    karea.classList.toggle("move");
    syutyu.setAttribute("style","display:block")
    karea.setAttribute("style","display:none");
    ytframe.setAttribute("style","display:none")
    ktime.innerHTML= kerimet;
    kyukei.value = kerimet
    stopky();
    starts(timet);
})


