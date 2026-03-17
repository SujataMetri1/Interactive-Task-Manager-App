    class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.list = document.getElementById("taskList");
        this.input = document.getElementById("taskInput");

        document.querySelector(".filters")
            .addEventListener("click", e => {
                if (e.target.dataset.filter) this.display(e.target.dataset.filter);
            });

        this.display();
    }
    save = async () => {
        try {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    addTask = () => {
        const text = this.input.value.trim();
        if (!text) return;

        this.tasks.push({ text, completed:false });
        this.input.value = "";
        this.save();
        this.display();
    }

    deleteTask = i => {
        this.tasks.splice(i,1);
        this.save();
        this.display();
    }

    toggleTask = i => {
        this.tasks[i].completed = !this.tasks[i].completed;
        this.save();
        this.display();
    }

   editTask = (index) => {

    const li = this.list.children[index];
    const span = li.querySelector("span");
    const text = span.textContent;

    span.innerHTML = `<input type="text" value="${text}" class="editInput">`;
    const input = span.querySelector("input");
    input.focus();
    input.addEventListener("blur", () => {
        this.tasks[index].text = input.value;
        this.save();
        this.display();
    });
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            this.tasks[index].text = input.value;
            this.save();
            this.display();
        }
    });
    inputs.addEventListener("keyup",(e)=>{
        if(e.key==="Enter"){
            this.tasks[index].text=input.value;
            this.save();
            this.display();
        }
    });
}
display = (filter="all") => {
        this.list.innerHTML = "";

        this.tasks
        .filter(t => filter==="all" || (filter==="completed" ? t.completed : !t.completed))
        .forEach((t,i)=>{
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" ${t.completed?"checked":""}>
                <span style="text-decoration:${t.completed?"line-through":"none"}">${t.text}</span>
                <button>Edit</button>
                <button>Delete</button>`;

            const [check,,editBtn,delBtn] = li.children;
            check.onchange = ()=>this.toggleTask(i);
            editBtn.onclick = ()=>this.editTask(i);
            delBtn.onclick = ()=>this.deleteTask(i);

            this.list.append(li);
        });

    }
}

const app = new TaskManager();
document.querySelector("button").onclick = () => app.addTask();