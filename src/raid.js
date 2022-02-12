import React from "react";
import { render } from "react-dom";
import "./index.css";
import { setCookie, getCookie } from './cookie';

class Raid extends React.Component {
	componentDidMount() {
		this.setState({ Language: getCookie(["Language"])});
		if(getCookie(["Language"]) == null){
			this.setState({ Language: "Kor"});
		}
		this.setState({ RaidType: getCookie(["RaidType"])});
		if(getCookie(["RaidType"]) == null){
			this.setState({ RaidType: "Type1"});
		}
		this.setState({ RaidDifficulty: getCookie(["RaidDifficulty"])});
		if(getCookie(["RaidDifficulty"]) == null){
			this.setState({ RaidDifficulty: "Hardcore"});
		}
		//this.setState({ CostRecoveryBonus: "444.0"});
		//this.setState({ CostRecoveryBonus: getCookie(["CostBonus"])});
		//if(getCookie(["CostBonus"]) == null){
		//	this.setState({ CostRecoveryBonus: 0});
		//}
	}
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
	InvalidScore: "",
	LeftTimePartyCount: "",
	RaidBonusScoreType1: {"Hardcore":4600000.0, "Extreme":9200000.0},
	RaidBonusScoreType2: {"Hardcore":4984000.0, "Extreme":9968000.0},
	RaidMaxScoreType1: {"Hardcore":7672000.0, "Extreme":15344000.0},
	RaidMaxScoreType2: {"Hardcore":7288000.0, "Extreme":14576000.0},
	RaidTimeScore: {"Hardcore":3200.0, "Extreme":6400.0},
	RaidTimeMult: {"Type1":960.0, "Type2":720.0},
	RaidLeftTime: {"Type1":240.0, "Type2":180.0},
    TargetscoreString: {"Kor":"목표 점수", "Eng":"Target score"},
	MinuteString: {"Kor":"분", "Eng":"min"},
	SecondString: {"Kor":"초", "Eng":"sec"},
	InvalidScoreString: {"Kor":"잘못된 점수", "Eng":"Invalid score"},
	PartyString: {"Kor": "파티", "Eng": "Party"}
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
	//setCookie("CostBonus", e.target.value, {maxAge: 2592000});
  };
  
  calculateRaid = () => {
	var timeScore = this.state.RaidTimeScore[this.state.RaidDifficulty];
	var timeMult = this.state.RaidTimeMult[this.state.RaidType];
	var bonusScore = 0;
	var maxScore = 0;
	if (this.state.RaidType === "Type1") {
		bonusScore = this.state.RaidBonusScoreType1[this.state.RaidDifficulty];
		maxScore = this.state.RaidMaxScoreType1[this.state.RaidDifficulty];
	} else {
		bonusScore = this.state.RaidBonusScoreType2[this.state.RaidDifficulty];
		maxScore = this.state.RaidMaxScoreType2[this.state.RaidDifficulty];
	}
	var targetTime = (((this.state.TargetScore - bonusScore) / timeScore) - timeMult) * -1.0;
	var tempTargetScore = this.state.TargetScore;
	if(this.state.TargetScore > maxScore || this.state.TargetScore < 10){
		this.setState({ InvalidScore: this.state.InvalidScoreString[this.state.Language]});
	} else if(this.state.TargetScore < bonusScore){
		while(this.state.TargetScore < (maxScore * 0.1)){
			this.state.TargetScore *= 10;
		}
		if(this.state.TargetScore > bonusScore){
			targetTime = (((this.state.TargetScore - bonusScore) / timeScore) - timeMult) * -1.0;
			this.setState({ InvalidScore: ""});
			var targetMinute = parseInt(targetTime / 60, 10);
			var leftTime = this.state.RaidLeftTime[this.state.RaidType] - targetTime;
			var leftTimeCount = 0;
			if(leftTime < 0){
				while(leftTime < 0){
					leftTime += this.state.RaidLeftTime[this.state.RaidType];
					leftTimeCount += 1;
				}
			}
			var leftMinute = parseInt(leftTime / 60, 10);
			var recoveryRate = 4200.0 + parseFloat(this.state.CostRecoveryBonus);
			var totalCost = (recoveryRate / 10000.0) * (targetTime - 2.0);
			targetTime = targetTime % 60;
			leftTime = leftTime % 60;
			var tempLeftTimePartyCount = " + " + leftTimeCount.toString() + this.state.PartyString[this.state.Language];
			if(leftTimeCount == 0){
				tempLeftTimePartyCount = "";
			}
			this.setState({ BattleTime: targetTime.toFixed(3) });
			this.setState({ BattleTimeMinute: targetMinute });
			this.setState({ LeftTime: leftTime.toFixed(3) });
			this.setState({ LeftTimeMinute: leftMinute });
			this.setState({ LeftTimePartyCount: tempLeftTimePartyCount });
			this.setState({ UseableCost: totalCost.toFixed(3) });
		}
		else{
			this.setState({ InvalidScore: this.state.InvalidScoreString[this.state.Language]});
			this.setState({ TargetScore: tempTargetScore});
		}
	} else {
		this.setState({ InvalidScore: ""});
		var targetMinute = parseInt(targetTime / 60, 10);
		var leftTime = this.state.RaidLeftTime[this.state.RaidType] - targetTime;
		var leftTimeCount = 0;
		if(leftTime < 0){
			while(leftTime < 0){
				leftTime += this.state.RaidLeftTime[this.state.RaidType];
				leftTimeCount += 1;
			}
		}
		var leftMinute = parseInt(leftTime / 60, 10);
		var recoveryRate = 4200.0 + parseFloat(this.state.CostRecoveryBonus);
		var totalCost = (recoveryRate / 10000.0) * (targetTime - 2.0);
		targetTime = targetTime % 60;
		leftTime = leftTime % 60;
		var tempLeftTimePartyCount = " + " + leftTimeCount.toString() + this.state.PartyString[this.state.Language];
		if(leftTimeCount == 0){
			tempLeftTimePartyCount = "";
		}
		this.setState({ BattleTime: targetTime.toFixed(3) });
		this.setState({ BattleTimeMinute: targetMinute });
		this.setState({ LeftTime: leftTime.toFixed(3) });
		this.setState({ LeftTimeMinute: leftMinute });
		this.setState({ LeftTimePartyCount: tempLeftTimePartyCount });
		this.setState({ UseableCost: totalCost.toFixed(3) });
	}
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
	setCookie("Language", e.target.value, {maxAge: 2592000});
  };

  DifficultyChange = (e) => {
    this.setState({
      RaidDifficulty: e.target.value
    });
	setCookie("RaidDifficulty", e.target.value, {maxAge: 2592000});
  };
  
  TypeChange = (e) => {
    this.setState({
      RaidType: e.target.value
    });
	setCookie("RaidType", e.target.value, {maxAge: 2592000});
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
			<div><font color="Red">{this.state.InvalidScore}</font></div>
			<div>{this.state.BattleTimeString[this.state.Language]}{this.state.BattleTimeMinute}{this.state.MinuteString[this.state.Language]} {this.state.BattleTime}{this.state.SecondString[this.state.Language]}</div>
			<div>{this.state.LeftTimeString[this.state.Language]}{this.state.LeftTimeMinute}{this.state.MinuteString[this.state.Language]} {this.state.LeftTime}{this.state.SecondString[this.state.Language]}{this.state.LeftTimePartyCount}</div>
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