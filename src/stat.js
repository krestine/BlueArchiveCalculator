import React from "react";
import { render } from "react-dom";

class Stat extends React.Component {
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
	ProgramMode: "Stat",
    ResetString: {"Kor":"초기화", "Eng":"Reset"},
    CalculateString: {"Kor":"계산하기", "Eng":"Calculate"},
    CriString: {"Kor":"치명타", "Eng":"Critical"},
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
  
  CostRecoveryChange = (e) => {
    this.setState({
      CostRecoveryBonus: e.target.value
    });
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
  
  calculateRaid = () => {
	var timeScore = this.state.RaidTimeScore[this.state.RaidDifficulty];
	var timeMult = this.state.RaidTimeMult[this.state.RaidType];
	var bonusScore = 0;
	if (this.state.RaidType === "Type1") {
		bonusScore = this.state.RaidBonusScoreType1[this.state.RaidDifficulty];
	} else {
		bonusScore = this.state.RaidBonusScoreType2[this.state.RaidDifficulty];
	}
	var targetTime = (((this.state.TargetScore - bonusScore) / timeScore) - timeMult) * -1.0;
	var targetMinute = parseInt(targetTime / 60, 10);
	var leftTime = this.state.RaidLeftTime[this.state.RaidType] - targetTime;
	var leftMinute = parseInt(leftTime / 60, 10);
	var recoveryRate = 4200.0 + parseFloat(this.state.CostRecoveryBonus);
	var totalCost = (recoveryRate / 10000.0) * (targetTime - 2.0);
	targetTime = targetTime % 60;
	leftTime = leftTime % 60;
	this.setState({ BattleTime: targetTime.toFixed(3) });
	this.setState({ BattleTimeMinute: targetMinute });
	this.setState({ LeftTime: leftTime.toFixed(3) });
	this.setState({ LeftTimeMinute: leftMinute });
	this.setState({ UseableCost: totalCost.toFixed(3) });
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
