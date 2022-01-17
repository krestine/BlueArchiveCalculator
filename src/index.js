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
	ProgramMode: "Stat",
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
    MinDamString: {"Kor":"대미지 범위 : ", "Eng":"Dam. Variance : "},
	TargetScore: "",
	BattleTime: "",
	BattleTimeError : 0,
    Language: "Kor",
	RaidType: "Type1",
	RaidDifficulty: "Hardcore",
	RaidBonusScoreType1: {"Hardcore":4600000.0, "Extreme":9200000.0},
	RaidBonusScoreType2: {"Hardcore":4984000.0, "Extreme":9968000.0},
	RaidTimeScore: {"Hardcore":3200.0, "Extreme":6400.0},
	RaidTimeMult: {"Type1":960.0, "Type2":720.0},
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
	if (this.state.RaidType == "Type1") {
		bonusScore = this.state.RaidBonusScoreType1[this.state.RaidDifficulty];
	} else {
		bonusScore = this.state.RaidBonusScoreType2[this.state.RaidDifficulty];
	}
	var targetTime = (((this.state.TargetScore - bonusScore) / timeScore) - this.state.RaidTimeMult[this.state.RaidType]) * -1.0;
	this.setState({ BattleTime: targetTime });
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
  
  ModeChange = (e) => {
    this.setState({
      ProgramMode: e.target.value
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
		
		<div>총력전 시간 계산기</div>
		<br/>
		<div align="center">
			<input
			  id="Hardcore"
			  value="Hardcore"
			  name="RaidDifficulty"
			  type="radio"
			  checked={this.state.RaidDifficulty === "Hardcore"}
			  onChange={this.DifficultyChange}
			/>
			하드코어 　
			<input
			  id="Extreme"
			  value="Extreme"
			  name="RaidDifficulty"
			  type="radio"
			  checked={this.state.RaidDifficulty === "Extreme"}
			  onChange={this.DifficultyChange}
			/>
			익스트림
		</div><br/>
		<div align="center">
			<input
			  id="Type2"
			  value="Type2"
			  name="RaidType"
			  type="radio"
			  checked={this.state.RaidType === "Type2"}
			  onChange={this.TypeChange}
			/>
			비나, 카이텐 　
			<input
			  id="Type1"
			  value="Type1"
			  name="RaidType"
			  type="radio"
			  checked={this.state.RaidType === "Type1"}
			  onChange={this.TypeChange}
			/>
			나머지
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
			<div>{this.state.BattleTime}{this.state.SecondString[this.state.Language]}</div>
          </text>
        </div>
		<br/><br/>
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
