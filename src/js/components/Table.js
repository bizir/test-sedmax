import React,{Component} from 'react';

import {Link} from 'react-router-dom';
import {Table, Input, Form } from 'antd';

import ValuesList from "./ValuesList";
import Checkbox from "./MyCheckBox";


const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider key={index} value={form}>
    <tr{...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  } 
  getInput = (val) => {
    if (this.props.type === 'bool') {
      return <Checkbox/>;
    }
	if(this.props.type === 'emails'){
		
		return <ValuesList/>;
	}
    return <Input />;
  };
  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return ( 
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      this.getInput(record[dataIndex])
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends Component {

  getColums = (isEditable,addColumns) =>{
	let columns = [{
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
		render: (condition)=><Checkbox disabled value={condition}></Checkbox>,
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
		columns=[...columns,...addColumns];
	}
	return columns;
  }

  handleSave = (row) => {
	const {users,onChange} = this.props;
    const newData = [...users];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
	if(onChange){
		onChange(newData);
	}
  }

  render() {
    const {isEditable,addColumns,users} = this.props;
	let columns2 = this.getColums(isEditable,addColumns);
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = columns2.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
		  type: (col.type)?col.type:"text",
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: (row)=>this.handleSave(row),
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
export default EditableTable;
