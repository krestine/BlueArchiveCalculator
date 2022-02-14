import React from "react";
import { render } from "react-dom";
import { setCookie, getCookie } from './cookie';

class Stat extends React.Component {
	componentDidMount() {
		this.setState({ Language: getCookie(["Language"])});
		if(getCookie(["Language"]) == null){
			this.setState({ Language: "Kor"});
		}
	}
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
	CriBonus: "",
	AccBonus: "",
	EvaBonus: "",
	DefBonus: "",
    Language: "Kor",
	ProgramMode: "Stat",
    ResetString: {"Kor":"초기화", "Eng":"Reset"},
    CalculateString: {"Kor":"계산하기", "Eng":"Calculate"},
    CriString: {"Kor":"치명타", "Eng":"Critical"},
	CriBonusString: {"Kor":"치명타 버프/디버프 (%)", "Eng":"Critical Buff/Debuff (%)"},
	AccBonusString: {"Kor":"명중 버프/디버프 (%)", "Eng":"Accuracy Buff/Debuff (%)"},
	EvaBonusString: {"Kor":"회피 버프/디버프 (%)", "Eng":"Evasion Buff/Debuff (%)"},
	DefBonusString: {"Kor":"방어력 버프/디버프 (%)", "Eng":"Defence Buff/Debuff (%)"},
    AccString: {"Kor":"명중", "Eng":"Accuracy"},
    StaString: {"Kor":"안정성", "Eng":"Stability"},
    DefString: {"Kor":"방어력", "Eng":"Defence"},
    EvaString: {"Kor":"회피", "Eng":"Evasion"},
    ResString: {"Kor":"치명타 저항", "Eng":"Crit resistance"},
    RealCriString: {"Kor":"실제 치명타 확률 : ", "Eng":"Critical rate : "},
    RealAccString: {"Kor":"실제 명중률 : ", "Eng":"Accuracy rate : "},
    RealDefString: {"Kor":"실제 받는 피해 : ", "Eng":"Damage taken : "},
    MinDamString: {"Kor":"대미지 범위 : ", "Eng":"Dam. variance : "},
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
  
  updateInputValue2 = (evt) => {
    const { name, value } = evt.target;
    this.setState({[name]: value});
  };
  
  CostRecoveryChange = (e) => {
    this.setState({
      CostRecoveryBonus: e.target.value
    });
  };

  calculate = () => {
	  var realCriBonus = 0.0;
	  var realAccBonus = 0.0;
	  var realEvaBonus = 0.0;
	  var realDefBonus = 0.0;
	  
	var tempCriBonus = this.state.CriBonus.split(" ");
	var tempCriBonusTotal = 0.0;
	for(var i=0;i<tempCriBonus.length;i++){
		var tempFloatCri = parseFloat(tempCriBonus[i]);
		if (!Number.isNaN(tempFloatCri)){
			tempCriBonusTotal = tempCriBonusTotal + tempFloatCri;
		}
	}
	if (Number.isNaN(tempCriBonusTotal)){
		realCriBonus = 1;
	}
	else{
		var finalCriBonus = (tempCriBonusTotal * 0.01) + 1
		realCriBonus = finalCriBonus;
	}
	
	var tempAccBonus = this.state.AccBonus.split(" ");
	var tempAccBonusTotal = 0.0;
	for(var i=0;i<tempAccBonus.length;i++){
		var tempFloatAcc = parseFloat(tempAccBonus[i]);
		if (!Number.isNaN(tempFloatAcc)){
			tempAccBonusTotal = tempAccBonusTotal + tempFloatAcc;
		}
	}
	if (Number.isNaN(tempAccBonusTotal)){
		realAccBonus = 1;
	}
	else{
		var finalAccBonus = (tempAccBonusTotal * 0.01) + 1
		realAccBonus = finalAccBonus;
	}
	
	var tempEvaBonus = this.state.EvaBonus.split(" ");
	var tempEvaBonusTotal = 0.0;
	for(var i=0;i<tempEvaBonus.length;i++){
		var tempFloatEva = parseFloat(tempEvaBonus[i]);
		if (!Number.isNaN(tempFloatEva)){
			tempEvaBonusTotal = tempEvaBonusTotal + tempFloatEva;
		}
	}
	if (Number.isNaN(tempEvaBonusTotal)){
		realEvaBonus = 1;
	}
	else{
		var finalEvaBonus = (tempEvaBonusTotal * 0.01) + 1
		realEvaBonus = finalEvaBonus;
	}
	
	var tempDefBonus = this.state.DefBonus.split(" ");
	var tempDefBonusTotal = 0.0;
	for(var i=0;i<tempDefBonus.length;i++){
		var tempFloatDef = parseFloat(tempDefBonus[i]);
		if (!Number.isNaN(tempFloatDef)){
			tempDefBonusTotal = tempDefBonusTotal + tempFloatDef;
		}
	}
	if (Number.isNaN(tempDefBonusTotal)){
		realDefBonus = 1;
	}
	else{
		var finalDefBonus = (tempDefBonusTotal * 0.01) + 1
		realDefBonus = finalDefBonus;
	}
	
	var tempCri = (this.state.Cri * realCriBonus) - this.state.Res;
	var finalCri = (tempCri * 6000) / (tempCri * 6000 + 4000000);
	if(tempCri < 0){
		finalCri = 0;
	}
	this.setState({ RealCri: (finalCri * 100).toFixed(3) });
	var finalDef = 1 / (1 + (this.state.Def * realDefBonus) / 1666.667);
	this.setState({ RealDef: (finalDef * 100).toFixed(3) });
	var tempAcc = (this.state.Eva * realEvaBonus) - (this.state.Acc * realAccBonus);
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
	this.setState({ CriBonus: "" });
    this.setState({ AccBonus: "" });
    this.setState({ DefBonus: "" });
	this.setState({ EvaBonus: "" });
    this.setState({ MinDam: "" });
  };

