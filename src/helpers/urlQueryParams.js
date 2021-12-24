const buildQuery = (endpoint, search = "", limit = 20) => {
	return search
		? `${endpoint}?search=${search}&limit=${limit}`
		: `${endpoint}?limit=${limit}`;
};

export default buildQuery;
