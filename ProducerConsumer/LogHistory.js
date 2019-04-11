class LogHistory {
	constructor(div) {
		this.div = div;
		this.div.innerHTML = "";
	}

	addData(color) {
        let line = document.createElement("div");
		let circle = document.createElement("div");
		circle.className = "p-2";
		circle.style.cssText = "background-color: " + color + "; width: 10px; height: 10px; border: 1px solid black; border-radius: 50%;";
        line.append(circle);
		this.add(line);
	}

	pickData(color) {

	}

	add(d) {
		this.div.appendChild(d);
		this.div.scrollTop = log.scrollHeight;
	}
}
