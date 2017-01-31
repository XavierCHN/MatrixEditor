import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { toggleKV } from '../../actions/kv';

import withTree from '../../components/Tree';
import Avatar from '../../components/Avatar';

import styles from './index.scss';

const TreeAvatar = withTree(({ kvList, id, ...props }) => {
	const item = kvList.get(id);
	const kv = item.get('kv');
	const isFolder = !kv;
	const name = isFolder ? item.get('name') : kv.key;
	const comment = isFolder ? 'Is Folder~' : kv.comment;
	// console.log('KV:', item);

	return (
		<Avatar
			kvList={kvList} id={id}
			isFolder={isFolder} open={item.get('open')}
			name={name} comment={comment}
			{...props}
		/>
	);
}, ({ kvList, id, ...props }) => {
	const item = kvList.get(id);
	const kv = item.get('kv');

	// Skip kv entity
	if (kv) return [];

	const list = item.get('list');
	const subPropsList = list.map(subId => ({
		kvList,
		id: subId,
		...props,
	}));

	return subPropsList;
});

class KVTreeView extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.onAvatarClick = this.onAvatarClick.bind(this);
	}

	onAvatarClick(props) {
		const { dispatch, name } = this.props;
		const { id, isFolder } = props;
		if (isFolder) dispatch(toggleKV(name, id));
	}

	render() {
		const { kv, name } = this.props;
		const kvList = kv[name];
		if (!kvList) return <span>Loading...</span>;

		return (
			<div styleName="view">
				<TreeAvatar kvList={kvList} id="0" onItemClick={this.onAvatarClick} />
			</div>
		);
	}
}

KVTreeView.propTypes = {
	dispatch: PropTypes.func,
	kv: PropTypes.object,
	name: PropTypes.string,
};

const mapState = ({ kv }) => ({
	kv,
});

export default connect(mapState)(cssModules(KVTreeView, styles));
