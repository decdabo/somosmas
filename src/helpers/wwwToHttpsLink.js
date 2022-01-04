/**
 * WWW website to HTTPS website
 *
 * @param {string} url example: www.google.com
 * @returns {string} www.google.com TO https://google.com/
 */

const wwwToHttpsLink = (url = "www.google.com") => {
	return "https://" + url.slice(4);
};

export default wwwToHttpsLink;
