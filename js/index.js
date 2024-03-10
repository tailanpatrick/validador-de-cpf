const img = document.querySelector('.box-img img');
const input = document.querySelector('.box-input input');
const button = document.querySelector('.box-input button');

button.addEventListener('click', searchCPfEvent);

input.addEventListener('keyup', (e)=> {
    input.value = cpfMask(input.value);

    if (!input.value || input.value.length < 14){
        img.src = './img/interrogation.png';
        img.title = 'Formato não reconhecido!'
    } 
    
    else {
        searchCPfEvent(e);
    }

    if (e.keyCode === 13){
        searchCPfEvent(e);
    }
});

function searchCPfEvent(e){
    const cpf = input.value;

    if (cpf === '' || cpf.length < 14){
       img.src = './img/interrogation.png';
       img.title = 'Formato não reconhecido!'
       return;
    }

    const valid = validateCPF(cpf);

    if (valid){
        img.src = './img/check.png';
        img.title = 'CPF Válido!'
    }
    else {
        img.src = './img/notcheck.png';
        img.title = 'CPF Inválido! '
    }
    
}

function cpfMask(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{3})(\d)/,"$1.$2");   
    v=v.replace(/(\d{3})(\d)/,"$1.$2");
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return v;
}

function validateCPF(cpf){

    let replacedCpf = removeCaracters(cpf);

    let tot = 0;
    let tempCpf = '';

    for (let i = 0; i <= 8 ; i++){
        tot += ( replacedCpf[i] * ( i + 1 ) );
        tempCpf += `${replacedCpf[i]}`
        
    }

    tot = tot % 11;

    if (tot > 9){
        tot = 0;
    }
    tempCpf += `${tot}`

    let tot2 = 0;

    for (let i = 1; i <= 9 ; i++){
        tot2 += ( tempCpf[i] *  i );
    }

    tot2 = tot2 % 11;

    if (tot2 > 9){
        tot2 = 0;
    }

    tempCpf+= `${tot2}`;

    if (tempCpf === replacedCpf){
        return true;
    }
    return false;
}

/**
 * 
 * @param {String} cpf 
 */
function removeCaracters(cpf) { 
    const replacedCPF = cpf.replace('.', '')
            .replace('.', '')
            .replace('-', '');
    return replacedCPF;
}



