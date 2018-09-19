import React,{Component} from 'react';
import {Checkbox} from 'antd';

class MyCheckBox extends Component {

	componentDidMount() {
		
	}
	
	render() {
		const {value,disabled,onChange} = this.props;
		let nameText = (value)?"Работает":"Не работает";
		let content = <Checkbox onChange={onChange} checked={value}>{nameText}</Checkbox>;
		if(disabled){
			content = <p>{nameText}</p>
		}
		return content;
	}
} 

export default MyCheckBox;
