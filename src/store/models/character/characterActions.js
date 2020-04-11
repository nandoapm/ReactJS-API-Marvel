import CharacterService from '../../../services/CharacterService'

// função para inicializar os personagens
export function initialCharacters(params) {
  return dispatch => {
    const { limit, search } = params
    CharacterService.showList({offset: 0, limit, search})
      .then(res => res.json())
      .then(json => dispatch({ type: 'GET_CHARACTERS', container: json.data, searchTerm: search }))
      .catch(err => console.log('Teste Erro', err))
  }
}


//função para buscar mais personagens
export function moreCharacters(params) {
  return dispatch => {
      const { offset, limit, total, count, search } = params;
      const nextOffset = offset + count;

      //offset = deslocamento, nextOffser5 = proximo deslocamento
      if (nextOffset < total) {
          CharacterService.showList({ offset: nextOffset, limit, search })
              .catch(err => console.log(err))
              .then(res => res.json())
              .then(json => dispatch({ type: "MORE_CHARACTERS", container: json.data }));
      } else {
          console.log("All characters have been listed!")
      }
  }
}

//função para selecionar o personagem
export function selectCharacter(id) {
  return dispatch => {
      CharacterService.getCharacterById(id)
          .catch(err => console.log(err))
          .then(res => res.json())
          .then(json => dispatch({ type: "SELECT_CHARACTER", character: json.data.results[0] }));
  }
}

//função para tirar a seleção do pesonagem
export function unselectCharacter() {
  return { type: "UNSELECT_CHARACTER" }
}

// função para editar os personagens
export function editCharacter(character) {
  return { type: "EDIT_CHARACTER", character }
}