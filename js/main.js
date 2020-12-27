import {Todo} from './components/Todo.js';
import {formGenerate} from './components/formGenerate.js';

const todo = new Todo({
    selector: 'main'
});

// const addForm = {
//     selector: '.content',
//     title: 'gurraAdd new task',
//     action: 'add'
// }

// formGenerate(addForm);

todo.init();






