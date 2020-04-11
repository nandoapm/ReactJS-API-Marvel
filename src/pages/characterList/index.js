import React from 'react';
import { connect } from 'react-redux'

import { moreCharacters, initialCharacters } from '../../store/models/character/characterActions'

import Loading from '../../components/Loading'
import Card from '../../components/Card'
import ButtonLoadMore from '../../components/LoadMore'

import './styles.css'

const mapStateToProps = state => ({ character: state.character });
class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        search: props.character.searchTerm,
        hasMore: this.props.character.total > this.props.character.count + this.props.character.offset,
    };
    this.loadMore = this.loadMore.bind(this);
    this.loadInitial = this.loadInitial.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.requestParams = this.requestParams.bind(this);
    this.removeSearch = this.removeSearch.bind(this);
  }

  componentDidMount() {
      if (!this.props.character.results.length){
          this.loadInitial();
      }
  }

  componentDidUpdate(prevProps) {
      if (prevProps.character.total !== this.props.character.total || prevProps.character.offset !== this.props.character.offset) {
          this.setState({
              loading: false,
              hasMore: this.props.character.total > this.props.character.count + this.props.character.offset
          });
      }
  }

  updateSearch(event) {
      var code = event.keyCode || event.which;

      var value = event.target.value.trim();

      if (code === 13 && this.state.search !== value) {
          this.setState({ search: value }, () => this.loadInitial());
      }
  }

  requestParams() {
      const { limit, offset, total, count } = this.props.character;

      return {
          offset,
          limit,
          total,
          count,
          search: this.state.search
      };
  }

  loadInitial() {
      this.setState({ loading: true })
      const { limit } = this.props.character;
      this.props.dispatch(initialCharacters({ limit, search: this.state.search }));
  }

  loadMore() {
      this.setState({ loading: true })

      this.props.dispatch(moreCharacters(this.requestParams()));
  }

  removeSearch() {
      const { limit } = this.props.character;
      this.setState({ loading: true, search: "" })
      this.props.dispatch(initialCharacters({ limit, search: "" }));
  }

  render() {
    var { searchTerm, results, total } = this.props.character;
    
    if (this.state.loading && results.length === 0) {
        return <Loading />
    }
        
    return (
        <div>
            <div className="container-search">
                {searchTerm.length > 0
                    ? <div><font>{total} results for <b>{searchTerm}</b></font> <button title="Remove search" onClick={this.removeSearch}>XXX</button></div>
                    : <input type="text" placeholder="Buscar personagem..." name="search" onKeyDown={this.updateSearch} defaultValue={this.state.search} />}
            </div>
            
            <div className="container-load">{ this.state.loading ? <Loading /> : null }</div>

            <section className="container-main">{ results.map(char => <Card key={char.id} selected={char} />) }</section>
            
            <div className="container-btn">
                {this.state.hasMore ? (this.state.loading ? <Loading /> : <ButtonLoadMore loadMore={this.loadMore} />) : null }
            </div>
        </div>
    )
  }
}

export default connect(mapStateToProps)(CharacterList)