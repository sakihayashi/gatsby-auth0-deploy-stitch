import React from 'react'
import { Link } from 'gatsby'

const TopicDigest = (props) => {
    console.log(props)
    const { question, title, id, picture, time, nickname, owner_id, userEmail } = props.node;

    return (
        <React.Fragment>
            <li className="post-list-item" key={id}>
                <Link to={id}><img className="post-list-img" src={picture} />
                    <div className="post-list-text"><strong>{title}</strong></div>
                    <div className="post-list-text font-kokoro">ユーザー：{' '}{nickname}{' | '}{3}{' '}min{' '}read{' | '}{time}</div>
                    <div className="post-list-desc">{question}</div>
                </Link>
          </li>
        </React.Fragment>
    )
}


export default TopicDigest