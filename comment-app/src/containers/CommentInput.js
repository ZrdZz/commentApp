import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import CommentInput from '../components/CommentInput';
import {addComment} from '../reducers/comments';

class CommentInputContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: ''
		}
	}

	_saveUsername(username){
		localStorage.setItem('username', username);
	}

	_loadUsername(){
		var username = localStorage.getItem('username');
		if(username){
			this.setState({
				username
			})
		}
	}

	handleSubmitComment(comment){
		if(!comment){
			return
		}
		if(!comment.username){
			return alert('请输入用户名!')
		}
		if(!comment.content){
			return alert('请输入评论内容!')
		}		
		const {comments} = this.props;
		const newComments = [...comments, comment];
		localStorage.setItem('comments', JSON.stringify(newComments));

		if(this.props.onSubmit){
			this.props.onSubmit(comment);
		}
	}

	componentWillMount(){
		this._loadUsername();
	}

	render(){
		return(
			<CommentInput onSubmit={this.handleSubmitComment.bind(this)} onUsernameBlur={this._saveUsername.bind(this)} username={this.state.username}/>
		)
	}
}

CommentInputContainer.propTypes = {
	comments: Proptypes.array,
	onSubmit: Proptypes.func
}

const mapStateToProps = (state) => {
	return {
		comments: state.comments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmit: (comment) => {
			dispatch(addComment(comment))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)