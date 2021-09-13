import { Options } from './types';

export default class Database {
    /**
     * The suffix needed to be appended to the DB url to access json
     */
    private readonly URL_SUFFIX = ".json";

    /**
     * Suffix to be appended to DB URL to access json and do authed requests
     */
    private readonly AUTH_SUFFIX = ".json?auth=";

    /**
     * Options for initializing the class look at type def
     */
    private options: Options;

    constructor(options: Options) {
        this.options = options;

        if (!options.databaseUrl || options.databaseUrl.length == 0) {
            console.log('Database URL is invalid. SDK not initialized');
        }
    }

    /**
     * Writes the given data to the database
     * @param location Where to write the data
     * @param data JSON to write, stringified
     * @param authenticated Should the request be authenticated
     * @returns If the write operation suceeded
     */
    async write(location: string, data: string, authenticated: boolean) {
        try {
            await fetch(
                this.options.databaseUrl + location + 
                    authenticated ? this.AUTH_SUFFIX + this.options.authentication : this.URL_SUFFIX,
                {
                    method: 'PUT',
                    headers: {

                    },
                    body: data,
                },
            )

            return true;
        } catch {
            return false;
        }
    }
}
