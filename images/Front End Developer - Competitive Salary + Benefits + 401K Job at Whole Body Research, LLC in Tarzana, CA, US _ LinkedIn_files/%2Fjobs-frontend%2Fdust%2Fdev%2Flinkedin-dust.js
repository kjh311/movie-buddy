/*Package: dust-li-experimental; Version: 3.1.0*/

(function(global) { global.liDustVersion = 'Package: dust-li-experimental; Version: 3.1.0';})(this);

(function (global) {
  if (typeof global.dust !== 'undefined') {
    global.liDustVars = {
      //Preserve the dust cache so we do not lose already registered templates
      cache: global.dust.cache,
      //Also preserve any static i18n strings
      i18n: global.dust.i18n,
      //Helpers are added by dust (this file) and play (dust-utils or play-utils)
      //Loading new Dust version will potentially overwrite all of the helpers
      //if play helpers are loaded before this file executes
      //Preserve dust helpers here and re-add helpers that do not already exist later
      helpers: global.dust.helpers
    };
  }
})(this);
/*! Dust - Asynchronous Templating - v2.5.1
* http://linkedin.github.io/dustjs/
* Copyright (c) 2014 Aleksander Williams; Released under the MIT License */
(function(root) {
  var dust = {},
      NONE = 'NONE',
      ERROR = 'ERROR',
      WARN = 'WARN',
      INFO = 'INFO',
      DEBUG = 'DEBUG',
      loggingLevels = [DEBUG, INFO, WARN, ERROR, NONE],
      EMPTY_FUNC = function() {},
      logger = {},
      originalLog,
      loggerContext;

  dust.debugLevel = NONE;

  dust.config = {
    whitespace: false,
  };

  // Directive aliases to minify code
  dust._aliases = {
    "write": "w",
    "end": "e",
    "map": "m",
    "render": "r",
    "reference": "f",
    "section": "s",
    "exists": "x",
    "notexists": "nx",
    "block": "b",
    "partial": "p",
    "helper": "h"
  };

  // Try to find the console in global scope
  if (root && root.console && root.console.log) {
    loggerContext = root.console;
    originalLog = root.console.log;
  }

  // robust logger for node.js, modern browsers, and IE <= 9.
  logger.log = loggerContext ? function() {
      // Do this for normal browsers
      if (typeof originalLog === 'function') {
        logger.log = function() {
          originalLog.apply(loggerContext, arguments);
        };
      } else {
        // Do this for IE <= 9
        logger.log = function() {
          var message = Array.prototype.slice.apply(arguments).join(' ');
          originalLog(message);
        };
      }
      logger.log.apply(this, arguments);
  } : function() { /* no op */ };

  /**
   * Log dust debug statements, info statements, warning statements, and errors.
   * Filters out the messages based on the dust.debuglevel.
   * This default implementation will print to the console if it exists.
   * @param {String|Error} message the message to print/throw
   * @param {String} type the severity of the message(ERROR, WARN, INFO, or DEBUG)
   * @public
   */
  dust.log = function(message, type) {
    type = type || INFO;
    if (dust.debugLevel !== NONE && dust.indexInArray(loggingLevels, type) >= dust.indexInArray(loggingLevels, dust.debugLevel)) {
      if(!dust.logQueue) {
        dust.logQueue = [];
      }
      dust.logQueue.push({message: message, type: type});
      logger.log('[DUST ' + type + ']: ' + message);
    }
  };

  dust.helpers = {};

  dust.cache = {};

  dust.register = function(name, tmpl) {
    if (!name) {
      return;
    }
    dust.cache[name] = tmpl;
  };

  dust.render = function(name, context, callback) {
    var chunk = new Stub(callback).head;
    try {
      dust.load(name, chunk, Context.wrap(context, name)).end();
    } catch (err) {
      chunk.setError(err);
    }
  };

  dust.stream = function(name, context) {
    var stream = new Stream(),
        chunk = stream.head;
    dust.nextTick(function() {
      try {
        dust.load(name, stream.head, Context.wrap(context, name)).end();
      } catch (err) {
        chunk.setError(err);
      }
    });
    return stream;
  };

  dust.renderSource = function(source, context, callback) {
    return dust.compileFn(source)(context, callback);
  };

  dust.compileFn = function(source, name) {
    // name is optional. When name is not provided the template can only be rendered using the callable returned by this function.
    // If a name is provided the compiled template can also be rendered by name.
    name = name || null;
    var tmpl = dust.loadSource(dust.compile(source, name));
    return function(context, callback) {
      var master = callback ? new Stub(callback) : new Stream();
      dust.nextTick(function() {
        if(typeof tmpl === 'function') {
          tmpl(master.head, Context.wrap(context, name)).end();
        }
        else {
          dust.log(new Error('Template [' + name + '] cannot be resolved to a Dust function'), ERROR);
        }
      });
      return master;
    };
  };

  dust.load = function(name, chunk, context) {
    var tmpl = dust.cache[name];
    if (tmpl) {
      return tmpl(chunk, context);
    } else {
      if (dust.onLoad) {
        return chunk.map(function(chunk) {
          dust.onLoad(name, function(err, src) {
            if (err) {
              return chunk.setError(err);
            }
            if (!dust.cache[name]) {
              dust.loadSource(dust.compile(src, name));
            }
            dust.cache[name](chunk, context).end();
          });
        });
      }
      return chunk.setError(new Error('Template Not Found: ' + name));
    }
  };

  dust.loadSource = function(source, path) {
    return eval(source);
  };

  if (Array.isArray) {
    dust.isArray = Array.isArray;
  } else {
    dust.isArray = function(arr) {
      return Object.prototype.toString.call(arr) === '[object Array]';
    };
  }

  // indexOf shim for arrays for IE <= 8
  // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  dust.indexInArray = function(arr, item, fromIndex) {
    fromIndex = +fromIndex || 0;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item, fromIndex);
    } else {
    if ( arr === undefined || arr === null ) {
      throw new TypeError( 'cannot call method "indexOf" of null' );
    }

    var length = arr.length; // Hack to convert object.length to a UInt32

    if (Math.abs(fromIndex) === Infinity) {
      fromIndex = 0;
    }

    if (fromIndex < 0) {
      fromIndex += length;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
    }

    for (;fromIndex < length; fromIndex++) {
      if (arr[fromIndex] === item) {
        return fromIndex;
      }
    }

    return -1;
    }
  };

  dust.nextTick = (function() {
    return function(callback) {
      setTimeout(callback,0);
    };
  } )();

  dust.isEmpty = function(value) {
    if (dust.isArray(value) && !value.length) {
      return true;
    }
    if (value === 0) {
      return false;
    }
    return (!value);
  };

  // apply the filter chain and return the output string
  dust.filter = function(string, auto, filters) {
    if (filters) {
      for (var i=0, len=filters.length; i<len; i++) {
        var name = filters[i];
        if (name === 's') {
          auto = null;
        }
        else if (typeof dust.filters[name] === 'function') {
          string = dust.filters[name](string);
        }
        else {
          dust.log('Invalid filter [' + name + ']', WARN);
        }
      }
    }
    // by default always apply the h filter, unless asked to unescape with |s
    if (auto) {
      string = dust.filters[auto](string);
    }
    return string;
  };

  dust.filters = {
    h: function(value) { return dust.escapeHtml(value); },
    j: function(value) { return dust.escapeJs(value); },
    u: encodeURI,
    uc: encodeURIComponent,
    js: function(value) {
      if (!JSON) {
        dust.log('JSON is undefined.  JSON stringify has not been used on [' + value + ']', WARN);
        return value;
      } else {
        return JSON.stringify(value);
      }
    },
    jp: function(value) {
      if (!JSON) {dust.log('JSON is undefined.  JSON parse has not been used on [' + value + ']', WARN);
        return value;
      } else {
        return JSON.parse(value);
      }
    }
  };

  function Context(stack, global, blocks, templateName) {
    this.stack  = stack;
    this.global = global;
    this.blocks = blocks;
    this.templateName = templateName;
  }

  dust.makeBase = function(global) {
    return new Context(new Stack(), global);
  };

  Context.wrap = function(context, name) {
    if (context instanceof Context) {
      return context;
    }
    return new Context(new Stack(context), {}, null, name);
  };

  /**
   * Public API for getting a value from the context.
   * @method get
   * @param {string|array} path The path to the value. Supported formats are:
   * 'key'
   * 'path.to.key'
   * '.path.to.key'
   * ['path', 'to', 'key']
   * ['key']
   * @param {boolean} [cur=false] Boolean which determines if the search should be limited to the
   * current context (true), or if get should search in parent contexts as well (false).
   * @public
   * @returns {string|object}
   */
  Context.prototype.get = function(path, cur) {
    if (typeof path === 'string') {
      if (path[0] === '.') {
        cur = true;
        path = path.substr(1);
      }
      path = path.split('.');
    }
    return this._get(cur, path);
  };

  /**
   * Get a value from the context
   * @method _get
   * @param {boolean} cur Get only from the current context
   * @param {array} down An array of each step in the path
   * @private
   * @return {string | object}
   */
  Context.prototype._get = function(cur, down) {
    var ctx = this.stack,
        i = 1,
        value, first, len, ctxThis, fn;
    first = down[0];
    len = down.length;

    if (cur && len === 0) {
      ctxThis = ctx;
      ctx = ctx.head;
    } else {
      if (!cur) {
        // Search up the stack for the first value
        while (ctx) {
          if (ctx.isObject) {
            ctxThis = ctx.head;
            value = ctx.head[first];
            if (value !== undefined) {
              break;
            }
          }
          ctx = ctx.tail;
        }

        if (value !== undefined) {
          ctx = value;
        } else {
          ctx = this.global ? this.global[first] : undefined;
        }
      } else if (ctx) {
        // if scope is limited by a leading dot, don't search up the tree
        if(ctx.head) {
          ctx = ctx.head[first];
        } else {
          //context's head is empty, value we are searching for is not defined
          ctx = undefined;
        }
      }

      while (ctx && i < len) {
        ctxThis = ctx;
        ctx = ctx[down[i]];
        i++;
      }
    }

    // Return the ctx or a function wrapping the application of the context.
    if (typeof ctx === 'function') {
      fn = function() {
        try {
          return ctx.apply(ctxThis, arguments);
        } catch (err) {
          dust.log(err, ERROR);
          throw err;
        }
      };
      fn.__dustBody = !!ctx.__dustBody;
      return fn;
    } else {
      if (ctx === undefined) {
        dust.log('Cannot find the value for reference [{' + down.join('.') + '}] in template [' + this.getTemplateName() + ']');
      }
      return ctx;
    }
  };

  Context.prototype.getPath = function(cur, down) {
    return this._get(cur, down);
  };

  Context.prototype.push = function(head, idx, len) {
    return new Context(new Stack(head, this.stack, idx, len), this.global, this.blocks, this.getTemplateName());
  };

  Context.prototype.rebase = function(head) {
    return new Context(new Stack(head), this.global, this.blocks, this.getTemplateName());
  };

  Context.prototype.current = function() {
    return this.stack.head;
  };

  Context.prototype.getBlock = function(key, chk, ctx) {
    if (typeof key === 'function') {
      var tempChk = new Chunk();
      key = key(tempChk, this).data.join('');
    }

    var blocks = this.blocks;

    if (!blocks) {
      dust.log('No blocks for context[{' + key + '}] in template [' + this.getTemplateName() + ']', DEBUG);
      return;
    }
    var len = blocks.length, fn;
    while (len--) {
      fn = blocks[len][key];
      if (fn) {
        return fn;
      }
    }
  };

  Context.prototype.shiftBlocks = function(locals) {
    var blocks = this.blocks,
        newBlocks;

    if (locals) {
      if (!blocks) {
        newBlocks = [locals];
      } else {
        newBlocks = blocks.concat([locals]);
      }
      return new Context(this.stack, this.global, newBlocks, this.getTemplateName());
    }
    return this;
  };

  Context.prototype.getTemplateName = function() {
    return this.templateName;
  };

  function Stack(head, tail, idx, len) {
    this.tail = tail;
    this.isObject = head && typeof head === 'object';
    this.head = head;
    this.index = idx;
    this.of = len;
  }

  function Stub(callback) {
    this.head = new Chunk(this);
    this.callback = callback;
    this.out = '';
  }

  Stub.prototype.flush = function() {
    var chunk = this.head;

    while (chunk) {
      if (chunk.flushable) {
        this.out += chunk.data.join(''); //ie7 perf
      } else if (chunk.error) {
        this.callback(chunk.error);
        dust.log('Chunk error [' + chunk.error + '] thrown. Ceasing to render this template.', WARN);
        this.flush = EMPTY_FUNC;
        return;
      } else {
        return;
      }
      chunk = chunk.next;
      this.head = chunk;
    }
    this.callback(null, this.out);
  };

  function Stream() {
    this.head = new Chunk(this);
  }

  Stream.prototype.flush = function() {
    var chunk = this.head;

    while(chunk) {
      if (chunk.flushable) {
        this.emit('data', chunk.data.join('')); //ie7 perf
      } else if (chunk.error) {
        this.emit('error', chunk.error);
        dust.log('Chunk error [' + chunk.error + '] thrown. Ceasing to render this template.', WARN);
        this.flush = EMPTY_FUNC;
        return;
      } else {
        return;
      }
      chunk = chunk.next;
      this.head = chunk;
    }
    this.emit('end');
  };

  Stream.prototype.emit = function(type, data) {
    if (!this.events) {
      dust.log('No events to emit', INFO);
      return false;
    }
    var handler = this.events[type];
    if (!handler) {
      dust.log('Event type [' + type + '] does not exist', WARN);
      return false;
    }
    if (typeof handler === 'function') {
      handler(data);
    } else if (dust.isArray(handler)) {
      var listeners = handler.slice(0);
      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](data);
      }
    } else {
      dust.log('Event Handler [' + handler + '] is not of a type that is handled by emit', WARN);
    }
  };

  Stream.prototype.on = function(type, callback) {
    if (!this.events) {
      this.events = {};
    }
    if (!this.events[type]) {
      if(callback) {
        this.events[type] = callback;
      } else {
        dust.log('Callback for type [' + type + '] does not exist. Listener not registered.', WARN);
      }
    } else if(typeof this.events[type] === 'function') {
      this.events[type] = [this.events[type], callback];
    } else {
      this.events[type].push(callback);
    }
    return this;
  };

  Stream.prototype.pipe = function(stream) {
    this.on('data', function(data) {
      try {
        stream.write(data, 'utf8');
      } catch (err) {
        dust.log(err, ERROR);
      }
    }).on('end', function() {
      try {
        return stream.end();
      } catch (err) {
        dust.log(err, ERROR);
      }
    }).on('error', function(err) {
      stream.error(err);
    });
    return this;
  };

  function Chunk(root, next, taps) {
    this.root = root;
    this.next = next;
    this.data = []; //ie7 perf
    this.flushable = false;
    this.taps = taps;
  }

  Chunk.prototype.write = function(data) {
    var taps  = this.taps;

    if (taps) {
      data = taps.go(data);
    }
    this.data.push(data);
    return this;
  };

  Chunk.prototype.end = function(data) {
    if (data) {
      this.write(data);
    }
    this.flushable = true;
    this.root.flush();
    return this;
  };

  Chunk.prototype.map = function(callback) {
    var cursor = new Chunk(this.root, this.next, this.taps),
        branch = new Chunk(this.root, cursor, this.taps);

    this.next = branch;
    this.flushable = true;
    try {
      callback(branch);
    } catch(e) {
      dust.log(e, ERROR);
      branch.setError(e);
    }
    return cursor;
  };

  Chunk.prototype.tap = function(tap) {
    var taps = this.taps;

    if (taps) {
      this.taps = taps.push(tap);
    } else {
      this.taps = new Tap(tap);
    }
    return this;
  };

  Chunk.prototype.untap = function() {
    this.taps = this.taps.tail;
    return this;
  };

  Chunk.prototype.render = function(body, context) {
    return body(this, context);
  };

  Chunk.prototype.reference = function(elem, context, auto, filters) {
    if (typeof elem === 'function') {
      // Changed the function calling to use apply with the current context to make sure
      // that "this" is wat we expect it to be inside the function
      elem = elem.apply(context.current(), [this, context, null, {auto: auto, filters: filters}]);
      if (elem instanceof Chunk) {
        return elem;
      }
    }
    if (!dust.isEmpty(elem)) {
      return this.write(dust.filter(elem, auto, filters));
    } else {
      return this;
    }
  };

  Chunk.prototype.section = function(elem, context, bodies, params) {
    // anonymous functions
    if (typeof elem === 'function' && !elem.__dustBody) {
      try {
        elem = elem.apply(context.current(), [this, context, bodies, params]);
      } catch(e) {
        dust.log(e, ERROR);
        return this.setError(e);
      }
      // functions that return chunks are assumed to have handled the body and/or have modified the chunk
      // use that return value as the current chunk and go to the next method in the chain
      if (elem instanceof Chunk) {
        return elem;
      }
    }
    var body = bodies.block,
        skip = bodies['else'];

    // a.k.a Inline parameters in the Dust documentations
    if (params) {
      context = context.push(params);
    }

    /*
    Dust's default behavior is to enumerate over the array elem, passing each object in the array to the block.
    When elem resolves to a value or object instead of an array, Dust sets the current context to the value
    and renders the block one time.
    */
    //non empty array is truthy, empty array is falsy
    if (dust.isArray(elem)) {
      if (body) {
        var len = elem.length, chunk = this;
        if (len > 0) {
          // any custom helper can blow up the stack
          // and store a flattened context, guard defensively
          if(context.stack.head) {
            context.stack.head['$len'] = len;
          }
          for (var i=0; i<len; i++) {
            if(context.stack.head) {
              context.stack.head['$idx'] = i;
            }
            chunk = body(chunk, context.push(elem[i], i, len));
          }
          if(context.stack.head) {
            context.stack.head['$idx'] = undefined;
            context.stack.head['$len'] = undefined;
          }
          return chunk;
        }
        else if (skip) {
          return skip(this, context);
        }
      }
    } else if (elem  === true) {
     // true is truthy but does not change context
      if (body) {
        return body(this, context);
      }
    } else if (elem || elem === 0) {
       // everything that evaluates to true are truthy ( e.g. Non-empty strings and Empty objects are truthy. )
       // zero is truthy
       // for anonymous functions that did not returns a chunk, truthiness is evaluated based on the return value
      if (body) {
        return body(this, context.push(elem));
      }
     // nonexistent, scalar false value, scalar empty string, null,
     // undefined are all falsy
    } else if (skip) {
      return skip(this, context);
    }
    dust.log('Not rendering section (#) block in template [' + context.getTemplateName() + '], because above key was not found', DEBUG);
    return this;
  };

  Chunk.prototype.exists = function(elem, context, bodies) {
    var body = bodies.block,
        skip = bodies['else'];

    if (!dust.isEmpty(elem)) {
      if (body) {
        return body(this, context);
      }
    } else if (skip) {
      return skip(this, context);
    }
    dust.log('Not rendering exists (?) block in template [' + context.getTemplateName() + '], because above key was not found', DEBUG);
    return this;
  };

  Chunk.prototype.notexists = function(elem, context, bodies) {
    var body = bodies.block,
        skip = bodies['else'];

    if (dust.isEmpty(elem)) {
      if (body) {
        return body(this, context);
      }
    } else if (skip) {
      return skip(this, context);
    }
    dust.log('Not rendering not exists (^) block check in template [' + context.getTemplateName() + '], because above key was found', DEBUG);
    return this;
  };

  Chunk.prototype.block = function(elem, context, bodies) {
    var body = bodies.block;

    if (elem) {
      body = elem;
    }

    if (body) {
      return body(this, context);
    }
    return this;
  };

  Chunk.prototype.partial = function(elem, context, params) {
    var partialContext;
    //put the params context second to match what section does. {.} matches the current context without parameters
    // start with an empty context
    partialContext = dust.makeBase(context.global);
    partialContext.blocks = context.blocks;
    if (context.stack && context.stack.tail){
      // grab the stack(tail) off of the previous context if we have it
      partialContext.stack = context.stack.tail;
    }
    if (params){
      //put params on
      partialContext = partialContext.push(params);
    }

    if(typeof elem === 'string') {
      partialContext.templateName = elem;
    }

    //reattach the head
    partialContext = partialContext.push(context.stack.head);

    var partialChunk;
    if (typeof elem === 'function') {
      partialChunk = this.capture(elem, partialContext, function(name, chunk) {
        partialContext.templateName = partialContext.templateName || name;
        dust.load(name, chunk, partialContext).end();
      });
    } else {
      partialChunk = dust.load(elem, this, partialContext);
    }
    return partialChunk;
  };

  Chunk.prototype.helper = function(name, context, bodies, params) {
    var chunk = this;
    // handle invalid helpers, similar to invalid filters
    if(dust.helpers[name]) {
      try {
        return dust.helpers[name](chunk, context, bodies, params);
      } catch(e) {
        dust.log('Error in ' + name + ' helper: ' + e, ERROR);
        return chunk.setError(e);
      }
    } else {
      dust.log('Invalid helper [' + name + ']', WARN);
      return chunk;
    }
  };

  Chunk.prototype.capture = function(body, context, callback) {
    return this.map(function(chunk) {
      var stub = new Stub(function(err, out) {
        if (err) {
          chunk.setError(err);
        } else {
          callback(out, chunk);
        }
      });
      body(stub.head, context).end();
    });
  };

  Chunk.prototype.setError = function(err) {
    this.error = err;
    this.root.flush();
    return this;
  };

  // Chunk aliases
  for(var f in Chunk.prototype) {
    if(dust._aliases[f]) {
      Chunk.prototype[dust._aliases[f]] = Chunk.prototype[f];
    }
  }

  function Tap(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  Tap.prototype.push = function(tap) {
    return new Tap(tap, this);
  };

  Tap.prototype.go = function(value) {
    var tap = this;

    while(tap) {
      value = tap.head(value);
      tap = tap.tail;
    }
    return value;
  };

  var HCHARS = /[&<>"']/,
      AMP    = /&/g,
      LT     = /</g,
      GT     = />/g,
      QUOT   = /\"/g,
      SQUOT  = /\'/g;

  dust.escapeHtml = function(s) {
    if (typeof s === 'string') {
      if (!HCHARS.test(s)) {
        return s;
      }
      return s.replace(AMP,'&amp;').replace(LT,'&lt;').replace(GT,'&gt;').replace(QUOT,'&quot;').replace(SQUOT, '&#39;');
    }
    return s;
  };

  var BS = /\\/g,
      FS = /\//g,
      CR = /\r/g,
      LS = /\u2028/g,
      PS = /\u2029/g,
      NL = /\n/g,
      LF = /\f/g,
      SQ = /'/g,
      DQ = /"/g,
      TB = /\t/g;

  dust.escapeJs = function(s) {
    if (typeof s === 'string') {
      return s
        .replace(BS, '\\\\')
        .replace(FS, '\\/')
        .replace(DQ, '\\"')
        .replace(SQ, '\\\'')
        .replace(CR, '\\r')
        .replace(LS, '\\u2028')
        .replace(PS, '\\u2029')
        .replace(NL, '\\n')
        .replace(LF, '\\f')
        .replace(TB, '\\t');
    }
    return s;
  };


  if (typeof exports === 'object') {
    module.exports = dust;
  } else {
    root.dust = dust;
  }

})((function(){return this;})());
/*! dustjs-helpers - v1.5.0
* https://github.com/linkedin/dustjs-helpers
* Copyright (c) 2014 Aleksander Williams; Released under the MIT License */
(function(dust){

// Use dust's built-in logging when available
var _log = dust.log ? function(msg, level) {
  level = level || "INFO";
  dust.log(msg, level);
} : function() {};

var _deprecatedCache = {};
function _deprecated(target) {
  if(_deprecatedCache[target]) { return; }
  _log("Deprecation warning: " + target + " is deprecated and will be removed in a future version of dustjs-helpers", "WARN");
  _log("For help and a deprecation timeline, see https://github.com/linkedin/dustjs-helpers/wiki/Deprecated-Features#" + target.replace(/\W+/g, ""), "WARN");
  _deprecatedCache[target] = true;
}

function isSelect(context) {
  var value = context.current();
  return typeof value === "object" && value.isSelect === true;
}

// Utility method : toString() equivalent for functions
function jsonFilter(key, value) {
  if (typeof value === "function") {
    //to make sure all environments format functions the same way
    return value.toString()
      //remove all leading and trailing whitespace
      .replace(/(^\s+|\s+$)/mg, '')
      //remove new line characters
      .replace(/\n/mg, '')
      //replace , and 0 or more spaces with ", "
      .replace(/,\s*/mg, ', ')
      //insert space between ){
      .replace(/\)\{/mg, ') {')
    ;
  }
  return value;
}

// Utility method: to invoke the given filter operation such as eq/gt etc
function filter(chunk, context, bodies, params, filterOp) {
  params = params || {};
  var body = bodies.block,
      actualKey,
      expectedValue,
      filterOpType = params.filterOpType || '';

  // when @eq, @lt etc are used as standalone helpers, key is required and hence check for defined
  if (params.hasOwnProperty("key")) {
    actualKey = dust.helpers.tap(params.key, chunk, context);
  } else if (isSelect(context)) {
    actualKey = context.current().selectKey;
    //  supports only one of the blocks in the select to be selected
    if (context.current().isResolved) {
      filterOp = function() { return false; };
    }
  } else {
    _log("No key specified for filter in:" + filterOpType + " helper ");
    return chunk;
  }
  expectedValue = dust.helpers.tap(params.value, chunk, context);
  // coerce both the actualKey and expectedValue to the same type for equality and non-equality compares
  if (filterOp(coerce(expectedValue, params.type, context), coerce(actualKey, params.type, context))) {
    if (isSelect(context)) {
      context.current().isResolved = true;
    }
    // we want helpers without bodies to fail gracefully so check it first
    if(body) {
     return chunk.render(body, context);
    } else {
      _log("No body specified for " + filterOpType + " helper ");
      return chunk;
    }
  } else if (bodies['else']) {
    return chunk.render(bodies['else'], context);
  }
  return chunk;
}

function coerce(value, type, context) {
  if (typeof value !== "undefined") {
    switch (type || typeof value) {
      case 'number': return +value;
      case 'string': return String(value);
      case 'boolean':
        value = (value === 'false' ? false : value);
        return Boolean(value);
      case 'date': return new Date(value);
      case 'context': return context.get(value);
    }
  }

  return value;
}

var helpers = {

  // Utility helping to resolve dust references in the given chunk
  // uses the Chunk.render method to resolve value
  /*
   Reference resolution rules:
   if value exists in JSON:
    "" or '' will evaluate to false, boolean false, null, or undefined will evaluate to false,
    numeric 0 evaluates to true, so does, string "0", string "null", string "undefined" and string "false".
    Also note that empty array -> [] is evaluated to false and empty object -> {} and non-empty object are evaluated to true
    The type of the return value is string ( since we concatenate to support interpolated references

   if value does not exist in JSON and the input is a single reference: {x}
     dust render emits empty string, and we then return false

   if values does not exist in JSON and the input is interpolated references : {x} < {y}
     dust render emits <  and we return the partial output

  */
  "tap": function(input, chunk, context) {
    // return given input if there is no dust reference to resolve
    // dust compiles a string/reference such as {foo} to a function
    if (typeof input !== "function") {
      return input;
    }

    var dustBodyOutput = '',
      returnValue;

    //use chunk render to evaluate output. For simple functions result will be returned from render call,
    //for dust body functions result will be output via callback function
    returnValue = chunk.tap(function(data) {
      dustBodyOutput += data;
      return '';
    }).render(input, context);

    chunk.untap();

    //assume it's a simple function call if return result is not a chunk
    if (returnValue.constructor !== chunk.constructor) {
      //use returnValue as a result of tap
      return returnValue;
    } else if (dustBodyOutput === '') {
      return false;
    } else {
      return dustBodyOutput;
    }
  },

  "sep": function(chunk, context, bodies) {
    var body = bodies.block;
    if (context.stack.index === context.stack.of - 1) {
      return chunk;
    }
    if (body) {
      return body(chunk, context);
    } else {
      return chunk;
    }
  },

  "idx": function(chunk, context, bodies) {
    var body = bodies.block;
    // Will be removed in 1.6
    _deprecated("{@idx}");
    if(body) {
      return body(chunk, context.push(context.stack.index));
    }
    else {
      return chunk;
    }
  },

  /**
   * contextDump helper
   * @param key specifies how much to dump.
   * "current" dumps current context. "full" dumps the full context stack.
   * @param to specifies where to write dump output.
   * Values can be "console" or "output". Default is output.
   */
  "contextDump": function(chunk, context, bodies, params) {
    var p = params || {},
      to = p.to || 'output',
      key = p.key || 'current',
      dump;
    to = dust.helpers.tap(to, chunk, context);
    key = dust.helpers.tap(key, chunk, context);
    if (key === 'full') {
      dump = JSON.stringify(context.stack, jsonFilter, 2);
    }
    else {
      dump = JSON.stringify(context.stack.head, jsonFilter, 2);
    }
    if (to === 'console') {
      _log(dump);
      return chunk;
    }
    else {
      // encode opening brackets when outputting to html
      dump = dump.replace(/</g, '\\u003c');

      return chunk.write(dump);
    }
  },
  /**
   if helper for complex evaluation complex logic expressions.
   Note : #1 if helper fails gracefully when there is no body block nor else block
          #2 Undefined values and false values in the JSON need to be handled specially with .length check
             for e.g @if cond=" '{a}'.length && '{b}'.length" is advised when there are chances of the a and b been
             undefined or false in the context
          #3 Use only when the default ? and ^ dust operators and the select fall short in addressing the given logic,
             since eval executes in the global scope
          #4 All dust references are default escaped as they are resolved, hence eval will block malicious scripts in the context
             Be mindful of evaluating a expression that is passed through the unescape filter -> |s
   @param cond, either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. cond="2>3"
                a dust reference is also enclosed in double quotes, e.g. cond="'{val}'' > 3"
    cond argument should evaluate to a valid javascript expression
   **/

  "if": function( chunk, context, bodies, params ) {
    var body = bodies.block,
        skip = bodies['else'],
        cond;

    if(params && params.cond) {
      // Will be removed in 1.6
      _deprecated("{@if}");

      cond = dust.helpers.tap(params.cond, chunk, context);
      // eval expressions with given dust references
      if(eval(cond)){
       if(body) {
        return chunk.render( bodies.block, context );
       }
       else {
         _log("Missing body block in the if helper!");
         return chunk;
       }
      }
      if(skip){
       return chunk.render( bodies['else'], context );
      }
    }
    // no condition
    else {
      _log("No condition given in the if helper!");
    }
    return chunk;
  },

  /**
   * math helper
   * @param key is the value to perform math against
   * @param method is the math method,  is a valid string supported by math helper like mod, add, subtract
   * @param operand is the second value needed for operations like mod, add, subtract, etc.
   * @param round is a flag to assure that an integer is returned
   */
  "math": function ( chunk, context, bodies, params ) {
    //key and method are required for further processing
    if( params && typeof params.key !== "undefined" && params.method ){
      var key  = params.key,
          method = params.method,
          // operand can be null for "abs", ceil and floor
          operand = params.operand,
          round = params.round,
          mathOut = null,
          operError = function(){
              _log("operand is required for this math method");
              return null;
          };
      key  = dust.helpers.tap(key, chunk, context);
      operand = dust.helpers.tap(operand, chunk, context);
      //  TODO: handle  and tests for negatives and floats in all math operations
      switch(method) {
        case "mod":
          if(operand === 0 || operand === -0) {
            _log("operand for divide operation is 0/-0: expect Nan!");
          }
          mathOut = parseFloat(key) %  parseFloat(operand);
          break;
        case "add":
          mathOut = parseFloat(key) + parseFloat(operand);
          break;
        case "subtract":
          mathOut = parseFloat(key) - parseFloat(operand);
          break;
        case "multiply":
          mathOut = parseFloat(key) * parseFloat(operand);
          break;
        case "divide":
         if(operand === 0 || operand === -0) {
           _log("operand for divide operation is 0/-0: expect Nan/Infinity!");
         }
          mathOut = parseFloat(key) / parseFloat(operand);
          break;
        case "ceil":
          mathOut = Math.ceil(parseFloat(key));
          break;
        case "floor":
          mathOut = Math.floor(parseFloat(key));
          break;
        case "round":
          mathOut = Math.round(parseFloat(key));
          break;
        case "abs":
          mathOut = Math.abs(parseFloat(key));
          break;
        default:
          _log("method passed is not supported");
     }

      if (mathOut !== null){
        if (round) {
          mathOut = Math.round(mathOut);
        }
        if (bodies && bodies.block) {
          // with bodies act like the select helper with mathOut as the key
          // like the select helper bodies['else'] is meaningless and is ignored
          return chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, selectKey: mathOut }));
        } else {
          // self closing math helper will return the calculated output
          return chunk.write(mathOut);
        }
       } else {
        return chunk;
      }
    }
    // no key parameter and no method
    else {
      _log("Key is a required parameter for math helper along with method/operand!");
    }
    return chunk;
  },
   /**
   select helper works with one of the eq/ne/gt/gte/lt/lte/default providing the functionality
   of branching conditions
   @param key,  ( required ) either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   **/
  "select": function(chunk, context, bodies, params) {
    var body = bodies.block;
    // key is required for processing, hence check for defined
    if( params && typeof params.key !== "undefined"){
      // returns given input as output, if the input is not a dust reference, else does a context lookup
      var key = dust.helpers.tap(params.key, chunk, context);
      // bodies['else'] is meaningless and is ignored
      if( body ) {
       return chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, selectKey: key }));
      }
      else {
       _log("Missing body block in the select helper ");
       return chunk;
      }
    }
    // no key
    else {
      _log("No key given in the select helper!");
    }
    return chunk;
  },

  /**
   eq helper compares the given key is same as the expected value
   It can be used standalone or in conjunction with select for multiple branching
   @param key,  The actual key to be compared ( optional when helper used in conjunction with select)
                either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param value, The expected value to compare to, when helper is used standalone or in conjunction with select
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   Note : use type="number" when comparing numeric
   **/
  "eq": function(chunk, context, bodies, params) {
    if(params) {
      params.filterOpType = "eq";
      return filter(chunk, context, bodies, params, function(expected, actual) { return actual === expected; });
    }
    return chunk;
  },

  /**
   ne helper compares the given key is not the same as the expected value
   It can be used standalone or in conjunction with select for multiple branching
   @param key,  The actual key to be compared ( optional when helper used in conjunction with select)
                either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param value, The expected value to compare to, when helper is used standalone or in conjunction with select
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   Note : use type="number" when comparing numeric
   **/
  "ne": function(chunk, context, bodies, params) {
    if(params) {
      params.filterOpType = "ne";
      return filter(chunk, context, bodies, params, function(expected, actual) { return actual !== expected; });
    }
    return chunk;
  },

  /**
   lt helper compares the given key is less than the expected value
   It can be used standalone or in conjunction with select for multiple branching
   @param key,  The actual key to be compared ( optional when helper used in conjunction with select)
                either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param value, The expected value to compare to, when helper is used standalone  or in conjunction with select
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   Note : use type="number" when comparing numeric
   **/
  "lt": function(chunk, context, bodies, params) {
    if(params) {
      params.filterOpType = "lt";
      return filter(chunk, context, bodies, params, function(expected, actual) { return actual < expected; });
    }
    return chunk;
  },

  /**
   lte helper compares the given key is less or equal to the expected value
   It can be used standalone or in conjunction with select for multiple branching
   @param key,  The actual key to be compared ( optional when helper used in conjunction with select)
                either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param value, The expected value to compare to, when helper is used standalone or in conjunction with select
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   Note : use type="number" when comparing numeric
  **/
  "lte": function(chunk, context, bodies, params) {
    if(params) {
      params.filterOpType = "lte";
      return filter(chunk, context, bodies, params, function(expected, actual) { return actual <= expected; });
    }
    return chunk;
  },


  /**
   gt helper compares the given key is greater than the expected value
   It can be used standalone or in conjunction with select for multiple branching
   @param key,  The actual key to be compared ( optional when helper used in conjunction with select)
                either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param value, The expected value to compare to, when helper is used standalone  or in conjunction with select
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   Note : use type="number" when comparing numeric
   **/
  "gt": function(chunk, context, bodies, params) {
    // if no params do no go further
    if(params) {
      params.filterOpType = "gt";
      return filter(chunk, context, bodies, params, function(expected, actual) { return actual > expected; });
    }
    return chunk;
  },

 /**
   gte helper, compares the given key is greater than or equal to the expected value
   It can be used standalone or in conjunction with select for multiple branching
   @param key,  The actual key to be compared ( optional when helper used in conjunction with select)
                either a string literal value or a dust reference
                a string literal value, is enclosed in double quotes, e.g. key="foo"
                a dust reference may or may not be enclosed in double quotes, e.g. key="{val}" and key=val are both valid
   @param value, The expected value to compare to, when helper is used standalone or in conjunction with select
   @param type (optional), supported types are  number, boolean, string, date, context, defaults to string
   Note : use type="number" when comparing numeric
  **/
  "gte": function(chunk, context, bodies, params) {
     if(params) {
      params.filterOpType = "gte";
      return filter(chunk, context, bodies, params, function(expected, actual) { return actual >= expected; });
     }
    return chunk;
  },

  // to be used in conjunction with the select helper
  // TODO: fix the helper to do nothing when used standalone
  "default": function(chunk, context, bodies, params) {
    // does not require any params
     if(params) {
        params.filterOpType = "default";
      }
     return filter(chunk, context, bodies, params, function(expected, actual) { return true; });
  },

  /**
  * size helper prints the size of the given key
  * Note : size helper is self closing and does not support bodies
  * @param key, the element whose size is returned
  */
  "size": function( chunk, context, bodies, params ) {
    var key, value=0, nr, k;
    params = params || {};
    key = params.key;
    if (!key || key === true) { //undefined, null, "", 0
      value = 0;
    }
    else if(dust.isArray(key)) { //array
      value = key.length;
    }
    else if (!isNaN(parseFloat(key)) && isFinite(key)) { //numeric values
      value = key;
    }
    else if (typeof key  === "object") { //object test
      //objects, null and array all have typeof ojbect...
      //null and array are already tested so typeof is sufficient http://jsperf.com/isobject-tests
      nr = 0;
      for(k in key){
        if(Object.hasOwnProperty.call(key,k)){
          nr++;
        }
      }
      value = nr;
    } else {
      value = (key + '').length; //any other value (strings etc.)
    }
    return chunk.write(value);
  }


};

  for (var key in helpers) {
    dust.helpers[key] = helpers[key];
  }

  if(typeof exports !== 'undefined') {
    module.exports = dust;
  }

})(typeof exports !== 'undefined' ? require('dustjs-linkedin') : dust);
/*! dust-ui-helpers - v1.8.0 Copyright © 2015 LinkedIn Corporation */
(function(dust) {
/**
 * Used in conjunction with miniprofile.js to create a Popup with a user's profile information. Ported from global.tmpl
 * @method miniprofile_popup
 * @param {Object} params a configuration object created from attributes set in the template.
 */

var isSSR = typeof window === 'undefined';
var CTRL_CLIENT_ID = 'control-dust-client';
var CTRL_SERVER_ID = 'control-dust-server';
var templatesBootstrapped = {};

var sanitizeScriptBody = function(data) {
  if(typeof data === 'string') {
    return data.replace(/\u0000/g, '\ufffd').replace(/<\/(script)/ig, '<\\/$1');
  } else {
    return data;
  }
};


/**
 * Adds a shared control template to the page, providing it is in Dust's cache.
 * @private
 * @param {String} name The control's name.
 * @param {Object} chunk The chunk being written to.
 * @param {Object} context The current Dust context.
 * @param {Boolean} [failSilently=false] Whether to log a warning for a missing template.
 */
var bootstrapSharedTemplate = function(name, chunk, context, failSilently) {
  var partial,
      scmpPartial;

  // Return early to dedupe calls for already added partials.
  if (templatesBootstrapped[name]) {
    return;
  }

  partial = 'tl/shared/js-control/' + name.replace(/LI\./, '_').replace(/\./g, '_').toLowerCase();
  scmpPartial = 'scmp/' + partial;

  // Test if the partial is in the dust cache. We check for the partial with and
  // without 'scmp' prepended because 'scmp' can be required in Play apps,
  // unless they are rewriting paths with Inject rules.
  if (dust.cache[partial]) {
    chunk.partial(partial, context);
  } else if (dust.cache[scmpPartial]) {
    chunk.partial(scmpPartial, context);
  } else {
    if (!failSilently) {
      dust.log('Partial file ' + partial + ' is not in the Dust cache', 'WARN');
    }
    return;
  }

  templatesBootstrapped[name] = true;
};

/**
 * An implementation of Chunk.reference which forces javascript filtering (|j)
 * We respect filters if they exist but we change the default filtering to j
 */
var chunkRefWithJFilter = function(elem, context, auto, filters) {
  // to force JS encoding change auto to 'j'
  var oldReference = this._reference || this.reference,
      newAuto = 'j';
  return oldReference.call(this, elem, context, newAuto, filters);
};

/**
 * writes into the client-side registries
 * @param {string} type - one of i18n, lix, config
 * @param {string} key - the key to register as
 * @param {*} value - the value to register
 * @param {string?} namespace - an optional namespace to put stuff into
 * @private
 */
var registerPageJs = function(type, key, value, namespace) {
  var reg,
      regKey,
      registree,
      validTypes = ['i18n','lix','config'];

  if (validTypes.indexOf(type) > -1 && key) {
    // if we're on the client write directly into the registry
    if (!isSSR) {
      regKey = '__li__'+type+'_registry__';
      reg = window[regKey] = window[regKey] || {};
      if (namespace) {
        reg = reg[namespace] = reg[namespace] || {};
      }
      reg[key] = value;
    } else {
      // register the value in the Dust namespace until we can flush it into the DOM
      registree = {key:key, value:value};
      if (namespace) {
        registree.namespace = namespace;
      }
      dust.pageJs[type+'Ids'].push(registree);
    }
  }
};

var dustVars = {
  jsControl: {
    count: 1,
    controls: {},
    controlIds: [],
    controlIdentifier: isSSR ? CTRL_SERVER_ID : CTRL_CLIENT_ID,
    contextIdentifier: isSSR ? Math.floor(Math.random()*100000001) + '-' : ''
  },
  i18n: dust.i18n || { cache: {} },
  pageJs: {
    i18nIds: [],
    lixIds: [],
    configIds: []
  },
  resetBootstrappedTemplates: function() {
    templatesBootstrapped = {};
  }
};

//if existing dust.i18n object does not have `cache` property we need to
//add it and initialize it here. Dust.i18n is used by @i18n helper as a cache of
//translated strings
dustVars.i18n.cache = dustVars.i18n.cache || {};

var helpers = {
  'miniprofile_popup': function(chunk, context, bodies, params) {
      var url,
          tracking,
          getJs,
          className,
          template;

      if (params && params.url) {
          url = dust.helpers.tap(params.url, chunk, context);
          tracking = params.tracking || '';
          className = dust.helpers.tap(params.searchClass, chunk, context) || '';
          getJs = dust.helpers.tap(params.getJs, chunk, context) || '';
          template = dust.helpers.tap(params.template, chunk, context) || '';

          chunk.write('<span data-tracking="' + tracking + '"');
          if (className) {
            chunk.write(' class="' + className + ' ' +  dust.filters.h(url) + '"');
          } else {
            chunk.write(' class="miniprofile-container ' + dust.filters.h(url) + '"');
          }
          if (url) {
            chunk.write(' data-li-url="' + dust.filters.h(url) + '"');
          }
          if (getJs) {
            chunk.write(' data-li-getjs="' + getJs + '"');
          }
          if (template) {
            chunk.write(' data-li-tl="' + template + '"');
          }
          chunk.write('><strong>');
          chunk.render( bodies.block, context);
          chunk.write('</strong></span>');
      }
      return chunk;
  },

  /**
   * Used to standardize HTML containers. Ported from shared.tmpl
   * @method module
   * @param {Object} params a configuration object created from attributes set in the template - see below for details.
   */
  'module': function(chunk, context, bodies, params) {
    var hasHdr   = typeof params.hasHdr === 'undefined' || params.hasHdr.toLowerCase() === 'true',
        hdrTag   = params.hdrTag || 'h3',
        id       = params.id || 'module-id'+Math.floor(Math.random()*1001),
        modClass = params.moduleClass ? ' ' + params.moduleClass : '',
        modType  = params.type || 'util',
        title    = dust.helpers.tap(params.title, chunk, context) || '';

    if (typeof params.hdrTag !== 'undefined' || typeof params.hasHdr !== 'undefined' || typeof params.id !== 'undefined') {
      chunk.write('<div class="leo-module mod-' + modType + modClass +'" id="' + id + '">');
      if (hasHdr) {
        chunk.write('<div class="header"><' + dust.filters.h(hdrTag) + '>' + dust.filters.h(title) + '</' + dust.filters.h(hdrTag) + '></div>');
      }
      chunk.write('<div class="content">');
      chunk.render( bodies.block, context);
      chunk.write('</div></div>');
    }
    return chunk;
  },

  /**
   * helper to flush the set of controls on to the page primarily at the end of the body,
   * but can be used in embeds as well
   * Note : because this only sets up values for the foot, this must be placed in contents of the page before the chrome foot tag
   *        which reads from these values and formally registers controls
   * @method jsControlFlush
   * @param {Object} params a configuration object created from attributes set in the template.
   */
  'jsControlFlush': function(chunk, context, bodies, params) {
    var ctrlIds;

    // write the controls tags to the page
    if (dust && dust.jsControl && dust.jsControl.controlIds && dust.jsControl.controlIds.length) {
      ctrlIds = '\"' + dust.jsControl.controlIds.join(',') + '\";';

      chunk.write('<script type="text/javascript">')
           .write('if (dust && dust.jsControl) {')
           .write('if (!dust.jsControl.flushControlIds) {')
           .write('dust.jsControl.flushControlIds = "";')
           .write('} else {')
           .write('dust.jsControl.flushControlIds += ",";')
           .write('}')
           .write('dust.jsControl.flushControlIds += ' + ctrlIds)
           .write('}')
           .write('</script>');

      dust.jsControl.controlIds = [];
    }

    return chunk;
  },

  /**
   * helper to init and render the js control related scripts
   * @method jsControl
   * @param {Object} params a configuration object created from attributes set in the template.
   */
  'jsControl': function(chunk, context, bodies, params) {
    if (params && params.name) {
      var controlId = dust.jsControl.controlIdentifier + '-' + dust.jsControl.contextIdentifier + dust.jsControl.count,
          controlName = params.name,
          controlPartial;

      dust.jsControl.controlIds.push(controlId);

      if (dust.jsControl.controls[controlName] !== 'initialized' &&
         params.disableControlInitData === undefined) {
         dust.jsControl.controls[controlName] = 'initialized';
         bootstrapSharedTemplate(controlName, chunk, context, true);
      }

      chunk.write('<script id="' + controlId + '" type="linkedin/control" class="li-control">');
      chunk.write('LI.Controls.addControl("' + controlId + '", "' + params.name + '", ');

    if (bodies.block) {
      chunk.tap(sanitizeScriptBody).render(bodies.block, context).untap();
    } else {
      // Assume its a self closing tag w/no config
      chunk.write('{}');
    }

      chunk.write(')</script>');
      dust.jsControl.count++;

      // Check if we need to flush IDs right away for server rendered
      if (dust.jsControl.controlIdentifier === CTRL_SERVER_ID) {
        dust.helpers.jsControlFlush(chunk, context, bodies, params);
      }
    }
    return chunk;
  },

  /**
   * helper for including re-usable shared partials such as degree icon, miniprofile and ads
   * @method partial
   * @param {Object} params a configuration object created from attributes set in the template.
   * template param specifies the partial template to be rendered --optional
   * key params specifies the special context for the partial tag data --optional, defaults to creating tag data in partial block
   */
  'partial': function(chunk, context, bodies, params) {
    var partial = {},
      partialTagContext = (params && params.key) ? params.key : 'partial',
      partialTagData = context.get(partialTagContext),
      data,
      partialContext;

    //if there are any params on partial tag, add them to partial's context
    if (params) {
      for (var param in params) {
        if (param !== 'key') {
          // resolve the partial params to walk up the tree
          partial[param] = dust.helpers.tap(params[param], chunk, context);
        }
      }
    }

    // @pre tags generate data on server and add it to context
    // grab that data and add it to partial's context
    if (partialTagData) {
      for (data in partialTagData) {
        partial[data] = partialTagData[data];
      }
    }
    partial.isPartial= true;

    // before rendering creates new context using makeBase
    if (params && params.template) {//use the name arg as the partial file to render
      var template = params.template;

      // if there is a context, append it
      if (template.indexOf(':') >= 0) {
        var contextIndex = template.indexOf(':'),
          overrideContext = template.substring(contextIndex + 1),
          partialOverrideContext = context.get(overrideContext);

        template = template.substring(0, contextIndex);

        if (partialOverrideContext) {
          for (data in partialOverrideContext) {
            partial[data] = partialOverrideContext[data];
          }
        }
      }

      partialContext = dust.makeBase(partial);
      partialContext.templateName = context.getTemplateName();
      return chunk.partial(template, partialContext);
    }
    else {
      partialContext = dust.makeBase(partial);
      partialContext.templateName = context.getTemplateName();
      return bodies.block(chunk, partialContext);
    }
  },

  /**
   * helper works only with the partial, no body at this point
   * provides defaults to key params used in partial helper
   * @method param
   * @param {Object} params a configuration object created from attributes set in the template.
   */
  'param': function(chunk, context, bodies, params) {
    if (context.global && context.global.isPartial) {
      if (params) {
        var key = params.key,
            defaultVal = params.defaultVal,
            pKeyValue = context.global[key];
        if (key && ( typeof pKeyValue === 'undefined') && ( typeof defaultVal !== 'undefined')) {
          context.global[key] = defaultVal;
        }
      }
    }
    return chunk;
  },

  /**
   * Replace all instances of a target character with a replacement.
   * @method partial
   * @param {Object} params a configuration object created from attributes set in the template.
   **/
  'replace': function(chunk, context, bodies, params) {
    //write empty string when @replace helper does not have any params
    if(!params) {
      return chunk.write('');
    }

    var value = dust.helpers.tap(params.value, chunk, context) || '',
      target = dust.helpers.tap(params.target, chunk, context) || '',
      replacement = dust.helpers.tap(params.replacement, chunk, context) || '',
      toLower = !!params.toLower,
      toUpper = !!params.toUpper,
      // String.replace(false, 'some string') does nothing
      regex = params.target && new RegExp(target, 'g'),
      result = value.replace(regex, replacement);

    result = toUpper && result.toUpperCase() || result;
    result = toLower && result.toLowerCase() || result;

    return chunk.write(result);
  },

  /**
   * helper for console.log or window.console.log if in browser
   *
   */
  'log': function(chunk, context, bodies, params) {
     if (params && params.info) {
       dust.log(params.info);
     }
     return chunk;
  },

  /**
   * Return translated text for the specified key in the specified template.
   * Note: template is optional, if given overrides the name of the current template rendered
   * Example:
   * <p>{@i18n key="hello_world"}Hello World{/i18n}</p>
   * <p>{@i18n key="hello_world" text="Hello World"/}</p>
   * <p>{@i18n key="close" template="foo/global"/}</p>
   * Output:
   * <p>Hello World</p>
   * @param chunk
   * @param context
   * @param bodies
   * @param params
   *      <p>template="foo/global", lookup template cache</p>
   *     </>hide="true", does not render the i18n in place, stores it in the given template cache</p>
   *      </p>output="json" , stores the value in the current template cache</p>
   */
  'i18n': function (chunk, context, bodies, params) {

    if (params && params.hide === 'true') {
      // do not render
      return chunk;
    }
    if (params && (typeof params.key !== 'undefined')) {
      var key = params.key,
        templateName = params.template || context.getTemplateName();
      if (typeof templateName !== 'undefined') {
        var templateDictionary = dust.i18n.cache[templateName],
          text;
        if (templateDictionary) {
          text = templateDictionary[params.key];
          if (text) {
            if (!params.output) {
              return chunk.write(text);
            } else {
              context.stack.head[key] = text;
              return chunk;
            }
          }
        }
        // fallback to english for self-closing
        text = params.text;
        if (text) {
          return chunk.write(text);
        }
        // fallback to english for non self-closing
        else if (bodies.block) {
          return chunk.render(bodies.block, context);
        }
      }
      return chunk;
    }
  },
  /**
   * page.js.lix registers a value into the lix namespace
   * { ref: 'hello' }
   * {@page.js.lix key='myKey' value=ref/}
   * var lix = require('lix');
   * lix.get('myKey') === 'hello'
   * @param key {string} the key to register into
   * @param value {*} the value to register
   */
  'page.js.lix' : function( chunk, context, bodies, params ){
    var key = dust.helpers.tap(params.key, chunk, context) || '',
        value = dust.helpers.tap(params.value, chunk, context) || '';
    registerPageJs('lix', key, value);
    return chunk;
  },
  /**
   * page.js.i18n registers a value into the i18n namespace
   * { i18n_ref: 'hello' }
   * {@page.js.i18n key='myKey' value=i18n_ref/}
   * var i18n = require('i18n');
   * i18n.get('myKey') === 'hello'
   * @param key {string} the key to register into
   * @param value {*} the value to register
   */
  'page.js.i18n' : function( chunk, context, bodies, params ){
    var key = dust.helpers.tap(params.key, chunk, context) || '',
        value = dust.helpers.tap(params.value, chunk, context) || '';
    registerPageJs('i18n', key, value);
    return chunk;
  },
  /**
   * page.js.config registers a value into the config namespace
   * { config_ref: {foo:'bar'} }
   * {@page.js.config key='myKey' value=config_ref namespace="ABC"/}
   * var config = require('config');
   * config.get('ABC.myKey').foo === 'bar'
   * @param key {string} the key to register into
   * @param namespace {string?} an optional namespace to put the config into
   * @param value {*} the value to register
   */
  'page.js.config' : function( chunk, context, bodies, params ){
    var key = dust.helpers.tap(params.key, chunk, context) || '',
        value = dust.helpers.tap(params.value, chunk, context) || '',
        namespace = dust.helpers.tap(params.namespace, chunk, context) || '';
    registerPageJs('config', key, value, namespace);
    return chunk;
  },
  /**
   * page.js.bootstrap adds in partial templates for specified JS controls,
   * throwing a warning if a template is not in Dust's cache.
   * {@page.js.bootstrap controls="Dialog,ShowMore"/}
   * @param controls {string} Comma-seperated list of control names.
   */
  'page.js.bootstrap' : function( chunk, context, bodies, params ) {
    var controlNames, controlName, length, i;
    if (params && params.controls) {
      controlNames = dust.helpers.tap(params.controls, chunk, context) || '';
      if (!controlNames) {
        return chunk;
      }
      controlNames = controlNames.split(/,\s*/);
      for (i = 0, length = controlNames.length; i < length; i++) {
        bootstrapSharedTemplate(controlNames[i], chunk, context);
      }
    }
    return chunk;
  },
  /**
   * page.js.flush looks through the (usually server side) dust cache of pagejs key values and registers them
   * into the client side registries (via a script tag). Our page.js helpers currently only write to this cache
   * if we are doing SSR. If you are already on the client, why not write directly into the registries. But
   * for completeness and to support other helpers who may write into this cache, we'll flush whatever is
   * in the cache regardless of how it got there.
   */
  'page.js.flush' : function( chunk, context, bodies, params ){
    // this only useful when we are on the server
    var types = ['i18n', 'lix', 'config'],
        data = {},
        hasCachedData,
        i,
        len;
    for (i=0, len = types.length; i<len; i++) {
      if (dust.pageJs[types[i]+'Ids'].length) {
        hasCachedData = true;
        break;
      }
    }

    // if there is something in the cache, write it
    if (hasCachedData) {
      chunk.write('<script type="text/javascript">').write('(function(d,t){if(d){var r,rk,i,j,li,lj,id,ids,c={};');
      // write the page js data into a client side JS object from the ssr Dust namespace
      for (i=0, len = types.length; i<len; i++) {
        try {
          data[types[i]] = JSON.stringify(dust.pageJs[types[i] + 'Ids'])
            // Protect against closing script tag.
            .replace(/</g, '\\u003c')
            // Protect against disallowed newline characters (see HUED-2729).
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');
        } catch (e) {
          dust.log('WARN', e.message || e);
        }
        chunk.write('c.' + types[i] +' = JSON.parse("'+ dust.filters.j(data[types[i]]) + '");');

        // clear it out of the cache
        dust.pageJs[types[i]+'Ids'] = [];
      }
      // go through each type and put it into the client side registries
      chunk.write('for(i=0,li=t.length;i<li;i++){'+
                    'ids=c[t[i]];'+
                    'rk=\'__li__\'+t[i]+\'_registry__\';'+
                    'r=window[rk]=window[rk]||{};'+
                    'if(ids){'+
                      'for(j=0,lj=ids.length;j<lj;j++){'+
                        'id=ids[j];'+
                        'if(id&&id.key){'+
                          'if(id.namespace){'+
                            'r=r[id.namespace]=r[id.namespace]||{};'+
                          '}'+
                          'r[id.key]=id.value;'+
                        '}'+
                      '}'+
                    '}'+
                  '}'
      );

      chunk.write('}})(window.dust,[\'i18n\',\'lix\',\'config\']);').write('</script>');
    }
    return chunk;
  },
  /**
   * for security we will clobber over the if helper in this revision.
   * we'll introduce the fix in dustjs-helpers immediately after this push
   * REMOVE this code and security unit test with the next release
   */
  'if' : function( chunk, context, bodies, params ){
    var body = bodies.block,
        skip = bodies['else'],
        cond = params.cond;

    if(cond){
      // force reference lookups to use javascript encoding by default
      chunk._reference = chunk.reference;
      //update both - reference function and it's alias
      chunk.reference = chunk.f = chunkRefWithJFilter;
      cond = dust.helpers.tap(cond, chunk, context);
      // return the chunk refernce to normal
      chunk.reference = chunk.f = chunk._reference;
      // eval expressions with given dust references
      if(eval(cond)){
        if(body) {
          return chunk.render( bodies.block, context );
        }
        else {
          dust.log("Missing body block in the if helper!");
          return chunk;
        }
      }
      if(skip){
        return chunk.render( bodies['else'], context );
      }
    }
    // no condition
    else {
      dust.log("No condition given in the if helper!");
    }
    return chunk;
  },
  /**
   * Add a variable to the current context with a key equal to the 'name' parameter and value equal to the body of this
   * tag.
   *
   * Example:
   *
   * {@addToContext name="myVariable"}This text is now available in the context{/addToContext}
   *
   * <p>Now I can use the new variable: {myVariable}</p>
   *
   * Output:
   *
   * <p>Now I can use the new variable: This text is now available in the context</p>
   *
   * @param chunk
   * @param context
   * @param bodies
   * @param params
   * @return {*}
   */
  'addToContext' : function(chunk, context, bodies, params) {
    if(!params || !params.name) {
      return chunk.setError('@addToContext called with null params.name');
    }

    params.name = dust.helpers.tap(params.name, chunk, context);

    return chunk.capture(bodies.block, context, function(out, chunk) {
      context.current()[params.name] = out;
      return chunk.end('');
    });
  }
};

var key;
for (key in dustVars) {
  dust[key] = dustVars[key];
}
for (key in helpers) {
  dust.helpers[key] = helpers[key];
}
})(dust);
/*! dust-ui-helpers - v1.8.0 Copyright © 2015 LinkedIn Corporation */
/**
 * extra filters for Dust
 */

