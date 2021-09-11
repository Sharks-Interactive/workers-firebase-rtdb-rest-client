/**
 * Creates a new simpleComps instance
 * @param {string} folder - Path to the folder containing comp files
 */
export function SimpleComps(folder) {
  const _this = this;

  /**
   * Renders the specified comp
   * @param {string} component - The name of the comp to render
   * @return {Promise} Callacks called when comp is done being rendered
   */
  this.render = (component) => {
    const inputs = document.getElementsByTagName(component);
    const promise = new Promise();

    for (let i = 0; i < inputs.length; i++) {
      fetch(folder + component + '.html')
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            const newElement = document.createElement('div');

            data = parseData(data, inputs.item(i));

            newElement.innerHTML = data;

            parseIfs(newElement);

            inputs.item(i).appendChild(newElement);

            if (i == inputs.length - 1) promise.resolve();
          });
    }

    return promise;
  };

  /**
   * Parses custom data (eg: variables) in a component file
   * @param {string} data - Raw HTML of a component in string format
   * @param {HTMLElement} elem - Custom html element which we are rendering
   * @return {string} The parsed version of the input data
   */
  const parseData = (data, elem) => {
    // Get a list of all {specialData} in the given component data
    const customAtts = data.match(/\{(.+?)\}/g);

    if (typeof customAtts == 'undefined' || customAtts == null) return data;

    for (let i = 0; i < customAtts.length; i++) {
      // Remove brackets from custom data/attributes
      const _att = customAtts[i].replace(/[\{\}]+/g, '');

      // Get value of attribute of same name on component element
      data = data.replace(customAtts[i], elem.getAttribute(_att));
    }

    return data;
  }

  /**
   * Parses if attributes in a component
   * @param {HTMLDivElement} elm - The HTML element to parse ifs on
   */
  const parseIfs = (elm) => {
    for (let g = 0; g < elm.children.length; g++) {
      try {
        for (let i = 0; i < elm.children.item(g).attributes.length; i++) {
          if (
            elm.children.item(g).attributes[i].value == 'false' ||
            (elm.children.item(g).attributes[i].value == 'null' &&
              elm.children.item(g).attributes[i].name == 'data-if')
          ) {
            elm.removeChild(elm.children.item(g));
          }
        }

        if (elm.children.item(g).children.length > 0) {
          parseIfs(elm.children.item(g));
        }
      } catch (error) {}
    }
  };

  /**
   * Creates a promise
   */
  function Promise() {
    this.resolved = false;
    this.callbacks = []; // List of callbacks to fire on resolution
  }

  Promise.prototype = {
    then: function(callback) {
      if (this.resolved) callback();
      else this.callbacks.push(callback); // Queue up callback for later
    },

    resolve: function() {
      this.resolved = true;
      // Fire all callbacks
      this.callbacks.forEach(function(callback) {
        callback();
      });
    },
  };
}
