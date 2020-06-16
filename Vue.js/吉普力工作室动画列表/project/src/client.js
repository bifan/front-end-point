import axios from "axios";

// axios.defaults.baseURL = "https://api.jikan.moe";
const instance = axios.create({
  baseURL: "https://api.jikan.moe"
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.response.use(response => {
  response.data = response.data.anime.map(item => {
    return {
      title: item.title,
      image: item.image_url,
      score: item.score,
      airingDate: item.airing_start?.slice(0, 4),
      uniqueKey: item.mal_id
    };
  });
  return response;
});

export const getAnimes = () => instance.get("/v3/producer/21/1");

/*
Studio Ghibli 数据结构

axios → {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}

data → {anime: Array(54), request_hash: "request:producer:0d3db098c36fd55fc9b6acde993fffe69ddb11ae", request_cached: true, request_cache_expiry: 5929, meta: {…}}

anime → 
  图片 → image_url: "https://cdn.myanimelist.net/images/anime/6/79597.jpg"
  评分 → score: 8.87
  片名 → title: "Sen to Chihiro no Kamikakushi"
  上映 → airing_start: "2001-07-19T15:00:00+00:00"

豆瓣根据名称搜索
  https://search.douban.com/movie/subject_search?search_text=名称
  https://search.douban.com/movie/subject_search?search_text=Sen to Chihiro no Kamikakushi
  
  <a
    href="https://search.douban.com/movie/subject_search?search_text=Sen to Chihiro no Kamikakushi&cat=1002"
    target="_blank"
    >豆瓣搜索</a
  >
*/
