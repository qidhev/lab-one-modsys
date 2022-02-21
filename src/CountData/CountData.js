import {Component} from 'react';

class CountData extends Component {
    render() {
        return(
            <div className="m-2">
                <div>
                    <span>X</span>
                    <input 
                    type="number"
                    className="border border-warning rounded"
                    onChange={(event) => this.props.saveCount(event.target.value, 0)}
                    ></input>
                </div>
                <div>
                    <span>Exp</span>
                    <input 
                    type="number"
                    className="border border-warning rounded"
                    onChange={(event) => this.props.saveCount(event.target.value, 1)}
                    ></input>
                </div>
                
                <div>
                    <span className="checkbox">Одна замена X</span>
                    <input 
                    type="checkbox"
                    className="form-check-input"
                    onChange={(event) => this.props.saveIsMoreX(event.target.checked)}
                    ></input>
                </div>
            </div>
        )
    }
}

export default CountData