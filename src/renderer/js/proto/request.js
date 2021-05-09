// source: request.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.Request');
goog.provide('proto.Request.Category');
goog.provide('proto.Request.DatabodyCase');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.HearBeat');
goog.require('proto.Login');
goog.require('proto.LoginResp');
goog.require('proto.Message');
goog.require('proto.Notification');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Request = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Request.oneofGroups_);
};
goog.inherits(proto.Request, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Request.displayName = 'proto.Request';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Request.oneofGroups_ = [[2,3,4,5,6]];

/**
 * @enum {number}
 */
proto.Request.DatabodyCase = {
  DATABODY_NOT_SET: 0,
  LOGIN: 2,
  LOGINRESP: 3,
  MESSAGE: 4,
  NOTIFICATION: 5,
  HEARBEAT: 6
};

/**
 * @return {proto.Request.DatabodyCase}
 */
proto.Request.prototype.getDatabodyCase = function() {
  return /** @type {proto.Request.DatabodyCase} */(jspb.Message.computeOneofCase(this, proto.Request.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Request.prototype.toObject = function(opt_includeInstance) {
  return proto.Request.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Request} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Request.toObject = function(includeInstance, msg) {
  var f, obj = {
    category: jspb.Message.getFieldWithDefault(msg, 1, 0),
    login: (f = msg.getLogin()) && proto.Login.toObject(includeInstance, f),
    loginresp: (f = msg.getLoginresp()) && proto.LoginResp.toObject(includeInstance, f),
    message: (f = msg.getMessage()) && proto.Message.toObject(includeInstance, f),
    notification: (f = msg.getNotification()) && proto.Notification.toObject(includeInstance, f),
    hearbeat: (f = msg.getHearbeat()) && proto.HearBeat.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Request}
 */
proto.Request.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Request;
  return proto.Request.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Request} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Request}
 */
proto.Request.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.Request.Category} */ (reader.readEnum());
      msg.setCategory(value);
      break;
    case 2:
      var value = new proto.Login;
      reader.readMessage(value,proto.Login.deserializeBinaryFromReader);
      msg.setLogin(value);
      break;
    case 3:
      var value = new proto.LoginResp;
      reader.readMessage(value,proto.LoginResp.deserializeBinaryFromReader);
      msg.setLoginresp(value);
      break;
    case 4:
      var value = new proto.Message;
      reader.readMessage(value,proto.Message.deserializeBinaryFromReader);
      msg.setMessage(value);
      break;
    case 5:
      var value = new proto.Notification;
      reader.readMessage(value,proto.Notification.deserializeBinaryFromReader);
      msg.setNotification(value);
      break;
    case 6:
      var value = new proto.HearBeat;
      reader.readMessage(value,proto.HearBeat.deserializeBinaryFromReader);
      msg.setHearbeat(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Request.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Request.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Request} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Request.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCategory();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getLogin();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.Login.serializeBinaryToWriter
    );
  }
  f = message.getLoginresp();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.LoginResp.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.Message.serializeBinaryToWriter
    );
  }
  f = message.getNotification();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.Notification.serializeBinaryToWriter
    );
  }
  f = message.getHearbeat();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.HearBeat.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.Request.Category = {
  LOGIN: 0,
  LOGINRESP: 1,
  MESSAGE: 2,
  MESSAGERESP: 3,
  HEARBEAT: 4,
  HEARBEATRESP: 5,
  NOTIFICATION: 6
};

/**
 * optional Category category = 1;
 * @return {!proto.Request.Category}
 */
proto.Request.prototype.getCategory = function() {
  return /** @type {!proto.Request.Category} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.Request.Category} value
 * @return {!proto.Request} returns this
 */
proto.Request.prototype.setCategory = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional Login login = 2;
 * @return {?proto.Login}
 */
proto.Request.prototype.getLogin = function() {
  return /** @type{?proto.Login} */ (
    jspb.Message.getWrapperField(this, proto.Login, 2));
};


/**
 * @param {?proto.Login|undefined} value
 * @return {!proto.Request} returns this
*/
proto.Request.prototype.setLogin = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Request} returns this
 */
proto.Request.prototype.clearLogin = function() {
  return this.setLogin(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Request.prototype.hasLogin = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional LoginResp loginResp = 3;
 * @return {?proto.LoginResp}
 */
proto.Request.prototype.getLoginresp = function() {
  return /** @type{?proto.LoginResp} */ (
    jspb.Message.getWrapperField(this, proto.LoginResp, 3));
};


/**
 * @param {?proto.LoginResp|undefined} value
 * @return {!proto.Request} returns this
*/
proto.Request.prototype.setLoginresp = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Request} returns this
 */
proto.Request.prototype.clearLoginresp = function() {
  return this.setLoginresp(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Request.prototype.hasLoginresp = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Message message = 4;
 * @return {?proto.Message}
 */
proto.Request.prototype.getMessage = function() {
  return /** @type{?proto.Message} */ (
    jspb.Message.getWrapperField(this, proto.Message, 4));
};


/**
 * @param {?proto.Message|undefined} value
 * @return {!proto.Request} returns this
*/
proto.Request.prototype.setMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Request} returns this
 */
proto.Request.prototype.clearMessage = function() {
  return this.setMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Request.prototype.hasMessage = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Notification notification = 5;
 * @return {?proto.Notification}
 */
proto.Request.prototype.getNotification = function() {
  return /** @type{?proto.Notification} */ (
    jspb.Message.getWrapperField(this, proto.Notification, 5));
};


/**
 * @param {?proto.Notification|undefined} value
 * @return {!proto.Request} returns this
*/
proto.Request.prototype.setNotification = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Request} returns this
 */
proto.Request.prototype.clearNotification = function() {
  return this.setNotification(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Request.prototype.hasNotification = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional HearBeat hearbeat = 6;
 * @return {?proto.HearBeat}
 */
proto.Request.prototype.getHearbeat = function() {
  return /** @type{?proto.HearBeat} */ (
    jspb.Message.getWrapperField(this, proto.HearBeat, 6));
};


/**
 * @param {?proto.HearBeat|undefined} value
 * @return {!proto.Request} returns this
*/
proto.Request.prototype.setHearbeat = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.Request.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Request} returns this
 */
proto.Request.prototype.clearHearbeat = function() {
  return this.setHearbeat(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Request.prototype.hasHearbeat = function() {
  return jspb.Message.getField(this, 6) != null;
};

