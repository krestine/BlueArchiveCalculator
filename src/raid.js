import React from "react";
import { render } from "react-dom";
import "./index.css";

class Raid extends React.Component {
  state = {
    TargetScore: "",
	BattleTime: "",
    Language: "Kor",
	RaidType: "Type1",
	RaidDifficulty: "Hardcore",
	RaidBonusScoreType1: {"Hardcore":4600000.0, "Extreme":9200000.0},
	RaidBonusScoreType2: {"Hardcore":4984000.0, "Extreme":9968000.0},
	RaidTimeScore: {"Hardcore":3200.0, "Extreme":6400.0},
	RaidTimeMult: {"Type1":960.0, "Type2":720.0},
    ResetString: {"Kor":"초기화", "Eng":"Reset"},
    CalculateString: {"Kor":"계산하기", "Eng":"Calculate"},
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

  calculate = () => {
	var timeScore = {this.state.RaidTimeScore[this.state.RaidDifficulty]};
	var timeMult = {this.state.RaidTimeMult[this.state.RaidType]};
	var bonusScore = 0;
	if (this.state.RaidType == "Type1") {
		bonusScore = {this.state.RaidBonusScoreType1[this.state.RaidDifficulty]};
	} else {
		bonusScore = {this.state.RaidBonusScoreType2[this.state.RaidDifficulty]};
	}
	var targetTime = (((this.state.TargetScore - bonusScore) / timeScore) - 720.0) * -1.0;
	this.setState({ BattleTime: targetTime });
  };

  resetAll = () => {
    this.setState({ TargetScore: "" });
    this.setState({ BattleTime: "" });
  };

  LanguageChange = (e) => {
    this.setState({
      Language: e.target.value
    });
  };

  render() {
    return (
      <div>
	  	  <div align="center">
			<input
			  id="Mode"
			  value="Stat"
			  name="programMode"
			  type="radio"
			  checked={this.state.ProgramMode === "Stat"}
			  onChange={this.ModeChange}
			/>
			스탯 계산기 　
			<input
			  id="Mode"
			  value="Raid"
			  name="programMode"
			  type="radio"
			  checked={this.state.ProgramMode === "Raid"}
			  onChange={this.ModeChange}
			/>
			총력전 계산기
		</div>
		<br/><br/>
        <label>{this.state.TargetscoreString[this.state.Language]}</label>
        <input
          value={this.state.TargetScore}
          name="Cri"
          onChange={(evt) => this.updateInputValue(evt)}
        />
        <br/><br/>
        <button onClick={this.calculate}>{this.state.CalculateString[this.state.Language]}</button>
        <button onClick={this.resetAll}>{this.state.ResetString[this.state.Language]}</button>
		<br/><br/>
        <div>
          <text name="result" id="result">
			<div>{this.state.BattleTime}{this.state.SecondString[this.state.Language]}</div>
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

export default raid;