// Middleware
const fs = require(`fs`);
const readline = require(`readline`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menu options
const menu = {
    title: `\nWelcome to Todo CLI!\n--------------------`,

    select: function nselect() {
        rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n\n> `, answer => {
            if (answer === `v`) {
                this.view();
            } else if (answer === `n`) {
                this.new();
            } else if (answer[0] === 'c') {
                this.complete(answer.slice(1));
            } else if (answer[0] === 'd') {
                this.remove(answer.slice(1));
            } else if (answer === `q`) {
                this.quit();            
            } else {
                console.log('\nError: Invalid option\n');
                this.select();
            }
        })
    },

    view: function view() {
        console.log('');
        if(this.todo.length === 0) {
            console.log(`No items on list`);
        } else {
            for (let i = 0 ; i < this.todo.length ; i += 1) {
            console.log(`${i} ${this.todo[i]}`);
            }
        }
        console.log('');
        this.select();
    },

    new: function create() {
        rl.question(`\nWhat?\n\n> `, answer => {
            this.todo.push(`[ ] ${answer}`);
            console.log(``);
            this.select();
        })
        
    },
    
    complete: function complete(x) {
        if (this.todo[x] === undefined || x < 0 || x > this.todo.length - 1) {
            console.log("\nError: Invalid number.\n");
            this.select();
        } else {
            console.log(`\nCompleted ${this.todo[x].slice(4)}.\n`);
            this.todo[x] = this.todo[x].replace('[ ]', '[✓]');
            this.select();
        }
    },

    remove: function remove(y) {
        console.log(typeof y);
        if (this.todo[y] === undefined || y < 0 || y > this.todo.length - 1) {
            console.log("\nError: Invalid number.\n");
            this.select();
        } else {
            console.log(`\nDeleted ${this.todo[y].slice(4)}.\n`);
            this.todo.splice(y, 1);
            this.select();
        }
    },

    quit: function quit() {
        fs.writeFile('./todolist', menu.todo, (err) => {
            if (err) throw err;
            console.log(`\nSaved! See you soon!\n`);
            process.exit();
        })
    }

};

// Run app
console.log(menu.title);
fs.readFile('./todolist', 'utf8', (err, data) => {
    if (err) throw err;
    data ? menu.todo = data.split(',') : menu.todo = [] ;
    menu.select();
  });