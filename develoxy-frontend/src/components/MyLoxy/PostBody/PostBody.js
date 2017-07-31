import React, { Component } from 'react';
import Layer from './Layer';
import { gql, graphql } from 'react-apollo';

import showdown from 'showdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import $ from 'jquery';
import DatePrint from 'components/Common/DatePrint';

import IonFolder from 'react-icons/lib/io/folder';

import Tag from 'components/Common/Tag';
import styled from 'styled-components'
import oc from 'open-color';

import { orderify, treeize, flatten } from 'helpers/category';

const StyledFolder = styled(IonFolder)`
    margin-right: 0.4rem;
    color: ${oc.gray[6]};
`

const Categories = styled.div`
    margin-top: 0.25rem;
`

const Category = styled.span`
    color: ${oc.gray[7]};
    font-size: 0.8rem;
    &:after {
        content: " / ";
        color: ${oc.black};
    }
    &:last-child:after {
        content: "";
    }
`


const Tags = styled.div`
    margin-top: 0.35rem;
`;

const NoCategory = styled.span`
    color: ${oc.gray[5]};
    font-size: 0.9rem;
`;

class PostBody extends Component {

    static defaultProps = {
        data: {},
        darken: false
    }
    
    state = { 
        html: '',
        categories: []
    }

    converter = null

    componentDidMount() {
        const { data } = this.props;
        
        // converter 생성
        this.converter = new showdown.Converter({
            simpleLineBreaks: true
        });

        // 데이터가 없으면 아무것도 하지 않는다
        if(!data || !data.post) return null;

        // 마크다운 렌더 함수 호출
        this.renderMarkdown(data.post.content);
    }

    renderMarkdown(body) {
        const html = this.converter.makeHtml(body);
        // 카테고리도 소팅함


        // state 에 렌더링 결과 담음
        this.setState({
            html
        });
    }

    componentWillReceiveProps(nextProps) {
        // 데이터가 없으면 아무것도 하지 않음
        if(!nextProps.data || !nextProps.data.post) return null;
        
        // content 가 바뀌었을 경우
        const { content } = nextProps.data.post;
        if(!this.props.data.post || this.props.data.post.content !== content) {
            this.renderMarkdown(content);
            const orderedCategory = flatten(treeize(orderify(nextProps.data.post.categories)))
            this.setState({
                categories: orderedCategory
            });
        }
    }

    highlightCodes() {
        $('pre code').each((i, block) => {
            hljs.highlightBlock(block);
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevState.html !== this.state.html) {
            // 코드에 색상을 입혀준다
            this.highlightCodes();
        }
    }

    createMarkup = () => ({
        __html: this.state.html
    })

    render() {
        const { darken, data } = this.props;
        const { categories } = this.state;

        if(!data.post) return null;

        const tagList = data.post.tags.map(
            tag => <Tag key={tag}>{tag}</Tag>
        );

        return (
            <div className="post-body">
                <Layer visible={darken}/>
                {
                    data.post && (
                        <div className="inner" >
                            <div className="title">{data.post.title}</div>
                            
                            <DatePrint date={new Date(data.post.releaseDate)} className="date"/>
                            
                            <Categories>
                                <StyledFolder/>
                                {
                                    categories.length === 0 
                                    ? <NoCategory>분류 없음</NoCategory> 
                                    : categories.map(
                                        category => <Category key={category.id}>{category.name}</Category>
                                    )
                                }
                            </Categories>
                            {
                                data.post.tags.length !== 0 && <Tags>{tagList}</Tags>
                            }
                            <div className="content" dangerouslySetInnerHTML={this.createMarkup()}>
                                
                            </div>
                        </div>
                    )
                }
            </div>
        );
        
    }
}

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
      parentId
      index
    }
  }
}`

const PostBodyWithData = graphql(FetchPost, {
    options: ({ postId }) => ({ variables: { id: postId } }),
    skip: (ownProps) => !ownProps.postId,
})(PostBody);

export default PostBodyWithData;