(function(dust) {
  // We define the Regular Expression for endcodedText as -
  //  with one of (<, >,',") - Has some markup
  //  matches an '&' and case sensitive matched if not followed by -
  //    an already encoded html entity
  //    \w followed by a semicolon ;
  //    an # followed by \d followed by a semicolon ;
  //    an # and a x with one of (\d, a-f) followed by a semicolon ;
  var htmlRegex = /[<>'"]|&(?!(?:\w+|#(?:\d+|x[\da-f]+));)/i,
      LT = /</g,
      GT = />/g,
      BS = /\\/g,
      dustJavaScriptEncode = dust.filters.j,
      dustJSONEncode = dust.filters.js,
      dustHTMLEncode = dust.filters.h,
      validateHTML,
      filters = {},
      key;

  function secureJavaScriptEncode(string) {
    var encodedString = dustJavaScriptEncode(string);
    if (typeof encodedString !== 'string') {
      return encodedString;
    }
    return encodedString.replace(LT, '\\u003C')
                        .replace(GT, '\\u003E');
  }

  function secureJSONEncode(string) {
    var encodedString = dustJSONEncode(string);
    if (typeof encodedString !== 'string') {
      return encodedString;
    }

    return encodedString.replace(LT, '\\u003C')
                        .replace(GT, '\\u003E');
  }

  function secureHTMLEncode(string) {
    var encodedString = dustHTMLEncode(string);
    if (typeof encodedString !== 'string') {
      return encodedString;
    }

    return encodedString.replace(BS, '&#92;');
  }

  /**
   * ensure pre encoded html text filter. Given an input string look for bad data -- data beyond
   * encoded text. If it includes bad data, report it and correct by html encoding.
   * @param {string} input the string to be filtered
   * @return {string} encoded text
   */
  function encodedText(input) {
    if (htmlRegex.test(input)) {
      report(input, 'dust-security-ensure_preencode');
      input = dust.filters.h(input);
    }
    return input;
  }

  /**
   * validate html whitelist markup filter. Given an input string look for bad data -- data beyond
   * markup a developer would use in i18n strings. If it includes bad data:
   *     phase 1: report it and return the value even though it may be malicious
   *     phase 2: report it and remove the bad parts
   * @param {string} input the string to be filtered
   * @return {string} validated markup
   */
  function markup(input) {
    if (!validateHTML(input)) {
      report(input, 'dust-security-html_whitelist');
      return stripTags(input);
    }
    return input;
  }

  /**
   * a rich text filter that currenlty acts as a noop. This is useful for the source code scanner and will allow
   * teams using richtext to insert data on the page without fear of the mk filter catching and sanitizing when it
   * sees something weird like an iframe
   * @param {string} input the string to be filtered
   * @return {string} the string sanitized for rich text (currently just a noop)
   */
  function rich(input) {
    return input;
  }

  /**
   * Reports a content security violation.
   * @param {string} badValue the malicious value we are reporting
   * @param {string} violatedDirective dust-security-ensure_preencode or dust-security-html_whitelist
   * TODO:  Figure out how to unit test this private function
   * @private
   */
  function report(badValue, violatedDirective) {
    dust.log(violatedDirective + ': ' + badValue, 'WARN');
  }

  function createHTMLValidator(config) {
    // We define allowed markup as:
    // * a whitelist of allowed htmltags
    // * a whitelist of allowed attributes
    //    - where attribute and value is separated by an equal sign only (no spaces)
    //    - where attribute values are double or single quoted
    //    - where attribute values do not contain markup (e.g. < > ' ")
    // * Additionally for href and src attributes, attributes values are restricted to one of:
    //    - full urls with https? ftp and mailto protocols (javascript: is not allowed)
    //    - relative paths (/foo)
    //    - hash fragments (#foo) and querystrings (?a=b)
    var rNotAllowedTag = new RegExp('<(?!/?(?:' + config.allowedTags + ')(?:[ \t\r\n]*/?>|[ \t\r\n]+(?:(?:(?:' + config.allowedAttributes + ')(?:=(["\'])[^\'"<>]*\\1)?|(?:' + config.allowedURLAttributes + ')=(["\'])(?:(?:' + config.allowedURLSchemes + ')(?::|&#(?:58|x3a);)|[/.#?]|&#(?:35|4[67]|63|x(?:2[3ef]|3f));)[^\'"<>]*\\2)[ \t\r\n]*)+/?>))', 'i');

    return function(html) {
      return !rNotAllowedTag.test(html);
    };
  }

  // without forms
  // |form|input|textarea|select|optgroup|option
  // |enctype|for|pattern
  // action|
  validateHTML = createHTMLValidator({
    allowedTags: 'a|abbr|address|area|article|aside|audio|b|bdi|bdo|big|blockquote|br|button|center|cite|code|datalist|dd|del|details|dfn|div|dl|dt|em|fieldset|figcaption|figure|font|footer|h[1-6]|header|hgroup|hr|i|img|ins|kbd|label|legend|li|map|mark|marquee|nav|nobr|ol|p|pre|q|rp|rt|ruby|s|samp|section|small|source|span|strike|strong|sub|sup|table|tbody|td|tfoot|th|thead|time|tr|u|ul|var|video|wbr',
    allowedAttributes: 'alt|aria-[a-z0-9_\\-]+|border|caption|checked|class|colgroup|color|cols|colspan|controls|coords|data-[a-z0-9_\\-]+|dir|disabled|height|hidden|hreflang|id|label|loop|marginheight|marginwidth|maxlength|method|multiple|name|preload|readonly|rel|required|reversed|role|rows|rowspan|spellcheck|tabindex|target|title|type|usemap|width|clear|headers|ismap|lang|start|datetime|accept|max|min|placeholder|size|step',
    allowedURLAttributes: 'href|src',
    allowedURLSchemes: 'https?|ftp|mailto'
  });

  function stripTags(string) {
    // remove all tags and potentially malicious characters
    return string.replace(/<[^>]*>|[<>'"&\\]/g, '');
  }

  filters = {
    j: secureJavaScriptEncode,
    js: secureJSONEncode,
    h: secureHTMLEncode,
    et: encodedText,
    mk: markup,
    encodedText: encodedText,
    markup: markup,
    rich: rich
  };

  for (key in filters) {
    dust.filters[key] = filters[key];
  }
})(dust);
(function (global, dust) {
  var dustVersion = 'unknown',
      liDustVars = global.liDustVars;

  if (typeof global.liDustVars !== 'undefined') {
    //restore dust.cache in case dust.cache existed before loading new version of Dust
    dust.cache = liDustVars.cache;
    //restore static i18n strings cache
    dust.i18n = liDustVars.i18n;

    //restore dust helpers that were overwritten by the new dust version and not added back
    for (var helperName in liDustVars.helpers) {
      if (typeof dust.helpers[helperName] === 'undefined') {
        dust.helpers[helperName] = liDustVars.helpers[helperName];
      }
    }

    //delete global variable
    delete global.liDustVars;
  }

  //save dust package version and delete global var
  if (typeof global.liDustVersion !== 'undefined') {
    dustVersion = global.liDustVersion;
    delete global.liDustVersion;
  }

  dust.helpers.dustVersion = function (chunk, context, bodies, params) {
    return chunk.write(dustVersion);
  }

})(this, dust);
