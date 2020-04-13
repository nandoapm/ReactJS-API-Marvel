import React from "react";
import { connect } from "react-redux";
import { selectCharacter, unselectCharacter } from '../../store/models/character/characterActions'

import './styles.css'

const StateToProps = state => ({ selected: state.character.selected });

class CharacterProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            name: "",
            description: "",
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
                const { name, description } = JSON.parse(localStorage.getItem(this.props.selected.id));
                this.setState({ name: name, description: description, load: Object.keys(this.props.selected).length > 0 });
            } else {
                const { name, description } = this.props.selected;
                this.setState({ name, description, load: Object.keys(this.props.selected).length > 0 });
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
            const { name, description } = JSON.parse(localStorage.getItem(key));
            this.setState({ edit: true, name: name, description: description });
        } else {
            const { name, description } = this.props.selected;
            this.setState({ edit: true, name, description });
        }
    }

    onSubmit(event) {
        this.setState({ edit: false });

        localStorage.setItem(this.props.selected.id, JSON.stringify({ name: this.state.name, description: this.state.description }));

        event.preventDefault();
    }
    
    render() {
        if (!this.state.load)
            return (<h3 className="container-load">Carregando...</h3>);
        
        return (
            <div className="container-profile">
                <section className="card-profile">
                    <div className="info-profile">
                        <img src={this.buildFullImagePath()} className="img-profile" alt={this.props.name} />
                        {this.state.edit ? 
                            
                            <form onSubmit={this.onSubmit} className="form-profile" >
                                <input type="text" value={this.state.name} name="name" onChange={this.valueChanged} />
                                <textarea type="text" value={this.state.description} name="description" onChange={this.valueChanged} />
                                <button className="btn-profile">Salvar</button>
                            </form> : 
                            
                            <div className="desc-profile">
                                <h3>{this.state.name}</h3>
                                <p>{this.state.description || "Descrição não encontrada."}</p>
                                <button className="btn-profile" onClick={this.editCharacter}>Editar</button>
                            </div>
                        }
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(StateToProps)(CharacterProfile);