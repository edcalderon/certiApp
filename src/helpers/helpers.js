const hbs = require('hbs');
hbs.registerHelper('listCertificates', (list) => {
    let text = "" 
    if(typeof list == 'object'){
        text =  text + 
        `<tr class="row100 body">
          <td scope="row" class="cell100 column1">${list.id}</td>
          <td class="cell100 column2"><a class="link" href="${list.url}" target="_blank" download>DESCARGAR</a></td>
        </tr>`   
        return text   
    }else{
      text =  text + 
      `<tr class="row100 body">
          <td scope="row" class="cell100 column1">Ingresa tu documento</td>
          <td class="cell100 column2"><a class="link" href="#" target="_blank" download>Ingresa tu documento</a></td>
      </tr>`  
      return text
    }     
    
});
