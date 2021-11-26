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
   * Suffix to be appended to DB URL to access json and do authed requests if you are using ID auth
   */
  private readonly ID_SUFFIX = '.json?auth=';

  /**
   * @type {string}
   * Suffix to be appended to DB URL to access json and do authed requests if you are using token auth
   */
   private readonly TOKEN_SUFFIX = '.json?access_token=';

  /**
   * @type {string}
   * Suffix to be appended to DB URL to access json and do authed requests
   */
  private authSuffix = '';

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

    // Firebase only responds to HTTPS traffic
    if (!options.databaseUrl || options.databaseUrl.length == 0 || !options.databaseUrl.search('https')) {
      // console.log('Database URL is invalid. SDK not initialized');
    }

    this.authSuffix = (options.tokenAuthentication ? this.TOKEN_SUFFIX : this.ID_SUFFIX);
  }

  /**
   * Writes the given data to the database
   * @param {string} location Where to write the data
   * @param {string} data JSON to write, stringified
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @param {boolean} authenticated Should the request be authenticated
   * @return {boolean} If the write operation suceeded
   */
  async write(
      location: string,
      data: string,
      reqHeaders: Headers,
      authenticated: boolean,
  ): Promise<boolean> {
    try {
      var res: Response = await fetch(
        this.options.databaseUrl + location + authenticated ?
          this.authSuffix + this.options.authentication :
          this.URL_SUFFIX,
        {
          method: 'PUT',
          headers: reqHeaders,
          body: data,
        },
      );

      return res.status == 200;
    } catch {
      return false;
    }
  }

  /**
   * Read data at the given location in DB
   * @param {string} location Where to read the data
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @param {boolean} authenticated Should the request be authenticated
   * @return {string} The read JSON data, or an empty string in the case of a failure
   */
  async read(
      location: string,
      reqHeaders: Headers,
      authenticated: boolean,
  ): Promise<string> {
    try {
      return await (
        await fetch(
          this.options.databaseUrl + location + authenticated ?
            this.authSuffix + this.options.authentication :
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

  /**
     * Delete data at the given location in DB
     * @param {string} location Where to delete the data
     * @param {Headers} reqHeaders Headers to be sent with the req
     * @param {boolean} authenticated Should the request be authenticated
     * @return {boolean} If the delete operation suceeded
     */
  async delete(
    location: string,
    reqHeaders: Headers,
    authenticated: boolean,
  ): Promise<boolean> {
    try {
      var res: Response = await fetch(
        this.options.databaseUrl + location + authenticated ?
          this.authSuffix + this.options.authentication :
          this.URL_SUFFIX,
        {
          method: 'DELETE',
          headers: reqHeaders,
        },
      );

      return res.status == 200;
    } catch {
      return false;
    }
  }

  /**
   * Attempts to update the given data in the database
   * @param {string} location Where to update the data
   * @param {string} data JSON to update, stringified
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @param {boolean} authenticated Should the request be authenticated
   * @return {boolean} If the update operation suceeded
   */
   async update(
    location: string,
    data: string,
    reqHeaders: Headers,
    authenticated: boolean,
  ): Promise<boolean> {
    try {
      var res: Response =  await fetch(
        this.options.databaseUrl + location + authenticated ?
          this.authSuffix + this.options.authentication :
          this.URL_SUFFIX,
        {
          method: 'PATCH',
          headers: reqHeaders,
          body: data,
        },
      );

      return res.status == 200;
    } catch {
      return false;
    }
  }

  /**
   * Get ETag of data at location
   * @param {string} location Location of data to get the ETag of
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @param {boolean} authenticated Should the request be authenticated
   * @return {string} The ETag of the data, or an empty string in the case of a failure
   */
   async getETag(
    location: string,
    reqHeaders: Headers,
    authenticated: boolean,
  ): Promise<string> {
    reqHeaders.append('X-Firebase-ETag', 'true');

    try {
      return await (
        await fetch(
          this.options.databaseUrl + location + authenticated ?
            this.authSuffix + this.options.authentication :
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
