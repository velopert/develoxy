import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as header from 'redux/modules/base/header';
import * as write from 'redux/modules/write';
import * as modal from 'redux/modules/base/modal';

import CategoryModal from 'components/Base/Modals/CategoryModal';


import { orderify } from 'helpers/category';

import Write, { Content, MarkdownEditor } from 'components/Write/Write';

import Sidebar, { 
    SwitchButton,
    ImageUploadButton,
    Box,
    TagInput,
    TagContainer,
    VisibilityOption,
    Category
} from 'components/Write/Sidebar/Sidebar';

import debounce from 'lodash/debounce';


import { List, Map } from 'immutable';

class WriteRoute extends Component {


    componentDidMount() {
        this.handleCategory.get();
    }

    handleCategory = (() => {
        const { WriteActions } = this.props;

        return {
            get: () => {
                WriteActions.getCategory();
            },
            create: () => {
                WriteActions.createCategory("새 카테고리");
            },
            move: ({parentId, index, id}) => {
                WriteActions.moveCategory({parentId, index, id})
            },
            delete: (id) => {
                WriteActions.deleteCategory(id);
            },
            rename: ({id, name}) => {
                WriteActions.renameCategory({id, name})
            },
            toggle: (index) => {
                WriteActions.toggleCategory(index);
            }
        }
    })()

    handleTag = (() => {
        const { WriteActions } = this.props;

        return {
            changeInput: (text) => {               
                WriteActions.changeTagInput(text)
            },
            insert: (text) => {

                // 체크 
                const check = (t) => {
                    const list = this.props.status.write.getIn(['tags', 'list']);
                    const exists = list.filter(item => item.toLowerCase() === t.toLowerCase()).size > 0;

                    return exists;
                }

                // 태그에 쉼표가 있다
                if(text.indexOf(',')>0) {
                    const tags = text.split(',');
                    tags.forEach(
                        item => {
                            // 중복하는 경우 스킵
                            if(check(item)) return;

                            // 앞뒤에 space 있는경우 없앰 
                            WriteActions.insertTag(item.trim());
                        }
                    );
                } else {
                    // 존재시 스킵
                    if(check(text)) return;

                    WriteActions.insertTag(text.trim());
                }
            },
            remove: (index) => {
                WriteActions.removeTag(index)
            }
        }
    })()
    
    handleEditor = (() =>{
        const { WriteActions } = this.props;

        return {
            changeTitle: (title) => {
                WriteActions.changeTitle(title);
            },
            changeMarkdown: (markdown) => {
                WriteActions.changeMarkdown(markdown);
            },
            setFullscreen: (value) => {
                WriteActions.setFullscreen(value);
            },
            setScrollPercentage: (value) => {
                WriteActions.setScrollPercentage(value)
            },
            setIsLastLine: (value) => {
                WriteActions.setIsLastLine(value);
            },
            setVisibility: (value) => {
                // 포스트 공개/비공개 설정
                WriteActions.setVisibility(value);
            }
        }
    })()

    handleModal = (() => {
        const { ModalActions } = this.props;
        return {
            open: ({modalName, data}) => {
                ModalActions.openModal({modalName, data});
            },
            close: (modalName) => {
                ModalActions.closeModal(modalName);
            },
            setError: (modalName) => {
                return (error) => ModalActions.setError({modalName, error});
            },
            setOption: (modalName) => {
                return ({optionName, value}) => ModalActions.setOption({modalName, optionName, value});
            }
        }
    })()

    handlePost = (() => {
        const { WriteActions } = this.props;

        return {
            save: (isTemp) => {
                const { status: { write } } = this.props;

                const postId = write.getIn(['workingPost', 'postId']);
                const editor = write.get('editor');
                
                const categories = write.getIn(['category', 'flat'])
                                    .filter(category=>category.get('value'))
                                    .map(category=>category.get('id'))
                                    .toJS();
                
                const tags = write.getIn(['tags', 'list'])
                              .toJS();
                
                
                const payload = {
                    title: editor.get('title'),
                    content: editor.get('markdown'),
                    visibility: editor.get('visibility'),
                    isTemp,
                    categories,
                    tags
                }

                if(!postId) {
                    // 포스트 아이디가 존재하지 않는 경우에는
                    // 게시글을 새로 작성한다
                    return WriteActions.createPost(payload);
                } else {
                    // 포스트 아이디가 이미 존재하는 경우에는
                    // payload 에 postId 넣고, updatePost 를 호출
                    payload.postId = postId;
                    return WriteActions.updatePost(payload);
                }

                
            }
        }
    })()

