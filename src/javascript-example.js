import { Script, Inject, A } from "@fibre/types";

/*

If you prefer, scripts can be written in JavaScript, as well as TypeScript.

JavaScript scripts still require the @Script() decorator

*/

@Script("javascriptExample")
export class JavascriptExample {

	logger;

	constructor(@Inject(A.Logger) logger) {
		this.logger = logger;
	}

	async run(repositories) {

		for (const repository of repositories) {
			this.logger.info(repository.name);
		}

		return { success: true };
	}
}
