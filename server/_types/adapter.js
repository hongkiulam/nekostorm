/**
 * @module adapter
 */
/**
 * Response
 * @typedef {*} Response
 *
 */

/**
 * Search Params
 * @typedef {Object} SearchParams
 * @property {string} q
 * @property {SortOptions} sort
 * @property {'true'|'false'} order true=ascending false=descending
 * @property {string} user
 * @property {string} page
 * @property {'true'} trusted
 * @property {'nyaasi' | 'nyaapantsu' | 'animetosho'=} source
 */

/**
 * Adapter
 * @typedef {function(SearchParams): Promise<Response>} Adapter
 */

/**
 * SortOptions
 * @typedef {'date'|'size'|'seeders'} SortOptions
 */

/**
 * @typedef {Object} NekoResponse
 * @property {number} id
 * @property {string} name
 * @property {string} hash
 * @property {string} date
 * @property {string} filesize
 * @property {string=} category
 * @property {string=} sub_category
 * @property {string} magnet
 * @property {string} torrent
 * @property {string} seeders
 * @property {string} leechers
 * @property {string=} description
 * @property {"nyaasi" | "nyaapantsu" | "anidex" | "tokyotosho"} source
 * @property {object} original
 */
