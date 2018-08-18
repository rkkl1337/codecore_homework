class Turtle {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.direction = "east";
        this.points = [[x, y]];
    }
    
    forward (n) {
        if (this.direction === "north") {
            let i = 0;
            while (i < n) {
                i += 1;
                this.points.push([this.x, this.y + i]);
            }
            this.y = this.y + n;
        } else if (this.direction === "east") {
            let i = 0;
            while (i < n) {
                i += 1;
                this.points.push([this.x + i, this.y]);
            }
            this.x = this.x + n;
        } else if (this.direction === "south") {
            let i = 0;
            while (i < n) {
                i += 1;
                this.points.push([this.x, this.y - i]);
            }
            this.y = this.y - n;
        } else {
            let i = 0;
            while (i < n) {
                i += 1;
                this.points.push([this.x - i, this.y]);
            }
            this.x = this.x - n;
        }
        return this;
    }  
    right () {
        if (this.direction === "north") {
            this.direction = "east";
        } else if (this.direction === "east") {
            this.direction = "south";
        } else if (this.direction === "south") {
            this.direction = "west";
        } else {
            this.direction = "north"
        }
        return this;
    }
    left () {
        if (this.direction === "north") {
            this.direction = "west";
        } else if (this.direction === "west") {
            this.direction = "south";
        } else if (this.direction === "south") {
            this.direction = "east";
        } else {
            this.direction = "north"
        }
        return this;
    }
    allPoints () {
        return this.points;
    }
    print () {
        let result = "";
        const xnum = [];
        const ynum = [];

        for (let item of this.points) {
            xnum.push(item[0]);
            ynum.push(item[1]);
        }

        let xmin = Math.min(...xnum);
        let xmax = Math.max(...xnum);
        let ymin = Math.min(...ynum);
        let ymax = Math.max(...ynum);

        let found = false;

        result += '-'.repeat(xmax - xmin) + '\n';
        
        for (let i = ymax ; i >= ymin ; i -= 1) {
            for (let k = xmin ; k <= xmax ; k += 1) {
                for (let items of this.points) {
                    if (items[0] === k && items[1] ===i) {
                        found = true;
                    }
                }
                if (found === true) {
                    found = false;
                    result += '*';
                } else {
                    result += ' ';
                }
            }
            result += '\n'
        }
        result += '-'.repeat(xmax - xmin);
        return result;

    }
}