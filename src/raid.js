import React from "react";
import { render } from "react-dom";
import "./index.css";

class Raid extends React.Component {
  state = {
    Language: "Kor",
    ResetString: {"Kor":"초기화", "Eng":"Reset"},
    CalculateString: {"Kor":"계산하기", "Eng":"Calculate"},
	DifficultyString:{"Kor":"난이도", "Eng":"Difficulty"},
	HardcoreString: {"Kor":"하드코어", "Eng":"Hardcore"},
	ExtremeString: {"Kor":"익스트림", "Eng":"Extreme"},
	RaidTypeString: {"Kor":"보스 이름", "Eng":"Boss name"},
	RaidType2String: {"Kor":"비나/카이텐", "Eng":"Binah/Kaiten"},
	RaidType1String: {"Kor":"나머지", "Eng":"The rest"},
	CostBonusString:{"Kor":"체리노 3스 레벨 : ", "Eng":"Cherino sub level : "},
	BattleTimeString:{"Kor":"전투 시간 : ", "Eng":"Battle time : "},
	LeftTimeString:{"Kor":"남은 시간 : ", "Eng":"Time left : "},
	UseableCostString:{"Kor":"사용 가능한 코스트 : ", "Eng":"Available costs : "},
	NoneString:{"Kor":"없음", "Eng":"None"},
	TargetScore: "",
	BattleTime: "",
	BattleTimeMinute: "",
	LeftTime: "",
	LeftTimeMinute: "",
	UseableCost: "",
	BattleTimeError: 0,
	CostRecoveryBonus: 0,
	RaidType: "Type1",
	RaidDifficulty: "Hardcore",
	RaidBonusScoreType1: {"Hardcore":4600000.0, "Extreme":9200000.0},
	RaidBonusScoreType2: {"Hardcore":4984000.0, "Extreme":9968000.0},
	RaidTimeScore: {"Hardcore":3200.0, "Extreme":6400.0},
	RaidTimeMult: {"Type1":960.0, "Type2":720.0},
	RaidLeftTime: {"Type1":240.0, "Type2":180.0},
    TargetscoreString: {"Kor":"목표 점수", "Eng":"Target score"},
	MinuteString: {"Kor":"분", "Eng":"min"},
	SecondString: {"Kor":"초", "Eng":"sec"}
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
    this.setState({ CostRecoveryBonus: 0 });
    this.setState({ TargetScore: "" });
    this.setState({ BattleTime: "" });
    this.setState({ LeftTime: "" });
	this.setState({ UseableCost: "" });
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
  
  TypeChange = (e) => {
    this.setState({
      RaidType: e.target.value
    });
  };

  render() {
    return (
      <div>
		<div align="center">
		<text>{this.state.DifficultyString[this.state.Language]}</text><br/>
			<input
			  id="Hardcore"
			  value="Hardcore"
			  name="RaidDifficulty"
			  type="radio"
			  checked={this.state.RaidDifficulty === "Hardcore"}
			  onChange={this.DifficultyChange}
			/>
			{this.state.HardcoreString[this.state.Language]} 　
			<input
			  id="Extreme"
			  value="Extreme"
			  name="RaidDifficulty"
			  type="radio"
			  checked={this.state.RaidDifficulty === "Extreme"}
			  onChange={this.DifficultyChange}
			/>
			{this.state.ExtremeString[this.state.Language]}
		</div><br/>
		<div align="center">
		<text>{this.state.RaidTypeString[this.state.Language]}</text><br/>
			<input
			  id="Type2"
			  value="Type2"
			  name="RaidType"
			  type="radio"
			  checked={this.state.RaidType === "Type2"}
			  onChange={this.TypeChange}
			/>
			{this.state.RaidType2String[this.state.Language]} 　
			<input
			  id="Type1"
			  value="Type1"
			  name="RaidType"
			  type="radio"
			  checked={this.state.RaidType === "Type1"}
			  onChange={this.TypeChange}
			/>
			{this.state.RaidType1String[this.state.Language]}
		</div>
		<br/>
		<div align = "center">
		</div>
		<div>
		<text>{this.state.CostBonusString[this.state.Language]}</text>
		<select name="CostRecoveryBonus" onChange={this.CostRecoveryChange}>
          <option value="0.0">0 ({this.state.NoneString[this.state.Language]})</option>
          <option value="269.0">1</option>
		  <option value="283.0">2</option>
		  <option value="296.0">3</option>
		  <option value="350.0">4</option>
		  <option value="363.0">5</option>
		  <option value="377.0">6</option>
		  <option value="431.0">7</option>
		  <option value="444.0">8</option>
		  <option value="457.0">9</option>
		  <option value="511.0">10</option>
        </select>
		</div>
		<br/><br/>
		<label>{this.state.TargetscoreString[this.state.Language]}</label>
        <input
          value={this.state.TargetScore}
          name="TargetScore"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br/><br/>
		<div align="center">
        <button onClick={this.calculateRaid}>{this.state.CalculateString[this.state.Language]}</button>
		</div>
		<br/>
        <div>
          <text name="result" id="result">
			<div>{this.state.BattleTimeString[this.state.Language]}{this.state.BattleTimeMinute}{this.state.MinuteString[this.state.Language]} {this.state.BattleTime}{this.state.SecondString[this.state.Language]}</div>
			<div>{this.state.LeftTimeString[this.state.Language]}{this.state.LeftTimeMinute}{this.state.MinuteString[this.state.Language]} {this.state.LeftTime}{this.state.SecondString[this.state.Language]}</div>
			<div>{this.state.UseableCostString[this.state.Language]}{this.state.UseableCost}</div>
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

export default Raid;