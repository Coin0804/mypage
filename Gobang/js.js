var cavConfig = {
    border:30,
    width:45
}
var Game,ctx;

document.body.onload = ()=>{
    let cav = document.getElementById("cav")
    ctx = cav.getContext('2d')
    initGame()
    let main = document.getElementById("main")
    main.onclick = (e)=>{
        let x = -1,y = -1;
        let nearX = (e.offsetX-cavConfig.border)/cavConfig.width
        let nearY = (e.offsetY-cavConfig.border)/cavConfig.width
        let xl = Math.floor(nearX)
        let xh = Math.ceil(nearX)
        let yl = Math.floor(nearY)
        let yh = Math.ceil(nearY)
        if(nearX-xl<0.3){
            x = xl
        }else if(xh-nearX<0.3){
            x = xh
        }
        if(nearY-yl<0.3){
            y = yl
        }else if(yh-nearY<0.3){
            y = yh
        }
        if(x>=0&&y>=0){
            playChess(x,y)
        }
    }
}

function initGame(){
    initImg()
    Game = {
        Rex:[],
        player:true,
        on:true
    }

}

function playChess(x,y){
    if(x<0||x>14||y<0||y>14)return
    if(Game.Rex[x+15*y] || !Game.on)return
    if(Game.player){
        Game.Rex[x+15*y] = 1
        ctx.beginPath()
        ctx.fillStyle = "black"
    }else{
        Game.Rex[x+15*y] = 2
        ctx.beginPath()
        ctx.fillStyle = "white"
        let center = {
            x:cavConfig.border+x*cavConfig.width,
            y:cavConfig.border+y*cavConfig.width
        }
    }
    let center = {
        x:cavConfig.border+x*cavConfig.width,
        y:cavConfig.border+y*cavConfig.width
    }
    ctx.beginPath()
    ctx.arc(center.x,center.y,18,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()
    isWin(x,y)
    Game.player = !Game.player

}


function isWin(x,y){
    let dir = [
        {// 右
            num:0,
            arr:[1,0]
        },
        {// 右上
            num:0,
            arr:[1,1]
        },
        {// 上
            num:0,
            arr:[0,1]
        },
        {// 左上
            num:0,
            arr:[-1,1]
        },
        {// 左
            num:0,
            arr:[-1,0]
        },
        {// 左下
            num:0,
            arr:[-1,-1]
        },
        {// 下
            num:0,
            arr:[0,-1]
        },
        {// 右下
            num:0,
            arr:[1,-1]
        },
    ]
    for(let i=0;i<8;i++){
        for(let j=1;j<=5;j++){
            let xt = x+j*dir[i].arr[0]
            let yt = y+j*dir[i].arr[1]
            if(Game.Rex[xt+15*yt]==(Game.player?1:2)){
                dir[i].num+=1
            }else{
                break
            }
        }
    }
    for(let i=0;i<4;i++){
        if((dir[i].num+dir[i+4].num+1)>=5){
            win()
            break
        }
    }
}



function initImg(){
    ctx.beginPath()
    for(let i=0;i<15;i++){
        let b = {
            x:cavConfig.border+i*cavConfig.width,
            y:cavConfig.border
        }
        let e = {
            x:b.x,
            y:cavConfig.border+14*cavConfig.width
        }        
        ctx.moveTo(b.x,b.y)
        ctx.lineTo(e.x,e.y)
    }
    for(let i=0;i<15;i++){
        let b = {
            x:cavConfig.border,
            y:cavConfig.border+i*cavConfig.width
        }
        let e = {
            x:cavConfig.border+14*cavConfig.width,
            y:b.y
        }
        ctx.moveTo(b.x,b.y)
        ctx.lineTo(e.x,e.y)
    }
    ctx.stroke()
    points = [3,7,11]
    for(let i of points){
        for(let j of points){
            let center = {
                x:cavConfig.border+i*cavConfig.width,
                y:cavConfig.border+j*cavConfig.width
            }
            ctx.beginPath()
            ctx.arc(center.x,center.y,5,0,2*Math.PI)
            ctx.fill()
        }
    }
}

function win(){
    Game.on = false
    let s = Game.player?"黑色胜利！":"白色胜利！"
    setTimeout(()=>{alert(s)},10)
}










