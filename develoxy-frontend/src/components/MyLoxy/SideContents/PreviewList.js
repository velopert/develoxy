import React, { Component } from 'react';
import Preview from './Preview';

import { gql, graphql } from 'react-apollo';


import { Scrollbars } from 'react-custom-scrollbars';

import throttle from 'lodash/throttle';


class PreviewList extends Component {

    prev = null

    renderThumb = ({style, ...props}) => {
        // 커스텀 스크롤바 스타일링
        const thumbStyle = {
            ...style,
            backgroundColor: '#faa2c1',
            width: '4px',
            left: '4px',
            borderLeft: '1px solid rgba(0,0,0,0.1)'
        };

        return (
            <div
                style={thumbStyle}
            />
        )
    }

    handleScroll = throttle((e) => {
        const { hasNext, previews, loadMoreEntries } = this.props;


        if(!hasNext) return null;
        
        const cursor = previews[previews.length - 1].id;

        if(cursor === this.prev) return;

        const scrollBottom = e.target.scrollHeight - (e.target.offsetHeight + e.target.scrollTop);
        
        if(scrollBottom < 200) {
            loadMoreEntries(previews[previews.length - 1].id);
            this.cursor = cursor;
        }

    }, 200)

    render() {
        const { onSelect } = this.props;

        if (!this.props.previews) { return null };
        const previews = this.props.previews;

        const previewList = previews.map(
            preview => (
                <Preview
                    key={preview.id}
                    id={preview.id}
                    title={preview.title}
                    content={preview.preview}
                    date={preview.releaseDate}
                    onClick={onSelect}
                />
                )
        );

        return (
            <Scrollbars renderThumbVertical={this.renderThumb} onScroll={this.handleScroll}>
                <div className="preview-list-wrapper">
                    <div className="preview-list">
                        { previewList }
                    </div>
                </div>
            </Scrollbars>
        );
    }
}
const LoadPreview = gql`query Posts($username: String, $category: Int, $tag: String, $cursor: Int) {
  posts(username: $username, category: $category, tag: $tag, cursor: $cursor){
    data {
        id
        title
        preview
        releaseDate
    }
    hasNext
  }
}`;

const PreviewListWithData = graphql(LoadPreview, {
    props({data: { loading, posts, fetchMore, variables, ...rest } }) {
        return {
            loading,
            previews: posts === undefined ? null : posts.data,
            hasNext: posts === undefined ? null : posts.hasNext,
            rest,
            loadMoreEntries: (cursor) => {
                return fetchMore({
                    query: LoadPreview,
                    variables: {
                        ...variables,
                        cursor
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        
                        if(fetchMoreResult.posts.data === null) return previousResult;
                        
                        return {
                            ...previousResult,
                            posts: {
                                ...previousResult.posts,
                                data: [...previousResult.posts.data, ...fetchMoreResult.posts.data]
                            }
                        }
                    }
                })
            }
        }
    }
})(PreviewList)


export default PreviewListWithData;