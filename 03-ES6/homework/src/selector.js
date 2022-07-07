var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if ( matchFunc(startEl) ) {
    resultSet.push(startEl);
  }

  for ( let i = 0; i < startEl.children.length; i++ ) {
    var elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
        resultSet = [...resultSet, ...elements]
  } 
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === '#') {return 'id'}
  else if(selector[0] === '.') {return 'class'}
  if(selector.split('.').length > 1) {return 'tag.class'}
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) { //selector -> '#perro'
  var selectorType = selectorTypeMatcher(selector); //(#perro) -> id o class o tag o tag.class
  var matchFunction;
  if (selectorType === "id") {  // el.id -> 'perro'
    matchFunction = function(el) { // el -> div
      if ( `#${el.id}` === selector ) { 
        return true; 
      } else { return false; }    //querySelectorHechoUsuario('.perro');
    }
  } else if (selectorType === "class") { //selector -> '.perro'
    matchFunction = function(el) {  // <div class="perro gato jirafa"> </div>
      let arr = el.classList; // el -> div.classlist => [.gato, .jirafa, .perro]
      for ( let i = 0; i < arr.length; i++ ) {
        if( `.${ arr[i]}` === selector ) {return true} 
      }
      //arr.forEach( e => { if(`.${e}` === selector) { return true; } });
      return false; 
    }
  } else if (selectorType === "tag.class") {// selectoy => 'div.perro'
    matchFunction = function (el) { // 
      var [tagBuscado, claseBuscada] = selector.split('.'); // ['div', 'perro']
      return matchFunctionMaker(tagBuscado)(el) && matchFunctionMaker(`.${claseBuscada}`)(el);                                                      
    }
  } else if (selectorType === "tag") {
    matchFunction = function (el) {
     // el -> <div class='primero'>hola</div>
     // el.tagName = 'DIV'
     // el tagName.toLowerCase() = 'div'
     return el.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
