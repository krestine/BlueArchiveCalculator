import React, {useState} from 'react';

const Footer = ({ PageLanguage, getLanguage }) => {
	const [Lang, setLang] = useState("Kor")
	const PageLanguageChange = (e) => {
		setLang(e.target.value);
		getLanguage(Lang);
	};
		return(
		<div align="center">
			<input
			  id="Korean"
			  value="Kor"
			  name="Kor"
			  type="radio"
			  checked={Lang === "Kor"}
			  onChange={PageLanguageChange}
			/>
			한국어 　
			<input
			  id="English"
			  value="Eng"
			  name="Eng"
			  type="radio"
			  checked={Lang === "Eng"}
			  onChange={PageLanguageChange}
			/>
			English
		</div>
		);
}

export default Footer;