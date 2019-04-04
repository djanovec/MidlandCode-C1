var left = document.querySelectorAll('.leftDiv');
left.forEach(function(val){
    val.addEventListener("click", function(){
    var idNum = this.id[1];
    var right = document.querySelector("#r"+idNum); 
    if(right){
        right.remove();
    }
    else{
        createElement(idNum);
    }
})
});

function createElement(id){
    var container = document.querySelector(".right")
    var newDiv = document.createElement("div");
    newDiv.id = "r"+id;
    newDiv.classList.add('rightDiv');
    newDiv.innerText = id;
// container.append(newDiv);
// } 





// --------------------------- BONUS ROUND --------------------------------------------------------

    if(container.children.length === 0 || !checkId(id, container.children.length-1, container)){
        container.appendChild(newDiv);
        return;
    }
    for(var i =0; i < container.children.length-1; i++){
        if(checkId(id, i, container)){
            container.insertBefore(newDiv, container.children[i]);
            return;
        }
    }
}

function checkId(newId, currId, container){
    return parseInt(container.children[currId].id[1]) > newId;
}
