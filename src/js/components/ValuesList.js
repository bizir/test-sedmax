import React,{Component} from 'react';
import PropTypes from 'prop-types';

import {Row,Input,Button,Icon} from 'antd';
import './ValuesList.less';



class ValuesList extends Component {
	onAdd(){
		this.onChange([...this.props.value,""]);
	}
	onDelete(index){
		let {value} = this.props;
		this.onChange(value.filter((v,i)=>i!==index))
	}
	onChange(values) {
		let {onChange} = this.props;
		if(onChange)onChange(values);
	}
	render() {
		const {value} = this.props;
		return <Row>
		{
			value.map((v,i)=>
				<Row key={i+"_"+value.length}>
					<Input 
						value={v}
						onChange={(e)=>{
							const values = value.map((v,i1)=>{
								if(i===i1){
									return e.target.value;
								}
								return v;
							})
							this.onChange(values)
						}}
					/>
					<Icon type="close-circle" onClick={()=>{this.onDelete(i)}} theme="twoTone" />
				</Row>
			)
		}
		<Button onClick={()=>this.onAdd()} type="primary">
			Добавить
        </Button>
		</Row>
	}
} 
ValuesList.propTypes = {
	value: 	PropTypes.array
};
export default ValuesList;
