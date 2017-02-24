export const flatten = (node, flat = {}, parent: 'root', index=0) => {
    flat[node.id] = {
        name: node.module,
        parent,
        id: node.id.toString(),
        index
    };

    if(node.children) {
        node.children.forEach(
            (child ,i) => {
                flatten(child, flat, node.id, i);
            }
        );
    }
    return flat;
}

export const treefy = (flat) => {
    
}


export const diff = (flat, nextFlat) => {
    // 새로생긴 아이템
    const keys = Object.keys(flat);

    for(let i = 0; i < keys.length; i++) {
        // 존재하는지 확인
        const key = keys[i];
        
        // index가 바뀌었는지 확인
        if(nextFlat[key].index !== flat[key].index || nextFlat[key].parent !== flat[key].parent) {
           return {
                type: 'UPDATE',
                id: flat[key].id,
                index: nextFlat[key].index,
                parent: nextFlat[key].parent
           };
        }
    }
}