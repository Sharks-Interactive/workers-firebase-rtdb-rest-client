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
   * Suffix appended to DB URL to do authed requests if you're using FB ID auth
   * See: https://firebase.google.com/docs/database/rest/auth#authenticate_with_an_id_token
   */
  private readonly ID_SUFFIX = '.json?auth=';

  /**
   * @type {string}
   * Suffix appended to DB URL to do authed requests if you are using token auth
   * See: https://firebase.google.com/docs/database/rest/auth#authenticate_with_an_access_token
   */
  private readonly TOKEN_SUFFIX = '.json?access_token=';

  /**
   * @type {string}
   * Suffix to be appended to DB URL is set based on your options
   */
  private authSuffix = '';

  /**
   * @type {boolean}
   * If we have recieved an invalid Database URL the SDK will be disabled
   */
  private disabled: boolean;

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
    // See: https://firebase.google.com/docs/reference/rest/database#section-api-usage
    if (
      !options.databaseUrl ||
      options.databaseUrl.length == 0 ||
      !options.databaseUrl.search('https')
    ) {
      this.disabled = true;
    }

    this.authSuffix = options.tokenAuthentication ?
      this.TOKEN_SUFFIX :
      this.ID_SUFFIX;

    this.disabled = false;
  }

  /**
   * Writes the given data to the database
   * See: https://firebase.google.com/docs/reference/rest/database#section-put
   * @param {string} location Where to write the data
   * @param {string} data JSON to write, stringified
   * @param {boolean} authenticated Should the request be authenticated
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @return {boolean} If the write operation suceeded
   */
  async write(
      location: string,
      data: string,
      authenticated: boolean,
      reqHeaders?: Headers,
  ): Promise<boolean> {
    if (this.disabled) return false;
    try {
      const res: Response = await fetch(
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
   * See: https://firebase.google.com/docs/reference/rest/database#section-get
   * @param {string} location Where to read the data
   * @param {boolean} authenticated Should the request be authenticated
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @return {string} The JSON data, or an empty string for a failure
   */
  async read(
      location: string,
      authenticated: boolean,
      reqHeaders?: Headers,
  ): Promise<string> {
    if (this.disabled) return '';
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
   * See: https://firebase.google.com/docs/reference/rest/database#section-delete
   * @param {string} location Where to delete the data
   * @param {boolean} authenticated Should the request be authenticated
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @return {boolean} If the delete operation suceeded
   */
  async delete(
      location: string,
      authenticated: boolean,
      reqHeaders?: Headers,
  ): Promise<boolean> {
    if (this.disabled) return false;
    try {
      const res: Response = await fetch(
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
   * See: https://firebase.google.com/docs/reference/rest/database#section-patch
   * @param {string} location Where to update the data
   * @param {string} data JSON to update, stringified
   * @param {boolean} authenticated Should the request be authenticated
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @return {boolean} If the update operation suceeded
   */
  async update(
      location: string,
      data: string,
      authenticated: boolean,
      reqHeaders?: Headers,
  ): Promise<boolean> {
    if (this.disabled) return false;
    try {
      const res: Response = await fetch(
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
   * Writes the given data to the database via POST request
   * (Equivalent of JS .push())
   * See: https://firebase.google.com/docs/reference/rest/database#section-post
   * @param {string} location Where to write the data
   * @param {string} data JSON to write, stringified
   * @param {boolean} authenticated Should the request be authenticated
   * @param {Headers} reqHeaders Headers to be sent with the req
   * @return {boolean} If the write operation suceeded
   */
  async push(
      location: string,
      data: string,
      authenticated: boolean,
      reqHeaders?: Headers,
  ): Promise<boolean> {
    if (this.disabled) return false;
    try {
      const res: Response = await fetch(
        this.options.databaseUrl + location + authenticated ?
          this.authSuffix + this.options.authentication :
          this.URL_SUFFIX,
        {
          method: 'POST',
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
   * Adds a header to get an ETag to your headers, the ETag
   * can be used for conditional requests, like with appendETagIfToHeaders();
   * See: https://firebase.google.com/docs/reference/rest/database#section-cond-etag
   * @param {Headers} reqHeaders Your current headers
   * @return {Headers} The updated headers to use on your next request
   */
  appendGetEtagHeader(reqHeaders: Headers): Headers {
    reqHeaders.append('X-Firebase-ETag', 'true');
    return reqHeaders;
  }

  /**
   * Adds a conditional write header to your headers, takes in
   * an ETag and will only write to the next location if the ETag matches
   * See: https://firebase.google.com/docs/reference/rest/database#section-cond-ifmatch
   * @param {Headers} reqHeaders Your current headers
   * @param {string} eTag The ETag to match
   * @return {Headers} The updated headers to use on your next request
   */
  appendEtagIfHeader(reqHeaders: Headers, eTag: string): Headers {
    reqHeaders.append('if-match', eTag);
    return reqHeaders;
  }
}
