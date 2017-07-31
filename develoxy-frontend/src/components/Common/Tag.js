import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';


const Tag = styled.span`
    font-size: 0.75rem;
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
    margin-right: 0.4rem;
    margin-bottom: 0.4rem;
    border: 1px solid ${oc.gray[3]};
    user-select: none;

    &:hover {
        background: ${oc.pink[7]};
        border: 1px solid ${oc.pink[8]};
        color: white;
    }

    &:active {
        border: 1px solid ${oc.pink[9]};
        background: ${oc.pink[8]};
        color: white;
    }
`

export default Tag;