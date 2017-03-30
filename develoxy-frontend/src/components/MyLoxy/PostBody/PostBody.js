import React from 'react';
import Layer from './Layer';
import { gql, graphql } from 'react-apollo';

const PostBody = ({darken, data}) => {
    if(!data || !data.post)  return null;
    
    return (
        <div className="post-body">
            <Layer visible={darken}/>
            <div className="inner" >
                <h1>{data.post.title}</h1>
                <div className="content">
                    {data.post.content}
                </div>
            </div>
        </div>
    );
};

const FetchPost = gql`
query Post($id: Int){
  post(id: $id){
    id
    title
    content
    releaseDate
    visibility
    isTemp
    tags
    categories {
      id
      name
    }
    
  }
}`

const PostBodyWithData = graphql(FetchPost, {
    options: ({ postId }) => ({ variables: { id: postId } }),
    skip: (ownProps) => !ownProps.postId,
})(PostBody);

export default PostBodyWithData;