/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.setOptions({
  java_package: "com.sharer.server.core.proto",
  java_outer_classname: "RequestProto"
})
.addJSON({
  Request: {
    oneofs: {
      dataBody: {
        oneof: [
          "login",
          "loginResp",
          "message",
          "notification",
          "hearbeat"
        ]
      }
    },
    fields: {
      category: {
        type: "Category",
        id: 1
      },
      login: {
        type: "Login",
        id: 2
      },
      loginResp: {
        type: "LoginResp",
        id: 3
      },
      message: {
        type: "Message",
        id: 4
      },
      notification: {
        type: "Notification",
        id: 5
      },
      hearbeat: {
        type: "HearBeat",
        id: 6
      }
    },
    nested: {
      Category: {
        values: {
          Login: 0,
          LoginResp: 1,
          Message: 2,
          MessageResp: 3,
          HearBeat: 4,
          HearBeatResp: 5,
          Notification: 6
        }
      }
    }
  },
  MsgType: {
    values: {
      TEXT: 0,
      PICUTRE: 1,
      VOICE: 2,
      VIDEO: 3
    }
  },
  NotificationType: {
    values: {
      SESSION_OFF: 0,
      SESSION_ON: 1
    }
  },
  Login: {
    fields: {
      id: {
        type: "uint64",
        id: 1
      },
      account: {
        type: "string",
        id: 2
      },
      token: {
        type: "string",
        id: 3
      },
      timestamp: {
        type: "uint64",
        id: 4
      },
      deviceModel: {
        type: "string",
        id: 5
      },
      clientVersion: {
        type: "string",
        id: 6
      },
      systemVersion: {
        type: "string",
        id: 7
      },
      state: {
        type: "uint32",
        id: 8
      }
    }
  },
  LoginResp: {
    fields: {
      state: {
        type: "uint32",
        id: 1
      },
      account: {
        type: "string",
        id: 2
      },
      timestamp: {
        type: "uint64",
        id: 3
      }
    }
  },
  Message: {
    fields: {
      id: {
        type: "uint64",
        id: 1
      },
      time: {
        type: "uint64",
        id: 2
      },
      msgType: {
        type: "MsgType",
        id: 3
      },
      content: {
        type: "string",
        id: 4
      },
      from: {
        type: "string",
        id: 5
      },
      to: {
        type: "string",
        id: 6
      },
      state: {
        type: "uint32",
        id: 7
      },
      isread: {
        type: "uint32",
        id: 8
      }
    }
  },
  Notification: {
    fields: {
      type: {
        type: "NotificationType",
        id: 1
      },
      sender: {
        type: "string",
        id: 2
      },
      json: {
        type: "string",
        id: 3
      },
      timestamp: {
        type: "uint64",
        id: 4
      }
    }
  },
  HearBeat: {
    fields: {
      seq: {
        type: "uint32",
        id: 1
      },
      json: {
        type: "string",
        id: 2
      },
      timestamp: {
        type: "uint64",
        id: 3
      }
    }
  }
});

module.exports = $root;
