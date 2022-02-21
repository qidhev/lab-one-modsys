import {Component} from 'react';

class ReplaceData extends Component {

    inputMaker = () => {
        let out = []
        for (let i = 0; i < (!this.props.isMoreX ? this.props.count[0] : 1); i++) {
            out.push(
                <div key={i}>
                    <span>X{(this.props.isMoreX ? '' : i + 1)}</span>
                    <input className="border border-warning rounded"
                    placeholder="x/2"
                    onChange={(event) => {this.props.saveReplaceData(event.target.value, i, true)}}
                    ></input>
                </div>
                )
        }
        out.push(
            <div key={'y'}>
                <span>Y</span>
                <input className="border border-warning rounded"
                placeholder="y/2"
                onChange={(event) => {this.props.saveReplaceData(event.target.value, 1, false)}}
                ></input>
            </div>
            )

        return out
    }

    render() {
        return (
            <div className="m-2">
                {this.props.count[0] === 0 || this.props.count[1] === 0 ? null : this.inputMaker()}
            </div>
        )
    }
}

export default ReplaceData;