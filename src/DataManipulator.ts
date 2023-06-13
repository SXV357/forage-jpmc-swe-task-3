import { ServerRespond } from './DataStreamer';

export interface Row {
  price_ABC: number,
  price_DEF: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    let priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    let priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    let ratio = priceABC / priceDEF;
    let upper_bound = 1 + 0.05;
    let lower_bound = 1 - 0.05;
    return {
        price_ABC: priceABC,
        price_DEF: priceDEF,
        ratio,
        upper_bound: upper_bound,
        lower_bound: lower_bound,
        trigger_aler: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      };
  }
}