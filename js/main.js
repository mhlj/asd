var ctx;
//每一个小格子宽高20
var blockSize = 20;
var rows = 30;
var cols = 40;
//蛇的数组,装的蛇每一个格子的坐标
var snakes=[];
var snakeLength = 4;
var foodx;
var foody;
var interval;
var deration = 3;
window.onload = function()
{
	ctx = document.getElementById("canvas").getContext("2d");
	
	//初始化数组
	initSnake();
	initFood();
	draw();
	interval = setInterval(move,200);
	document.onkeydown = function(event)
	{
		var e = event||window.event;
		
		keyDown(e.keyCode);
	}
}

function keyDown(keycode)
{
	switch (keycode){
		case 37:
		{
			if(deration == 2||deration==4)
				deration =1;
		}
			break;
		case 38:
		{
			if(deration == 1||deration==3)
				deration =2;
		}
			break;
		case 39:
		{
			if(deration == 2||deration==4)
				deration =3;
		}
			break;
		case 40:
		{
			if(deration == 1||deration==3)
				deration =4;
		}
			break;
		default:
			break;
	}
}

function move()
{
	switch (deration){
		//left
		case 1:
			snakes.push({
				x:snakes[snakeLength-1].x-blockSize,
				y:snakes[snakeLength-1].y
			});
			break;
		//top
		case 2:
			snakes.push({
				x:snakes[snakeLength-1].x,
				y:snakes[snakeLength-1].y-blockSize
			});
			break;
		//right
		case 3:
			snakes.push({
				x:snakes[snakeLength-1].x+blockSize,
				y:snakes[snakeLength-1].y
			});
			break;
		//bottom
		case 4:
			snakes.push({
				x:snakes[snakeLength-1].x,
				y:snakes[snakeLength-1].y+blockSize
			});
			break;
		default:
			break;
	}
	if(	!isOver()){
		//吃食物
	isEat();
	//删除数组第一个元素
	snakes.shift();
	draw();

	}
	

	
	
}

function isOver(){
	//撞墙
	if(snakes[snakeLength-1].x==-20||snakes[snakeLength-1].x==blockSize*cols
		||snakes[snakeLength-1].y==-20||snakes[snakeLength-1].y==blockSize*rows){
		
		clearInterval(interval);
		alert("年轻司机，撞墙了！");
		return true;
	}
	//撞自己
	for (var i=0;i<snakeLength-1;i++) {
		var x=snakes[i].x;
		var y=snakes[i].y;
		if(snakes[snakeLength-1].x==x&&snakes[snakeLength-1].y==y)
		{
			clearInterval(interval);
			alert("咬自己疼不疼？");
			return true;
		}
	}
	return false;
}

function isEat()
{
	if(snakes[snakeLength-1].x==foodx&&snakes[snakeLength-1].y==foody){
		snakeLength++;
		snakes.unshift(
			//加了之后再删除
			{x:0,
			y:0}
		);
		initFood();
	}
}
function draw()
{
	ctx.clearRect(0,0,blockSize*cols,blockSize*rows);
	//画网格
	ctx.strokeStyle = "rgba(50,50,50,0.4)";
	ctx.lineWidth = 1;
	
	for (var i=0;i<=rows;i++) {
		ctx.beginPath();
		ctx.moveTo(0,i*blockSize);
		ctx.lineTo(cols*blockSize,i*blockSize);
		ctx.closePath();
		ctx.stroke();
	}
	
	for (var i=0;i<=cols;i++) {
		ctx.beginPath();
		ctx.moveTo(i*blockSize,0);
		ctx.lineTo(i*blockSize,cols*blockSize);
		ctx.closePath();
		ctx.stroke();
	}
	
	//画蛇
	for (var i=0;i<snakeLength;i++) {
		ctx.beginPath();
		ctx.fillStyle = "aqua";
		if(i==snakeLength-1){
			ctx.fillStyle = "purple";
		}
		ctx.fillRect(snakes[i].x,snakes[i].y,blockSize,blockSize);
		ctx.moveTo(snakes[i].x,snakes[i].y);
		ctx.lineTo(snakes[i].x+blockSize,snakes[i].y);
		ctx.lineTo(snakes[i].x+blockSize,snakes[i].y+blockSize);
		ctx.lineTo(snakes[i].x,snakes[i].y+blockSize);
		
		ctx.closePath();
		ctx.strokeStyle = "red";
		ctx.stroke();
	
	}
	//画食物
	ctx.beginPath();
	ctx.fillStyle = "yellow";
	ctx.fillRect(foodx,foody,blockSize,blockSize);
	//画边框
	ctx.moveTo(foodx,foody);
	ctx.lineTo(foodx+blockSize,foody);
	ctx.lineTo(foodx+blockSize,foody+blockSize);
	ctx.lineTo(foodx,foody+blockSize);
	ctx.lineTo(foodx,foody);
	ctx.strokeStyle = "red";
	ctx.closePath();
	ctx.stroke();
	
	
}

function initSnake()
{
	for(var i=0;i<snakeLength;i++)
	{
		snakes[i]={
			x:i*blockSize,
			y:0
		}
	}
}

function initFood () {
	do{
	foodx = Math.floor(Math.random()*cols)*blockSize;
	foody = Math.floor(Math.random()*rows)*blockSize;
	}
	while(foodInSnake(foodx,foody));
}
//判断食物在不在蛇的身上
function foodInSnake(fx,fy)
{
	for(var i=0;i<snakeLength;i++){
		if(fx == snakes[i]&&fy==snakes[i])
		{
			return true;
		}
	}
	return false;
}
