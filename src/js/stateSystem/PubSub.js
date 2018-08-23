export default class PubSub {
  constructor () {
    this.events = new Map();
  }

  subscribe(event, callback) {
     let eventCollection = this.events.get(event);

     if (Array.isArray(eventCollection)) {
        eventCollection.push(callback);
     } else {
        eventCollection = [callback];
     }

     this.events.set(event, eventCollection);
  }

  publish(event, data = {}) {
    const eventCollection = this.events.get(event);

    if (!eventCollection) {
      return [];
    }

    return eventCollection.map(callback => callback(data));
  }

}