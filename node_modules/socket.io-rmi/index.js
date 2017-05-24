'use strict';

class UncatchableError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type;
  }

  toJSON() {
    return {
      type: this.type,
      message: this.message,
    };
  }
}

class Redirection extends UncatchableError {
  constructor(location, message) {
    super('Redirection', message);
    this.location = location;
  }

  toJSON() {
    return {
      type: this.type,
      location: this.location,
      message: this.message,
    };
  }
}

module.exports = {
  TYPE_CALLBACK: 'Callback',

  TYPE_ERROR: 'Error',

  TYPE_REMOTE_HANDLER: 'RemoteHandler',

  TYPE_REMOTE_INSTANCE: 'RemoteInstance',

  /** Event sent after a connection is establied. This event sends the root
   * object required for making the RMI requests as data */
  EVENT_CONNECTED: 'Connected',   // Event sent after a connection is established

  /** Event sent when an error occurs in the server (like 502). The socket is
   * closed after this event is sent. The error object is passed as data */
  EVENT_ERROR: 'Error',

  /** Redirection Expection */
  Redirection: Redirection,

  /** The UncatchableError that has to be handled centrally */
  UncatchableError: UncatchableError,

  /**
   * Get the name of the event for the given namespace and name
   * @param  {string} namespace     The namespace name (can be empty)
   * @param  {string} name          The name of the method
   * @return {string}               The event name to be used in the client as well
   *                                as server
   */
  eventName: function (namespace, name) {
    return namespace + '/' + name;
  },

  /**
   * Get the name of the event for the callback with the given id
   * @param  {string} namespace The namespace name (can be empty)
   * @param  {number} id        A unique id for the callback identification
   * @return {string}           The event name to be used in the client as well
   *                            as server
   */
  eventCallbackName: function (namespace, id) {
    return namespace + '/' + 'cb' + '/' + id;
  },
};
