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

                const list = this.props.status.write.getIn(['tags', 'list']);
                const exists = list.filter(item => item.toLowerCase() === text.toLowerCase()).size > 0;

                // 중복시 추가 안함
                if(exists) {
                    return;
                }

                WriteActions.insertTag(text)
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

        const { handleEditor, handleModal, handleCategory, handleTag } = this;
        const { status: { write, modal } } = this.props;

        return (
            <Write>
                <Sidebar>
                    {/*<SwitchButton/>*/}
                    <ImageUploadButton/>
                    <Box title="태그">
                        <TagInput value={write.getIn(['tags', 'input'])} onChange={handleTag.changeInput} onInsert={handleTag.insert}/>
                        <TagContainer tags={write.getIn(['tags', 'list'])} onRemove={handleTag.remove}/>
                    </Box>
                    <Box title="공개 설정">
                        <VisibilityOption/>
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