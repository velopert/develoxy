import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Tag = styled.span`
    font-size: 0.8rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background: ${oc.gray[2]};
    display: inline-block;
    border-radius: 2px;
    font-weight: 400;
    color: ${oc.gray[7]};
    cursor: pointer;
    & + & {
        margin-left: 0.6rem;
    }

    &:hover {
        background: ${oc.pink[7]};
        color: white;
    }

    &:active {
        background: ${oc.pink[8]};
        color: white;
    }
`

export default Tag;