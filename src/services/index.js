import xFetch from './xFetch';
import { forIn } from 'lodash/object';
import { findIndex } from 'lodash/array'
import qs from 'qs';
import { interfaces ,fetchDefault } from '../../interface.config.json';
export
async
function fetch(queryParams, opts = {}) {
    let { api = "" } = queryParams;
    let data = queryParams;
    delete data.api;
    if (api === "") return;
    let { url ,options = {} } = interfaces[findIndex(interfaces, {name: api})];
    options = Object.assign(fetchDefault, Object.assign(options, opts), {body: qs.stringify(data)});
    if (options.method === "get" || options.method === "GET") {
        let params = [];
        forIn(data, (key , value) = > {
            params.push(`${value}=${key}`)
    })
        url += "?" + params.join("&");
        delete options.body;
    }
    return xFetch(url, options);
}

