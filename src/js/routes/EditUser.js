import React,{Component} from 'react';
import PropTypes from 'prop-types';

import {Row,Col,Button,Tree} from 'antd';

import {bindActionCreators} from  'redux';
import {connect} from 'react-redux';
import {saveUsers} from "../actions/index";

import Table from "../components/Table/";
import "./EditUser.less";

const TreeNode = Tree.TreeNode;
class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state={
			ids:[],
			users:[]
		}
	}
	componentDidMount () {
		const {match} = this.props;
		this.setState({users:this.props.users,ids:[match.params.id]});
	}
	render() {
		const {saveUsers,history} = this.props;
		const {ids,users} = this.state;
		return 	<Row>
					<Col xs={4}>
						<Tree
							checkable
							selectable={false}
							defaultExpandedKeys={['0']}
							checkedKeys={[...ids]}
							onSelect={this.onSelect}
							onCheck={(ids)=>{
								this.setState({ids});
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
							const updateUsers = users.map(u=>{
								const index = newUsers.findIndex(u1=>u1.id===u.id);
								if(index!==-1){
									return newUsers[index];
								} else {
									return u;
								}
							})
							this.setState({users:updateUsers});
						}} isEditable={true} users={users.filter(u=>(ids.indexOf(u.id.toString())!==-1 || ids.indexOf('0')!==-1))} />
						<Row>
							<Button 
								onClick={()=>{
									saveUsers(this.state.users)
									history.push("/");
								}}
								disabled={ids.length===0}	
							>Сохранить</Button>
							<Button type="danger" onClick={()=>{
								history.push("/");
							}}>Отменить</Button>
						</Row>
					</Col>
				</Row>	
	}
}
EditUser.propTypes = {
	match:	PropTypes.shape({
				params: PropTypes.shape({
					id: PropTypes.string.isRequired
				}).isRequired
			}).isRequired,
	users: 	PropTypes.arrayOf(
				PropTypes.shape({
				  id: PropTypes.number.isRequired,
				  name: PropTypes.string.isRequired,
				  condition: PropTypes.bool.isRequired,
				  email: PropTypes.string.isRequired,
				  addresses: PropTypes.array
				})
			).isRequired
};
function mapStateToProps (state) {
	return {
		users:state.users,
	};
}
function matchDispatchToProps(dispatch){
	return bindActionCreators({saveUsers},dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(EditUser);
