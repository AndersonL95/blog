import moment from 'moment'
import 'moment/locale/pt-br'
const Comments = ({comments}) => {
    return comments.length > 0 ? comments.map((comment) => (
        <div key={comment._id} className='commentSection'>
            <div className='post_header'>
                <div className='post_header_avator'>
                    {comment.userName ? comment.userName[0] : ''}
                </div>
                <div className='post_header_user'>
                    <span>{comment.userName} </span>
                    <span>{moment().format('l')}</span>
                </div>
            </div>
            <div className='comment_body'>
                {comment.comment}
            </div>
        </div>
        )):(
            'Sem comentarios'
    ) 
}
export default Comments