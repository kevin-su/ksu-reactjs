import 'es6-promise';
import fetch from 'isomorphic-fetch';

export function getItemData(success) {
    return fetch('/data/content.json');
}
