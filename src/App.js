import { Component } from 'react';
import './App.sass';
import CountData from './CountData/CountData';
import InputData from './InputData/InputData';
import ReplaceData from './ReplaceData/ReplaceData';
import nerdamer from 'nerdamer/all';
import Result from './Result/Result'

class App extends Component {
  state = {
    // count: [3, 4],
    // massData: [
    //   [2, 2, 2, 2],
    //   [2, 2, 2, 2],
    //   [2, 2, 2, 2],
    //   [1, 1, 1, 1]
    // ],
    count: [0, 0],
    massData: [
    ],
    isMoreX: false,
    replaceData: [Array.from({length: 20}, () => 0), ''],
    // replaceData: [['x', 'sqrt(x)'], 'y'],
    result: ''
  }

  saveReplaceData = (value, id, elem) => {
    let data = this.state.replaceData;
    elem
      ?
      data[0][id] = value :
      data[1] = value

    this.setState({replaceData: data})
  }

  saveInput = (massData) => {
    this.setState({massData})
  }

  reductArrsData = (count) => {
    let massData = this.state.massData
    if (massData.length === 0) {
      massData = []
      for (let i = 0; i <= count[0]; i++) {
        let arrs = Array.from({
          length: count[1]
        }, () => 0);
        massData.push(arrs)
      }
    } else if (massData[0].length != count[1] || massData.length >= (Number(count[0]) + 1)) {
      massData = []
      for (let i = 0; i <= count[0]; i++) {
        let arr = [];
        for (let j = 0; j < count[1]; j++) {
          arr.push(this.state.massData[i][j] != undefined && this.state.massData[i][j] ? Number(this.state.massData[i][j]) : 0)
        }
        massData.push(arr)
      }
    } else if (massData.length < (Number(count[0]) + 1)) {
      let arrs = Array.from({ length: count[1] }, () => '0');
      massData.push(arrs)
    }

    this.setState({massData})
  }

  saveCount = (value, bool) => {
    let count = this.state.count
    count[bool] = value
    this.setState({count})
    this.reductArrsData(count)
  }

  saveIsMoreX = (value) => {
    this.setState({isMoreX: value})
  }

  calculationResult = () => {
    let massData = this.state.massData
    // подстановка x'ов
    for( let i = 0; i < this.state.count[0]; i++) {
      for (let j = 0; j < this.state.count[1]; j++) {
        massData[i][j] = Number(nerdamer(this.state.replaceData[0][(this.state.isMoreX ? 0 : i)], {'x': massData[i][j]}).text())
      }
    }
    // подстановка y'ка
    for (let i = 0; i < this.state.count[1]; i++) {
      massData[massData.length - 1][i] = Number(nerdamer(this.state.replaceData[1], {'y': massData[massData.length - 1][i]}).text())
    }

    let main_diff = '';
    for(let k = 0; k < this.state.count[1]; k++) {
      main_diff += '(a0';
      for( let i = 1; i <= this.state.count[0]; i++) {
        main_diff+=` + a${i}*${massData[i - 1][k]}`
      }
      main_diff += ` - ${massData[massData.length - 1][k]})^2 ${k != this.state.count[1] - 1 ? '+ ' : ''}`;
    }

    let massDiff = [];

    for (let i = 0; i <= this.state.count[0]; i++) {
      massDiff.push(nerdamer(`diff(${main_diff}, a${i})`).text() + '=0')
    }

    let result;

    try {
      result = nerdamer.solveEquations(massDiff);
    }catch (err) {
      result = 0;
    }

    console.log(result)
    this.setState({result: Array.isArray(result) ? result : 0})
  }

  render() {
    return (
      <div className="App">
        <div
          className="d-flex justify-content-center"
        >
          <CountData 
          saveCount={this.saveCount}
          saveIsMoreX={this.saveIsMoreX}
          />
          <ReplaceData 
          isMoreX={this.state.isMoreX}
          count={this.state.count}
          saveReplaceData={this.saveReplaceData}
          />
          <InputData 
          saveInput={this.saveInput}
          count={this.state.count}
          massData={this.state.massData}
          />
        </div>
        <button
                    className="button m-4"
                    onClick={this.calculationResult}
                >Расcчитать</button>
        <Result 
        result={this.state.result}
        count={this.state.count[0]}
        />
      </div>
    );
  }
}

export default App;
