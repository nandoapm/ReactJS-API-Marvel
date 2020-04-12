import React from 'react';
import { connect } from 'react-redux'
import { FiXSquare } from 'react-icons/fi'

import { moreCharacters, getCharacters } from '../../store/models/character/characterActions'

import Loading from '../../components/Loading'
import Card from '../../components/Card'
import ButtonLoadMore from '../../components/LoadMore'

import './styles.css'

const stateToProps = state => ({ character: state.character });
class CharacterList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            search: props.character.nameSearch,
            hasMore: this.props.character.total > this.props.character.count + this.props.character.offset,
        }
        this.loadInitial = this.loadInitial.bind(this)
        this.requestParams = this.requestParams.bind(this)
        this.search = this.search.bind(this)
        this.closeSearch = this.closeSearch.bind(this)
        this.loadMore = this.loadMore.bind(this)
  }

    componentDidMount() {
        if (!this.props.character.results.length){
            this.loadInitial()
        }
    } 

    componentDidUpdate(prevProps) {
        if (prevProps.character.total !== this.props.character.total || prevProps.character.offset !== this.props.character.offset) {
            this.setState({
                loading: false,
                hasMore: this.props.character.total > this.props.character.count + this.props.character.offset
            })
        }
    }

    loadInitial() {
        this.setState({ loading: true })
        const { limit } = this.props.character;
        this.props.dispatch(getCharacters({ limit, search: this.state.search }));
    }

    requestParams() {
        const { limit, offset, total, count } = this.props.character

        return { offset, limit, total, count,
                search: this.state.search
        }
    }

    search(event) {
        var code = event.keyCode || event.which;
        var value = event.target.value.trim();
        if (code === 13 && this.state.search !== value) {
            this.setState({ search: value }, () => this.loadInitial());
        }
    }

    closeSearch() {
        const { limit } = this.props.character;
        this.setState({ loading: true, search: "" })
        this.props.dispatch(getCharacters({ limit, search: "" }));
    }

    loadMore() {
        this.setState({ loading: true })
        this.props.dispatch(moreCharacters(this.requestParams()));
    }

    render() {
        var { nameSearch, results, total } = this.props.character;
        
        if (this.state.loading && results.length === 0) {
            return <Loading />
        }
            
        return (
            <div>
                <div className="container-search">
                    {nameSearch.length > 0
                        ? <div className="container-text"><font>{total} resultados para <b>{nameSearch}</b></font> <button title="Remove search" onClick={this.closeSearch}><FiXSquare size={ 30 } color="#202020" /></button></div>
                        : <input type="text" placeholder="Buscar personagem..." name="search" onKeyDown={this.search} defaultValue={this.state.search} /> 
                    }
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

export default connect(stateToProps)(CharacterList)