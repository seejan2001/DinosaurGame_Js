

const cvs = document.getElementById("dino");
const scoreContent = document.getElementById("header");
const ctx = cvs.getContext("2d");


const sprite = new Image();
sprite.src="download.png";

const spriteCactus = new Image();
spriteCactus.src = "cactus.png";

let frame=0;
let count=10;
let scores =0;

const score ={
    scoreNum :0,
    x:50,
    y:50,

    draw:function(){
        
    }
}



// CLEAR BACKGROUND
const clear ={
    x:0,
    y:0,
    xMax: cvs.width,
    yMax:cvs.height,

    // TO CLEAR SCREEN ON EVERY RENDER
    draw:function()
    {
        ctx.fillStyle="white";
        ctx.fillRect(0,0,this.xMax,this.yMax);
    }

}

// DINO
const dino={
    sX:50,
    sY:10,
    h:200,
    w:130,
    x:60,
    y:200,
    gravity:210,
    radius:12,
    j:0,

    jump:function(){
        this.y = this.y-this.gravity;
    },
    stayOnGround:function(){
    //  TILL REMAIN ON SPACE UNTIL Y REACHES TO 200 POSITION
        if(this.y !==200)
        {
            this.y +=10;    
        }
        },
        draw:function(){
         ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w-60,this.h-90);
    }
}


// CATCUS
const catcus ={
    sX:0,
    sY:50,
    h:150,
    w:40,
    x:cvs.width-150,
    y:200,
    dx:8,
    position:[],
    radius:12,

    draw:function(){
         ctx.drawImage(spriteCactus,this.sX,this.sY,this.w+250,this.h+200,this.x,this.y,this.w+30,this.h-50)
    },
    update:function(){
    //  RENDER CACTUS FROM xMax OF XAXIS
            if(this.x <0){
                this.x=cvs.width+150,
                y=200
            }else{
                if(count==10){
                    this.dx =9
                }
            this.x = (this.x-this.dx);

    // COLLISION DETECTION TECHNIQUE
            if( dino.x + dino.radius > catcus.x - catcus.radius 
                && dino.y + dino.radius > catcus.y - catcus.radius 
                && dino.x - dino.radius < catcus.x +catcus.radius )
            {
                console.log("GameOver");
                scoreContent.innerHTML="GameOver";
                
            }
            if(frame%10==0){scoreContent.innerHTML="START"}
            
                            
        }
    }

}



function update(){
    catcus.update();
    dino.stayOnGround();
}
function draw(){
    clear.draw();
    dino.draw();
    catcus.draw();
}
function loop(){
    draw();
    update();
    frame++;
    requestAnimationFrame(loop)
}
loop();

cvs.addEventListener("click",function(){
    // TILL DINO IS ON SPACE USER CANT PERFORM MULTIPLE CLICKS
    if(dino.y !== 200){return}
    else{
    console.log("Jump")
    dino.jump();
}
})

