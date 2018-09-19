import React,{Component} from 'react';

import {Row,Col,Button} from 'antd';

import {bindActionCreators} from  'redux';
import {connect} from 'react-redux';
import {saveUsers} from "../actions/index";

import { Tree } from 'antd';
import Table from "../components/Table";
import "./EditUser.less";

const TreeNode = Tree.TreeNode;
class EditUser extends Component {
	state={
		ids:[],
		users:[]
	}
	componentWillMount () {
		const {match} = this.props;
		this.setState({users:this.props.users,ids:[parseInt(match.params.id,10)]});
	}
	componentWillReceiveProps(nextProps){
		this.setState({users:this.props.users});
	}
	render() {
		const {match,saveUsers,history} = this.props;
		const {ids,users} = this.state;
		
		return 	<Row>
					<Col xs={4}>
						<Tree
							checkable
							selectable={false}
							defaultExpandedKeys={['0']}
							defaultCheckedKeys={[(match.params.id)?match.params.id:'']}
							onSelect={this.onSelect}
							onCheck={(ids)=>{
								this.setState({ids:ids.map(id=>parseInt(id,10))});
							}}
						  >
							  <TreeNode title={'Сущности'} key={0}>
							  {
								users.map(user=>
									<TreeNode title={user.name} key={user.id}></TreeNode>
								)
							  }
							  </TreeNode>
						</Tree>
					</Col>
					<Col xs={20}>
						<Table onChange={(newUsers)=>{
							let {users} = this.props;
							users = users.map(u=>{
								let index = newUsers.findIndex(u1=>u1.id===u.id);
								if(index!==-1){
									return newUsers[index];
								} else {
									return u;
								}
							})
							this.setState({users});
						}} isEditable={true} users={users.filter(u=>(ids.indexOf(u.id)!==-1 || ids.indexOf(0)!==-1))} />
						<Row>
							<Button onClick={()=>{
								saveUsers(this.state.users)
								history.push("/");
							}}>Сохранить</Button>
							<Button type="danger" onClick={()=>{
								history.push("/");
							}}>Отменить</Button>
						</Row>
					</Col>
				</Row>	
	}
}

function mapStateToProps (state) {
	return {
		users:state.users,
	};
}
function matchDispatchToProps(dispatch){
	return bindActionCreators({saveUsers},dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(EditUser);
