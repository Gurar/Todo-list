class Todo {
    constructor(params) {
        this.selector = params.selector;
        this.DOM = null;
        this.taskList = [];
        this.addForm = {
            selector: '.content',
            title: 'Add new task',
            action: 'add'
        }
        this.url = 'https://gurar.github.io/Todo-list/todo-list.json';
    }

   init() {
        if(!this.isValidSelector()) {
            return false
        }
        this.updateTask();
        this.generateForm(this.addForm);
        this.render();
        this.events();
    }

    isValidSelector() {
        const DOM = document.querySelector(this.selector);
        if(!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }

   async fetch() {
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    }

    

    generateItem(task) {
        return ` <div class="item">
                    <p>${task.text}</p>
                        <div class="actions">
                            <div class="btn small edit">Edit</div>
                            <div class="btn small remove">Remove</div>
                        </div>
                </div>`;
    }

    generateForm(params) {
        
        const selector = document.querySelector(params.selector);
        const form = `<form action="">
                    <h2>${params.title}</h2>
                        <textarea></textarea>
                        <button class="btn cancel" type="submit">Cancel</button>
                        <button class="btn ${params.action}" type="submit" data-action=${params.action}>${params.action}</button>
                    </form>`;

        selector.innerHTML = form;
    }

    renderList() {
        let HTML = '';
        for(let item of this.taskList) {
            HTML += this.generateItem(item);
        }

        this.DOM.innerHTML = HTML;
        this.addEvents();
    }

    async render() {
        this.taskList = await this.fetch();
        this.renderList();
    }

    events() {
        const addNewTask = document.querySelector('.add-new');
        const lighbox = document.querySelector('.lighbox');
        const form = lighbox.querySelector('form');
        const textarea = form.querySelector('textarea');
        const btnCancel = form.querySelector('.cancel');
        const btnAdd = form.querySelector('.add');

        addNewTask.addEventListener('click', () =>{
            lighbox.classList.add('show');
        });
        
        addEventListener('keyup', ({key}) => {
           if(key === 'Escape') {
               lighbox.classList.remove('show');
           }
        })
        
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            lighbox.classList.remove('show');
        });
        
        btnAdd.addEventListener('click', (e) => {
            e.preventDefault();
            const task = {
                text: textarea.value,
                isCompleted: false
            }
            
            this.addTask(task);
            textarea.value = '';
            lighbox.classList.remove('show');
        });
    }

    addTask(task) {
        this.taskList.push(task);
        this.renderList();
        return true;
    }

    deleteTask(taskIndex) {
        this.taskList = this.taskList.filter((item, index) => index !== taskIndex);
        this.renderList();
    }

    addEvents() {
        const items = this.DOM.querySelectorAll('.item');

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const editBtn = item.querySelector('.btn.edit');
            const removeBtn = item.querySelector('.btn.remove');

            editBtn.addEventListener('click', () => {
                this.initTododItemEditing(i);
            })
            removeBtn.addEventListener('click', () => {
                this.deleteTask(i);
            })
        }
    }

    updateTask() {
        if(!this.DOM.classList.contains('list')) {
            this.DOM.classList.add('list');
        }
    }

    initTododItemEditing(taskIndex) {
        const lighbox = document.querySelector('.lighbox');
        const editForm = {
            selector: '.content',
            title: 'edit task',
            action: 'edit'
        }

        this.generateForm(editForm);

        lighbox.classList.add('show');

        const textarea = document.querySelector('textarea');
        const btnCancel = document.querySelector('button.cancel');
        const btnEdit= document.querySelector('button.edit');

    
        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            lighbox.classList.remove('show');
            this.generateForm(this.addForm);
            this.events();
        });

        btnEdit.addEventListener('click', (e) => {
            e.preventDefault();
            this.taskList[taskIndex] = {
                text: textarea.value,
                isCompleted: false
            }

            this.renderList();
            lighbox.classList.remove('show');
            this.generateForm(this.addForm);
            this.events();
        });


     
    }
}

export {Todo};