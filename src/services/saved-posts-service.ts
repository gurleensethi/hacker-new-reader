import { HackerPost } from "../api/hackerNewsApi";

const POSTS_ARRAY_KEY = "posts";

class SavedPostsService {
  private savedPosts: HackerPost[] = [];
  private isLoaded: boolean = false;

  private saveToLocalStorage(): void {
    localStorage.setItem(POSTS_ARRAY_KEY, JSON.stringify(this.savedPosts));
  }

  private loadPostsFromLocalStorage(): void {
    const stringData = localStorage.getItem(POSTS_ARRAY_KEY);
    if (stringData) {
      try {
        this.savedPosts = JSON.parse(stringData);
      } catch (err) {
        console.error("Unable to parse posts array from string data...", err);
      }
    }
  }

  public loadSavedPosts(): void {
    this.loadPostsFromLocalStorage();
  }

  public savePost(post: HackerPost): void {
    this.savedPosts = [post, ...this.savedPosts];
    this.saveToLocalStorage();
  }

  public getSavedPosts(): HackerPost[] {
    if (!this.isLoaded) {
      this.loadSavedPosts();
    }
    return this.savedPosts;
  }
}

export default SavedPostsService;
