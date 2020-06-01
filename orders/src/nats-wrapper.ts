import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private __client?: Stan;

  get client() {
    if (!this.__client) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this.__client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this.__client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
