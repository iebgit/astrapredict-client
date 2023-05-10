import axios from "axios";

const getMarketData = async (coins: Array<String>) => {
  try {
    const coinsString: String = coins.join(",");
    const coingeckoUrl: String = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsString}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en`;
    const coingeckoRes: any = await axios.get(coingeckoUrl.toString());
    return coingeckoRes;
  } catch (e) {
    console.log(e);
  }
};

const getHistoryData = async (coinId: String) => {
  try {
    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=max`;
    const coingeckoRes = axios.get(coingeckoUrl);
    return coingeckoRes;
  } catch (e) {
    console.log(e);
  }
};

export { getMarketData, getHistoryData };
