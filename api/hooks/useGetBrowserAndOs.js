const getBrowserAndOs = (fingerprint) => {
	const browser = fingerprint.components.useragent.browser.family
	const bVersion = fingerprint.components.useragent.browser.version
	const os = fingerprint.components.useragent.os.family + ' v.' + fingerprint.components.useragent.os.major
	return { browser, bVersion, os }
}

export default getBrowserAndOs