import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Table } from 'antd';

import EditableFormCell from "./EditableCell.js";

import "./Table.less";

class EditableTable extends Component {

	getColums = (isEditable,addColumns) => {
		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			type:"text",
			render: (name,user) => <Link to={`/edit/${user.id}`}>{name}</Link>,
			editable:isEditable,
		}, {
			title: 'Condition',
			dataIndex: 'condition',
			key: 'condition',
			type:"bool",
			render: (condition)=>(condition)?"Работает":"Не работает",
			editable:isEditable,
		}, {
			title: 'Email',
			dataIndex: 'email',
			key: 'email', 
			editable:isEditable,
		}, {
			title: 'Addresses',
			dataIndex: 'addresses',
			key: 'addresses',
			type:"emails",
			render: (addresses) => 	addresses.join(" , "),
			editable:isEditable,
		}];
		if(addColumns){
			return [...columns,...addColumns];
		}
		return columns;
	}

	onSave = (row) => {
		const {users,onChange} = this.props;
		const newData = users.map((u)=>{
			if(u.id===row.id){
				return row;
			}
			return u;
		});
		if(onChange){
			onChange(newData);
		}
	}

	render() {
		const {isEditable,addColumns,users} = this.props;
		const components = {
			body: {
				cell: EditableFormCell,
			},
		};
		const columns = this.getColums(isEditable,addColumns).map((col) => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: user => ({
					user,
					type: (col.type)?col.type:"text",
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: (row)=>this.onSave(row),
				}),
			};
		});
		return (
			<Table
				rowKey={user => {
					return user.id+""
				}}
				components={components}
				rowClassName={() => 'editable-row'}
				dataSource={users}
				columns={columns}
			/>
		);
	}
}
EditableTable.propTypes = {
	users: 	PropTypes.arrayOf(
				PropTypes.shape({
				  id: PropTypes.number.isRequired,
				  name: PropTypes.string.isRequired,
				  condition: PropTypes.bool.isRequired,
				  email: PropTypes.string.isRequired,
				  addresses: PropTypes.array
				})
			).isRequired,
	addColumns:	PropTypes.arrayOf(
					PropTypes.shape({
					  title: PropTypes.string.isRequired,
					  dataIndex: PropTypes.string.isRequired,
					  key: PropTypes.string.isRequired,
					  type: PropTypes.string,
					  render: PropTypes.function,
					  editable: PropTypes.bool,
					})
				),
	isEditable:	PropTypes.bool
};
export default EditableTable;