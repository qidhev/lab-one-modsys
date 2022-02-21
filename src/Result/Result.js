import React, { Component } from 'react';
import './Result.sass'
import nerdamer from 'nerdamer/all';

export default class Result extends Component {

    showResult = () => {
        let rows = [];
        rows.push(<div key={Date.now().toString()}>Решение:</div>)
        if (Array.isArray(this.props.result)) {
            let str = 'y=a0'
            
            for (let i = 1; i <= this.props.count; i++) {
                str+=`+a${i}*x${i}`;
                
            }
            let systemObj = {};
            // console.log(this.props.result)
            // let arr = this.props.result;
            for (let i = 0; i < this.props.result.length; i++) {
                systemObj[this.props.result[i][0]] = this.props.result[i][1]
            }
            
            rows.push(<div key={'1337'}>{nerdamer(str, systemObj).text()}</div>)
        }else if (this.props.result === 0){
            rows.push('Эта система не имеет четкого решения')
        }

        return rows;
    }

    render() {
        return (
            <div 
            className='d-flex justify-content-center align-items-center"'>
                <div className="alert div-alt alert-primary" role="alert">
                    {this.showResult()}
                </div>
            </div>
        );
    }
}