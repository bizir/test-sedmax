import React from 'react';
import {Link} from 'react-router-dom';

import { Row } from 'antd';

import {bindActionCreators} from  'redux';
import {connect} from 'react-redux';
import Table from "../components/Table";

const WebPage = ({users})=>(
	<Row>
		<Table addColumns={[{
			title: 'Action',
			dataIndex: 'id',
			key: 'action',
			render: (id) => <Link to={`/edit/${id}`}>Редактировать</Link>,
		}]} users={users} />
	</Row>
)
function mapStateToProps (state) {
	return {
		users:state.users,
	};
}
function matchDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(WebPage);