  LanguageChange = (e) => {
    this.setState({
      Language: e.target.value
    });
	setCookie("Language", e.target.value, {maxAge: 2592000});
  };

  DifficultyChange = (e) => {
    this.setState({
      RaidDifficulty: e.target.value
    });
  };

  render() {
    return (
      <div>
        <label>{this.state.CriString[this.state.Language]}</label>
        <input
          value={this.state.Cri}
          name="Cri"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.AccString[this.state.Language]}</label>
        <input
          value={this.state.Acc}
          name="Acc"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.StaString[this.state.Language]}</label>
        <input
          value={this.state.Sta}
          name="Sta"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br/><br/>
        <label>{this.state.DefString[this.state.Language]}</label>
        <input
          value={this.state.Def}
          name="Def"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.EvaString[this.state.Language]}</label>
        <input
          value={this.state.Eva}
          name="Eva"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <label>{this.state.ResString[this.state.Language]}</label>
        <input
          value={this.state.Res}
          name="Res"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br/><br/>
		<label>{this.state.CriBonusString[this.state.Language]}</label>
		<input
          value={this.state.CriBonus}
          name="CriBonus"
          onChange={(evt) => this.updateInputValue2(evt)}
        />
		<label>{this.state.AccBonusString[this.state.Language]}</label>
		<input
          value={this.state.AccBonus}
          name="AccBonus"
          onChange={(evt) => this.updateInputValue2(evt)}
        />
		<label>{this.state.EvaBonusString[this.state.Language]}</label>
		<input
          value={this.state.EvaBonus}
          name="EvaBonus"
          onChange={(evt) => this.updateInputValue2(evt)}
        />
		<label>{this.state.DefBonusString[this.state.Language]}</label>
		<input
          value={this.state.DefBonus}
          name="DefBonus"
          onChange={(evt) => this.updateInputValue2(evt)}
        />
		<br/><br/>
		<div align="center">
        <button onClick={this.calculate}>{this.state.CalculateString[this.state.Language]}</button>
        <button onClick={this.resetAll}>{this.state.ResetString[this.state.Language]}</button>
		</div>
		<br/>
        <div>
          <text name="result" id="result">
            <div>{this.state.RealCriString[this.state.Language]}{this.state.RealCri} %</div>
            <div>{this.state.RealAccString[this.state.Language]}{this.state.RealAcc} %</div>
            <div>{this.state.RealDefString[this.state.Language]}{this.state.RealDef} %</div>
            <div>{this.state.MinDamString[this.state.Language]}{this.state.MinDam} - 100%</div>
          </text>
        </div>
        <br/><br/>
		
		<div align="center">
			<input
			  id="Korean"
			  value="Kor"
			  name="Kor"
			  type="radio"
			  checked={this.state.Language === "Kor"}
			  onChange={this.LanguageChange}
			/>
			한국어 　
			<input
			  id="English"
			  value="Eng"
			  name="Eng"
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

export default Stat;
