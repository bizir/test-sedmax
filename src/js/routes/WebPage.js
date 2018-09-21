import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { Row } from 'antd';

import {bindActionCreators} from  'redux';
import {connect} from 'react-redux';

import Table from "../components/Table/";

function WebPage({users}){
	return <Row>
				<Table addColumns={[{
					title: 'Action',
					dataIndex: 'id',
					key: 'action',
					render: (id) => <Link to={`/edit/${id}`}>Редактировать</Link>,
				}]} users={users} />
			</Row>
}
WebPage.propTypes = {
	users: PropTypes.arrayOf(
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
		users:state.users ,
	};
}
function matchDispatchToProps(dispatch){
	return bindActionCreators({},dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(WebPage);
