function formGenerate(params) {
    const selector = document.querySelector(params.selector);
    const form = `<form action="">
                <h2>${params.title}</h2>
                    <textarea></textarea>
                    <button class="btn cancel" type="submit">Cancel</button>
                    <button class="btn ${params.action}" type="submit" data-action=${params.action}>${params.action}</button>
                </form>`;

    selector.innerHTML = form;

    return true;
}

export {formGenerate};