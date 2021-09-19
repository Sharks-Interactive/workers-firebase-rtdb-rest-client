import {Options} from './types';

/**
 * Represents a database obejct
 */
export default class Database {
  /**
   * @type {string}
   * The suffix needed to be appended to the DB url to access json
   */
  private readonly URL_SUFFIX: string = '.json';

  /**
   * @type {string}
   * Suffix to be appended to DB URL to access json and do authed requests
   */
  private readonly AUTH_SUFFIX = '.json?auth=';

  /**
   * @type {Options}
   * Options for initializing the class look at type def
   */
  private options: Options;

  /**
   * @param {Options} options Config for initializing the lib
   */
  constructor(options: Options) {
    this.options = options;

    if (!options.databaseUrl || options.databaseUrl.length == 0) {
      // console.log('Database URL is invalid. SDK not initialized');
    }
  }

  /**
   * Writes the given data to the database
   * @param {string} location Where to write the data
   * @param {string} data JSON to write, stringified
   * @param {HeadersInit} reqHeaders Headers to be sent with the req
   * @param {boolean} authenticated Should the request be authenticated
   * @return {boolean} If the write operation suceeded
   */
  async write(
      location: string,
      data: string,
      reqHeaders: HeadersInit,
      authenticated: boolean,
  ): Promise<boolean> {
    try {
      await fetch(
        this.options.databaseUrl + location + authenticated ?
          this.AUTH_SUFFIX + this.options.authentication :
          this.URL_SUFFIX,
        {
          method: 'PUT',
          headers: reqHeaders,
          body: data,
        },
      );

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Read data at the given location in DB
   * @param {string} location Where to read the data
   * @param {HeadersInit} reqHeaders Headers to be sent with the req
   * @param {boolean} authenticated Should the request be authenticated
   * @return {string} JSON or boolean false
   */
  async read(
      location: string,
      reqHeaders: HeadersInit,
      authenticated: boolean,
  ): Promise<string> {
    try {
      return await (
        await fetch(
          this.options.databaseUrl + location + authenticated ?
            this.AUTH_SUFFIX + this.options.authentication :
            this.URL_SUFFIX,
          {
            method: 'GET',
            headers: reqHeaders,
          },
        )
      ).json();
    } catch {
      return ''; // Let's not return null...
    }
  }
}
