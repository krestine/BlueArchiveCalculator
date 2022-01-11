import React from "react";
import { render } from "react-dom";
import "./style.css";

class App extends React.Component {
  state = {
    Cri: "",
    Acc: "",
    Sta: "",
    Def: "",
    Eva: "",
    Res: "",
    RealCri: 0,
    RealAcc: 0,
    RealDef: 0,
    MinDam: 0
  };

  safeParseFloat = (str) => {
    var value = Number.parseFloat(str);
    return Number.isNaN(value) ? 0 : value;
  };

  updateInputValue = (evt) => {
    const { name, value } = evt.target;
    var intValue = parseInt(value, 10);
    if (Number.isNaN(intValue)) {
      this.setState({
        [name]: ""
      });
    } else {
      this.setState({
        [name]: intValue
      });
    }
  };

  calculate = () => {
    //const { Cri, Acc } = this.state;
    //alert("The SUM is " + (Cri + Acc));
    var tempCri = this.state.Cri - this.state.Res;
    var finalCri = (tempCri * 6000) / (tempCri * 6000 + 4000000);
    this.setState({ RealCri: (finalCri * 100).toFixed(3) });
    var finalDef = 1 / (1 + this.state.Def / 1666.66);
    this.setState({ RealDef: (finalDef * 100).toFixed(3) });
    var tempAcc = this.state.Eva - this.state.Acc;
    var finalAcc = 0;
    if (this.state.Eva > this.state.Acc) {
      finalAcc = 2000 / (tempAcc * 3 + 2000);
    } else {
      finalAcc = 1;
    }
    this.setState({ RealAcc: (finalAcc * 100).toFixed(3) });
    var finalMinDam = 0.2 + this.state.Sta / (this.state.Sta + 1000);
    this.setState({ MinDam: (finalMinDam * 100).toFixed(3) });
  };

  resetAll = () => {
    this.setState({ Cri: "" });
    this.setState({ Acc: "" });
    this.setState({ Sta: "" });
    this.setState({ Def: "" });
    this.setState({ Eva: "" });
    this.setState({ Res: "" });
  };

  render() {
    return (
      <div>
        <label>치명타</label>
        <input
          placeholder="공격자 치명타"
          value={this.state.Cri}
          name="Cri"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>명중</label>
        <input
          placeholder="공격자 명중"
          value={this.state.Acc}
          name="Acc"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>안정성</label>
        <input
          placeholder="공격자 안정성"
          value={this.state.Sta}
          name="Sta"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br></br>
        <label>방어력</label>
        <input
          placeholder="방어자 방어력"
          value={this.state.Def}
          name="Def"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>회피</label>
        <input
          placeholder="방어자 회피"
          value={this.state.Eva}
          name="Eva"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>치명타 저항</label>
        <input
          placeholder="방어자 치명타 저항"
          value={this.state.Res}
          name="Res"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br></br>
        <button onClick={this.calculate}>계산하기</button>
        <button onClick={this.resetAll}>초기화</button>
        <div>
          <text name="result" id="result">
            <div>실제 치명타 확률 : {this.state.RealCri} %</div>
            <div>실제 명중률 : {this.state.RealAcc} %</div>
            <div>실제 받는 피해 : {this.state.RealDef} %</div>
            <div>대미지 범위 : {this.state.MinDam} ~ 100%</div>
          </text>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
