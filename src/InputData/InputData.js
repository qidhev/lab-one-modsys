import { Component } from 'react';
import './InputData.sass'

class InputData extends Component {

    fillMassData = (value, i, j) => {
        let massData = this.props.massData
        massData[i].splice(j, 1, Number(value))
        this.props.saveInput(massData)
    }

    makeInputs = () => {
        let rows = []
        for (let i = 0; i <= this.props.count[0]; i++) {
            let row = [];
            for (let j = 0; j < this.props.count[1]; j++) {
                row.push(
                    <input
                    className="border border-warning rounded"
                    type="number"
                    key={i+j}
                    onChange={(event) => {this.fillMassData(event.target.value, i, j)}}
                    ></input>
                )
            }
            rows.push(<div key={i}>{row}<span>{i == this.props.count[0] ? 'Y' : `X${i+1}`}</span></div>)
        }

        return rows
    }

    render() {
        return (
            <div className="m-2">
                {this.props.count[0] === 0 || this.props.count[1] === 0 ? null : this.makeInputs()}
            </div>
        )
    }
}

export default InputData