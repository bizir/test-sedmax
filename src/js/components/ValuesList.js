import React,{Component} from 'react';

import {Row,Input,Button,Icon} from 'antd';
import './ValuesList.less';


class ValuesList extends Component {

	componentDidMount() {
		
	}
	onAdd(){
		this.onChange([...this.props.value,""]);
	}
	onDelete(index){
		const values = [...this.props.value];
		values.splice(index, 1);
		this.onChange(values)
	}
	onChange(values) {
		let {onChange} = this.props;
		if(onChange)onChange(values);
	}
	render() {
		let {value} = this.props;
		value=(value)?value:[];
		return <Row>
		{
			value.map((v,i)=>
				<Row key={i}>
					<Input 
						value={v}
						onChange={(e)=>{
							let values = value.map((v,i1)=>{
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
		<Button onClick={()=>this.onAdd()} type="primary" style={{ marginBottom: 16 }}>
          Добавить
        </Button>
		</Row>
	}
} 

export default ValuesList;
