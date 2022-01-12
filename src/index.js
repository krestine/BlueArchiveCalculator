import React from "react";
import { render } from "react-dom";
import "./index.css";

class App extends React.Component {
  state = {
    Cri: "",
    Acc: "",
    Sta: "",
    Def: "",
    Eva: "",
    Res: "",
    RealCri: "",
    RealAcc: "",
    RealDef: "",
    MinDam: "",
    Language: "Kor",
    ResetString: {"Kor":"초기화", "Eng":"Reset"},
    CalculateString: {"Kor":"계산하기", "Eng":"Calculate"},
    CriString: {"Kor":"치명타", "Eng":"Critical"},
    AccString: {"Kor":"명중", "Eng":"Accuracy"},
    StaString: {"Kor":"안정성", "Eng":"Stability"},
    DefString: {"Kor":"방어력", "Eng":"Defence"},
    EvaString: {"Kor":"회피", "Eng":"Evasion"},
    ResString: {"Kor":"치명타 저항", "Eng":"Crit Resistance"},
    RealCriString: {"Kor":"실제 치명타 확률 : ", "Eng":"Critical Rate : "},
    RealAccString: {"Kor":"실제 명중률 : ", "Eng":"Accuracy Rate : "},
    RealDefString: {"Kor":"실제 받는 피해 : ", "Eng":"Damage Taken : "},
    MinDamString: {"Kor":"대미지 범위 : ", "Eng":"Dam. Variance : "}
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
    var tempCri = this.state.Cri - this.state.Res;
    var finalCri = (tempCri * 6000) / (tempCri * 6000 + 4000000);
	if(tempCri < 0){
		finalCri = 0;
	}
    this.setState({ RealCri: (finalCri * 100).toFixed(3) });
    var finalDef = 1 / (1 + this.state.Def / 1666.667);
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
    this.setState({ RealCri: "" });
    this.setState({ RealAcc: "" });
    this.setState({ RealDef: "" });
    this.setState({ MinDam: "" });
  };

  LanguageChange = (e) => {
    this.setState({
      Language: e.target.value
    });
  };

  render() {
    return (
      <div>
        <label>{this.state.CriString[this.state.Language]}</label>
        <input
          //placeholder="공격자 치명타"
          value={this.state.Cri}
          name="Cri"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.AccString[this.state.Language]}</label>
        <input
          //placeholder="공격자 명중"
          value={this.state.Acc}
          name="Acc"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.StaString[this.state.Language]}</label>
        <input
          //placeholder="공격자 안정성"
          value={this.state.Sta}
          name="Sta"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br/><br/>
        <label>{this.state.DefString[this.state.Language]}</label>
        <input
          //placeholder="방어자 방어력"
          value={this.state.Def}
          name="Def"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.EvaString[this.state.Language]}</label>
        <input
          //placeholder="방어자 회피"
          value={this.state.Eva}
          name="Eva"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.ResString[this.state.Language]}</label>
        <input
          //placeholder="방어자 치명타 저항"
          value={this.state.Res}
          name="Res"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br/><br/>
        <button onClick={this.calculate}>{this.state.CalculateString[this.state.Language]}</button>
        <button onClick={this.resetAll}>{this.state.ResetString[this.state.Language]}</button>
		<br/><br/>
        <div>
          <text name="result" id="result">
            <div>{this.state.RealCriString[this.state.Language]}{this.state.RealCri} %</div>
            <div>{this.state.RealAccString[this.state.Language]}{this.state.RealAcc} %</div>
            <div>{this.state.RealDefString[this.state.Language]}{this.state.RealDef} %</div>
            <div>{this.state.MinDamString[this.state.Language]}{this.state.MinDam} - 100%</div>
          </text>
        </div>
        <br/>
		<div align="center">
			<input
			  id="Korean"
			  value="Kor"
			  name="language"
			  type="radio"
			  checked={this.state.Language === "Kor"}
			  onChange={this.LanguageChange}
			/>
			한국어 　
			<input
			  id="English"
			  value="Eng"
			  name="language"
			  type="radio"
			  checked={this.state.Language === "Eng"}
			  onChange={this.LanguageChange}
			/>
			English
			</div>
        </div>
    );
  }
}

render(<App />, document.getElementById("root"));
