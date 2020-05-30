declare module "node-nats-streaming" {
  interface Stan {
    on(event: string, callback: Function): void;
  }
}

export default null;
