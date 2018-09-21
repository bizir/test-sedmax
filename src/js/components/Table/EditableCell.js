import React,{Component} from 'react';

import {Input,Form,Checkbox} from 'antd';
import ValuesList from "../ValuesList";

import PropTypes from 'prop-types';

const FormItem = Form.Item;

class EditableCell extends Component {

	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			isMouseOver: false,
		}
	}

	toggleEdit() {
		const editing = !this.state.editing;
		this.setState({ editing });
	}

	save() {
		const { user, handleSave,form } = this.props;
		form.validateFields((error, values) => {
			if (error) {
				return;
			}
			this.toggleEdit();
			handleSave({ ...user, ...values });
		});
	} 
	getInput(type){
		if (type === 'bool') {
			return <Checkbox/>;
		}
		if(type === 'emails'){
			return <ValuesList/>;
		}
		return <Input />;
	};
	getPropName(type){
		if (type === 'bool') {
			return "checked";
		}
		return "value";
	}
	render() {
		const { editing } = this.state;
		
		const {editable,dataIndex,user,type,children,form} = this.props;
		
		let content = children;
		if(editable){
			if(editing){
				content = 	<FormItem style={{ margin: 0 }}>
							{
								form.getFieldDecorator(dataIndex, {
									rules: [],
									initialValue: user[dataIndex],
									valuePropName:this.getPropName(type)
								})(
									this.getInput(type)
								)
							}
							</FormItem>
			} else {
				content = 	<div
								className="editable-cell-value-wrap"
								style={{ paddingRight: 24 }}
								onClick={()=>this.toggleEdit()}
							>
								{children}
							</div>
			}
		}
		
		return (
			<td 
				onMouseOver={(e)=>{
					if(!this.state.isMouseOver){
						this.setState({isMouseOver:true})
					}
				}} 
				onMouseOut={()=>{
					if(this.state.isMouseOver){
						this.setState({isMouseOver:false})
						setTimeout(()=>{
							if(!this.state.isMouseOver && this.state.editing)
								this.save();
						},500)
					}		
				}
			}>
				{content}
			</td>
		);
	}
}

EditableCell.propTypes = {
	editable:PropTypes.bool,
	dataIndex:PropTypes.string,
	title:PropTypes.string,
	type:PropTypes.string,
	handleSave:PropTypes.func,
	user:	PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
				condition: PropTypes.bool.isRequired,
				email: PropTypes.string.isRequired,
				addresses: PropTypes.array
			}),
};
export default Form.create()(EditableCell);
