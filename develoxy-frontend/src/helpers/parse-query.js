/**
 * Converts URL query to JSON
 * @param {String} query URL Query
 */
export default function parseQuery(query) {
    const params = new URLSearchParams(query);
    const keys = [...params.keys()];
    const values = [...params.values()];
    const _json = {};
    
    for(let i = 0 ; i < keys.length ; i++) {
        _json[keys[i]] = values[i];
    }
    
    return _json;
}