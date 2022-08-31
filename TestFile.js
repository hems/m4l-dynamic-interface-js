autowatch = 1;

// 1st test: classes don't exist on max msp' javascript:

// class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// }

function Rectangle(width, height) {
	this.width = width;
	this.height = height;
}

var rectangle = new Rectangle(10, 10)

function bang() {
	post("\n");
	post("rectangle 3->", rectangle.width, rectangle.height);
	post("\n");
}

// 2nd test: Where is patcher?

function whereIsPatcher() {
	post("\n");
	post(" --> whereIsPatcher??")
	post("\n");
	post("top level function this.patcher ->", this.patcher)
	post("\n");

	function secondLevelFunction() {
		post("\n");
		post("second level function this.patcher ->", this.patcher);
		post("second level function patcher ->", patcher)
		post("patcher is global!!")
		post("\n");
	}
	
	secondLevelFunction()
}

function whereIsPatcherFixed() {
	post("\n");
	post(" --> whereIsPatcherFixed??")
	post("\n");
	post("\n");
	post("top level function this.patcher ->", this.patcher)
	post("\n");
	post("top level function p ->", p)
	post("\n");

	const patcher = this.patcher

	function secondLevelFunction() {
		post("\n");
		post("second level function this.patcher ->", this.patcher);
		post("\n");
		post("second level function patcher ->", patcher)
		post("\n");
		post("second level function p ->", p)
		post("\n");
	}
	
	secondLevelFunction()
}


// 3nd test: get box rect

function getPatchPresentationRect(){
	var object = this.patcher.getnamed("multislider_0")
	
	post("object ->", object.getattr('presentation_rect')	)
}