const apply_to_elements = function( COLOR ){
    const el_current_p = document.querySelector('#current-tab>p');
    const el_current_link = Array.from(document.querySelectorAll('.nav-link')).filter(( el)=>{
        return el.href.match(/#current-tab/);
    })[0];
    if(COLOR.color && el_current_p && el_current_link){
        el_current_p.innerText = COLOR.color + ' Tagged Items with Standard Prices...';
        el_current_link.innerText = COLOR.color;
    }
};
export { apply_to_elements };
