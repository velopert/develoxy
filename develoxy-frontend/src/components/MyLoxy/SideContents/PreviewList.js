import React, { Component } from 'react';
import Preview from './Preview';

import { gql, graphql } from 'react-apollo';

class PreviewList extends Component {
    render() {

        if (!this.props.data.posts) { return null };
        const previews = this.props.data.posts.data;

        const previewList = previews.map(
            preview => (
                <Preview
                    key={preview.id}
                    title={preview.title}
                    content={preview.preview}
                    date={preview.releaseDate}
                />
                )
        );

        return (
            <div className="preview-list-wrapper">
                <div className="preview-list">
                    { previewList }
                </div>
            </div>
        );
    }
}

// const LoadPreview = gql`
//     query loadPreview($username: String, $category: Integer, $tag: String) {
//         posts(username: $username) {
//             data: {
//                 id
//                 title
//                 preview
//                 releaseDate
//             }
//         }
//     }
// `

const LoadPreview = gql`query Posts($username: String, $category: Int, $tag: String) {
  posts(username: $username, category: $category, tag: $tag){
    data {
        id
        title
        preview
        releaseDate
    }
  }
}`;

const PreviewListWithData = graphql(LoadPreview)(PreviewList)


export default PreviewListWithData;