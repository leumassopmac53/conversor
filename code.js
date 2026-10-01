
let file = document.querySelector("#file");

let preview = document.querySelector("#preview");

let criar = document.querySelector("#criar");

let tamanho = document.querySelector("#tamanho");



file.addEventListener("change",()=>{

    let arq = file.files[0];

    if(!arq) return;


    let url = URL.createObjectURL(arq);


    preview.src = url;

});




criar.addEventListener("click",()=>{

    let arq = file.files[0];


    if(!arq) return;


    let url = URL.createObjectURL(arq);


    let img = new Image();



    img.onload = ()=>{


        let canvas = document.createElement("canvas");

        let ctx = canvas.getContext("2d");


        canvas.width = Number(tamanho.value);

        canvas.height = Number(tamanho.value);

        ctx.imageSmoothingEnabled = false

        ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
        );



        let a = document.createElement("a");


        a.download = "imagem.png";

        a.href = canvas.toDataURL("image/png");

        a.click();


    }


    img.src = url;


});
