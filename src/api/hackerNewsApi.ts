const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export interface HackerPost {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  hostname?: string;
}

export async function getTopStories(): Promise<number[]> {
  return fetch(BASE_URL + "/topstories.json").then((data) => data.json());
}

export async function getPostById(id: number): Promise<HackerPost> {
  return fetch(BASE_URL + `/item/${id}.json`)
    .then((data) => data.json())
    .then((post) => {
      if (post.url) {
        post.hostname = new URL(post.url).hostname;
      }
      return post;
    });
}
