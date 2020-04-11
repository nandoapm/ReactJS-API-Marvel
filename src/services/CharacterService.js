import ApiService from './ApiService'

class CharacterService extends ApiService {
  getCharacter(params) {
    const query = this.pagination(params)

    if(params.hasOwnProperty('search') && params.search.trim().length) {
      query += `&nameStartsWith=${encodeURIComponent(params.search.trim())}`;
    }

    return query
  }

  getCharacterById(id) {
    return this.getApi(`/v1/public/characters/${id}`, "");
  }

  showList(params) {
    return this.getApi("/v1/public/characters", this.getCharacter(params))
  }
}