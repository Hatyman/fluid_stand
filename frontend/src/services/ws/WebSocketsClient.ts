import { IMessageEvent, w3cwebsocket as W3CWebSocket } from 'websocket';
import { getBaseUrl } from 'services/api/axios-client/helpers';
import { OutgoingHttpHeaders } from 'http';

const pathRegExp = /^https?:\/\/(.+)\//;

enum WSMessageTypeEnum {
  sensors,
  decision,
  kpi,
  welcome,
  debug,
  session,
}
enum ClientType {
  webui,
  stand,
  matlab,
}
enum ClientStatus {
  ready,
  busy,
}

type WSMessage =
  | {
      type: WSMessageTypeEnum.sensors;
      pressure1: number;
      pressure2: number;
      pressure3: number;
    }
  | {
      type: WSMessageTypeEnum.decision;
      decisionId: string;
      message: string;
    }
  | {
      type: WSMessageTypeEnum.kpi;
      kpi1: number;
      kpi2: number;
      kpi3: number;
    }
  | {
      type: WSMessageTypeEnum.welcome;
      clientType: ClientType;
      clientState: ClientStatus;
    }
  | {
      type: WSMessageTypeEnum.debug;
      message: string;
    }
  | {
      type: WSMessageTypeEnum.session;
      sessionId: string;
      active: boolean;
    };

export class WebSocketsClient {
  client: W3CWebSocket;
  private connectingPromise: Promise<void>;

  constructor(url: string) {
    const baseApi = getBaseUrl();
    const wsPath = `ws://${baseApi.match(pathRegExp)?.[1]}/ws/${url}/`;
    this.client = new W3CWebSocket(wsPath);
    this.client.onmessage = (message: IMessageEvent) => {
      console.debug('message.data', message.data);
    };
    this.connectingPromise = new Promise(resolve => {
      this.client.onopen = () => {
        resolve();
        this.sendWelcomeMessage();
      };
    });
  }

  private send = (message: WSMessage) => {
    this.client.send(JSON.stringify(message));
  };

  public sendTextMessage = async (text: string) => {
    await this.connectingPromise;

    this.send({
      type: WSMessageTypeEnum.debug,
      message: text,
    });
  };

  private sendWelcomeMessage = async () => {
    await this.connectingPromise;

    this.send({
      type: WSMessageTypeEnum.welcome,
      clientType: ClientType.webui,
      clientState: ClientStatus.ready,
    });
  };
}
