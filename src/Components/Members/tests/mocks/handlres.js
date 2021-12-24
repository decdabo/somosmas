import { rest } from "msw";

export const handlers = [
	rest.get(
		"https://85122.cke-cs.com/token/dev/63f1e5122f7b89374a44f0ba134c7a670437bab84212188ac1b17d829d92",
		(req, res, ctx) => {
			return res(
				ctx.text(
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiYXV0aCI6eyJjb2xsYWJvcmF0aW9uIjp7IioiOnsicm9sZSI6IndyaXRlciJ9fX0sInVzZXIiOnsiaWQiOiIzIiwibmFtZSI6IlBldGVyIEtsZXVlciIsImVtYWlsIjoiYnV0ZWVtaUBqb25kdXBpLmN6In0sImlzRGV2VG9rZW4iOnRydWUsInRpbWVzdGFtcCI6MTY0MDE0NDQ2NDQ3MCwic2lnbmF0dXJlIjoiNDJlYmY2MTU0ZjM1YTE1MjE0ZGQwZTExNzBhYTU5OWQyZWU4YzhjMzMyZGE2NDQ2NTlkMjFhMDYzYjJlZmI3MSIsImV4cCI6MTY0MDE0ODA2NCwiYXVkIjoiYUVjMVVva3lrcVBlQXU1VHpDVWQiLCJqdGkiOiJRd2p1TGNDOVpfdC1JT3kzQTFfYVdHamVyWElCb1h5ZyIsImlhdCI6MTY0MDE0NDQ2NH0.-qLwOjTpq1X8LMfXAk_9cJ7qPr9CTYKRSMNcIBDXjgc"
				)
			);
		}
	),
];
