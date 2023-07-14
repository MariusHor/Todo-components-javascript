import { Callback, Payload, Subscribers } from '../_types';

type SubscribersList = {
  event: string;
  callback: Callback;
};

export class PubSub {
  private constructor() {}
  private static instance: PubSub;

  public static getInstance(): PubSub {
    if (!PubSub.instance) {
      PubSub.instance = new PubSub();
    }
    return PubSub.instance;
  }

  private subscribers: Subscribers = {};

  public subscribe(subscribersList: SubscribersList[]) {
    subscribersList.forEach((newSubscriber) => {
      if (!this.subscribers[newSubscriber.event]) {
        this.subscribers[newSubscriber.event] = [];
      }

      this.subscribers[newSubscriber.event].push(newSubscriber.callback);
    });

    return {
      unsubscribe: () => {
        subscribersList.forEach((newSubscriber) => {
          this.subscribers[newSubscriber.event] = this.subscribers[newSubscriber.event].filter(
            (fn: Callback) => fn !== newSubscriber.callback,
          );
        });
      },
    };
  }

  public publish(event: string, payload?: Payload) {
    if (this.subscribers[event]) {
      this.subscribers[event].map((fn: Callback) => fn(payload));
    }
  }
}
