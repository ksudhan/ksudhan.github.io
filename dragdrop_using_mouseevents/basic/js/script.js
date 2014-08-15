$(function(){

	var mouseHandler = {};
	mouseHandler.leftBtn = false;
	mouseHandler.target;

	var movableData = {};
	movableData.offsetX;
	movableData.offsetY;

	$(document).bind("mouseup",function(){
		mouseHandler.leftBtn = false;
		delete mouseHandler.target;
	});
	$("#movable").bind("mousedown",function(e){
		mouseHandler.leftBtn = true;
		mouseHandler.target = e.target;	

        movableData.offsetX = e.pageX - mouseHandler.target.offsetLeft;
		movableData.offsetY = e.pageY - mouseHandler.target.offsetTop;
	});
	$("#wrapper").bind("mousemove",function(e){
		if( mouseHandler.target && mouseHandler.leftBtn  ) {
			mouseHandler.target.style.left = (e.pageX - movableData.offsetX)+"px";
			mouseHandler.target.style.top = (e.pageY - movableData.offsetY)+"px";
		}
	});

});