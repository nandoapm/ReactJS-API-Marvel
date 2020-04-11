import React from "react";
import { connect } from "react-redux";
import { selectCharacter, unselectCharacter } from '../../store/models/character/characterActions'

//import SerieCardList from "../serie/SerieCardList";

const mapStateToProps = state => ({ selected: state.character.selected });

class CharacterProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            name: "",
            desc: "",
            load: Object.keys(this.props.selected).length > 0
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.editCharacter = this.editCharacter.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
        this.buildFullImagePath = this.buildFullImagePath.bind(this);
    }

    componentDidMount() {
        if (!this.state.load)
            this.props.dispatch(selectCharacter(this.props.match.params.id))
    }

    componentDidUpdate() {
        if (!this.state.load) {
            if (localStorage.getItem(this.props.selected.id)) {
                const { name, desc } = JSON.parse(localStorage.getItem(this.props.selected.id));
                this.setState({ name: name, desc: desc, load: Object.keys(this.props.selected).length > 0 });
            } else {
                const { name, desc } = this.props.selected;
                this.setState({ name, desc, load: Object.keys(this.props.selected).length > 0 });
            }
        }
    }

    componentWillUnmount() {
        this.props.dispatch(unselectCharacter())
    }

    buildFullImagePath() {
        const { path, extension } = this.props.selected.thumbnail;

        return `${path}/portrait_xlarge.${extension}`;
    }

    valueChanged(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    editCharacter() {
        const key = this.props.selected.id;

        if (localStorage.getItem(key)) {
            const { name, desc } = JSON.parse(localStorage.getItem(key));
            this.setState({ edit: true, name: name, desc: desc });
        } else {
            const { name, desc } = this.props.selected;
            this.setState({ edit: true, name, desc });
        }
    }

    onSubmit(event) {
        this.setState({ edit: false });

        localStorage.setItem(this.props.selected.id, JSON.stringify({ name: this.state.name, desc: this.state.desc }));

        event.preventDefault();
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////// ENTRA O RENDER
    render() {
        /////////////////////////////////////////////////AREA PARA O CARREGAMENTO
        if (!this.state.load)
            return (<h3 className="text-center">Carregando...</h3>);
        
        return (
            <div>
                <article className="profile-card">
                    <div className="profile-info">
                        <img src={this.buildFullImagePath()} alt={this.props.name} className="profile-pic" />
                        {this.state.edit
                            ?<form onSubmit={this.onSubmit}>
                                <input type="text" value={this.state.name} name="name" onChange={this.valueChanged} />
                                <textarea type="text" value={this.state.desc} name="description" onChange={this.valueChanged} />
                                <button>Salvar</button>
                            </form>
                            :<div>
                                <h3>{this.state.name}</h3>
                                <p>{this.state.desc || "Descrição não encontrada."}</p>
                                <button onClick={this.editCharacter}>Editar</button>
                            </div>
                        }
                    </div>
                    
                    <div className="profile-relations">
                        <div className="rel-item">
                            <font>Series</font>
                            <font>{this.props.selected.series.available}</font>
                        </div>
                        <div className="rel-item">
                            <font>Events</font>
                            <font>{this.props.selected.events.available}</font>
                        </div>
                        <div className="rel-item">
                            <font>Comics</font>
                            <font>{this.props.selected.comics.available}</font>
                        </div>
                        <div className="rel-item">
                            <font>Stories</font>
                            <font>{this.props.selected.stories.available}</font>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CharacterProfile);