    componentWillMount() {
        // 헤더를 숨긴다
        const { HeaderActions } = this.props;
        HeaderActions.hideHeader();
    }

    componentWillUnmount() {
        // 헤더를 보여준다
        const { HeaderActions } = this.props;
        HeaderActions.showHeader();
    }
    
    
    render() {

        const { handleEditor, handleModal, handleCategory, handleTag, handlePost } = this;
        const { status: { write, modal } } = this.props;

        return (
            <Write>
                <Sidebar 
                    tags={write.get('tags')}
                    category={write.get('category')}
                >
                    {/*<SwitchButton/>*/}
                    <ImageUploadButton/>
                    <Box title="태그">
                        <TagInput value={write.getIn(['tags', 'input'])} onChange={handleTag.changeInput} onInsert={handleTag.insert}/>
                        <TagContainer tags={write.getIn(['tags', 'list'])} onRemove={handleTag.remove}/>
                    </Box>
                    <Box title="공개 설정">
                        <VisibilityOption onChange={handleEditor.setVisibility}/>
                    </Box>
                    <Box title="카테고리">
                        <Category 
                            category={write.getIn(['category', 'flat'])} 
                            onConfigure={()=>handleModal.open({modalName: 'category'})} 
                            onToggle={handleCategory.toggle}
                        />
                    </Box>
                </Sidebar>
                <Content>
                    <MarkdownEditor
                        onChangeTitle={handleEditor.changeTitle}
                        onChangeMarkdown={handleEditor.changeMarkdown}
                        onSetFullscreen={handleEditor.setFullscreen}
                        onSetScrollPercentage={handleEditor.setScrollPercentage}
                        onSetIsLastLine={handleEditor.setIsLastLine}
                        title={write.getIn(['editor', 'title'])}
                        markdown={write.getIn(['editor', 'markdown'])}
                        fullscreen={write.getIn(['editor', 'fullscreen'])}
                        scrollPercentage={write.getIn(['editor', 'scrollPercentage'])}
                        isLastLine={write.getIn(['editor', 'isLastLine'])}
                        onSave={handlePost.save}
                        isTemp={write.getIn(['workingPost', 'isTemp'])}
                    />
                </Content>


                <CategoryModal 
                    visible={modal.getIn(['category', 'open'])} 
                    onHide={()=>handleModal.close('category')}
                    category={write.getIn(['category', 'flat'])}
                    onMove={handleCategory.move}
                    onRevert={handleCategory.revert}
                    waiting={
                        write.getIn(['pending', 'moveCategory']) 
                        || write.getIn(['pending', 'deleteCategory'])
                        || write.getIn(['pending', 'renameCategory'])
                        || write.getIn(['pending', 'createCategory'])
                    }
                    error={modal.getIn(['category', 'error'])}
                    onError={handleModal.setError('category')}
                    onSetOption={handleModal.setOption('category')}
                    selected={modal.getIn(['category', 'selected'])}
                    onDelete={handleCategory.delete}
                    onRename={handleCategory.rename}
                    onCreate={handleCategory.create}
                />

            </Write>
        );
    }
}



WriteRoute = connect(
    state => ({
        status: {
            header: state.base.header,
            modal: state.base.modal,
            write: state.write
        }
    }),
    dispatch => ({
        HeaderActions: bindActionCreators(header, dispatch),
        WriteActions: bindActionCreators(write, dispatch),
        ModalActions: bindActionCreators(modal, dispatch),
    })
)(WriteRoute);

export default WriteRoute;